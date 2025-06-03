import React, { useEffect, useState } from 'react'
import '../../scss/style.scss'
import MeasurementsTable from './MeasurementsTable'
import MeasurementsGraph from './MeasurementsGraph'
import {
  getAllSensorsMinMaxAvgDataData,
  getMeasurementGraphData,
  getMeasurementTableData,
  getSensorList,
  getSourceList,
} from './MandrekasHelpers'
import { useSelector } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CRow,
  CButton,
} from '@coreui/react'
import MandrekasFilterComponent from './MandrekasFilterComponent'
import GraphFilter from './GraphFilter'
import AllSensorsMinMaxAvgBarChart from './AllSensorsMinMaxAvgBarChart'
import MandrekasRadialChartsCard from './RadialChartsComponents/MandrekasRadialChartsCard'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

// jsPDF & autoTable
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
// html2canvas for DOM snapshots
import html2canvas from 'html2canvas'

function Measurements(props) {
  const mandrekaTablePage = useSelector((state) => state.mandrekaTablePage)
  const [JSONdata, setJSONdata] = useState([])
  const [TableData, setTableData] = useState([])
  const [GraphData, setGraphData] = useState([])
  const [GraphFilterSensorsList, setGraphFilterSensorsList] = useState([])
  const [RadialChartsFilterSensorList, setRadialChartsFilterSensorList] = useState([])
  const [AllSensorsMinMaxAvgData, setAllSensorsMinMaxAvgData] = useState([])

  useEffect(() => {
    setTableData(getMeasurementTableData(JSONdata))
  }, [JSONdata])

  useEffect(() => {
    setGraphFilterSensorsList(getSensorList(TableData).slice(0, 4))
    setGraphData(getMeasurementGraphData(TableData))
    if (TableData.length > 0 && TableData.length < JSONdata.length) {
      setRadialChartsFilterSensorList(getSensorList(TableData))
    } else {
      setRadialChartsFilterSensorList([])
    }
    setAllSensorsMinMaxAvgData(
      getAllSensorsMinMaxAvgDataData(getSensorList(TableData), TableData)
    )
  }, [TableData, JSONdata])

  // Build rows (same as before)
  const buildTableRows = () => {
    return TableData.map((row) => [
      new Date(row.timestamp).toLocaleString('en-US'),
      row.sensor,
      `${row.measurement} °C`,
      row.source === 1
        ? 'Mandrekas'
        : row.source === 2
        ? 'ArcelorMittal'
        : row.source,
    ])
  }

  const handleExportPdf = async () => {
    const doc = new jsPDF('p', 'pt', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // 1) Title + timestamp
    doc.setFontSize(18)
    doc.text('Sensors Measurements Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFontSize(11)
    doc.text(`Generated: ${dayjs().format('YYYY-MM-DD HH:mm')}`, pageWidth / 2, 60, { align: 'center' })

    // 2) Table via autoTable
    autoTable(doc, {
      startY: 80,
      head: [['Date & Time', 'Sensor', 'Measurement', 'Source']],
      body: buildTableRows(),
      theme: 'grid',
      headStyles: { fillColor: '#3c4b64', textColor: '#ffffff' },
      styles: { fontSize: 10 },
      margin: { top: 80, left: 40, right: 40, bottom: 40 },
    })

    let finalY = doc.lastAutoTable.finalY || 80

    // 3) Capture “Measurements Trends” line chart
    const trendsNode = document.getElementById('measurements-trends-chart')
    if (trendsNode) {
      // wait a tick so chart is fully rendered
      await new Promise((r) => setTimeout(r, 300))
      const canvas = await html2canvas(trendsNode, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      if (finalY + 220 > pageHeight) {
        doc.addPage()
        finalY = 40
      }
      doc.setFontSize(14)
      doc.text('Measurements Trends', 40, finalY + 20)
      doc.addImage(imgData, 'PNG', 40, finalY + 30, pageWidth - 80, 200)
      finalY += 30 + 200 + 20
    }

    // 4) Capture “All Sensors Min/Max/Avg” bar chart
    const barNode = document.getElementById('all-sensors-bar-chart')
    if (barNode) {
      await new Promise((r) => setTimeout(r, 300))
      const canvasBar = await html2canvas(barNode, { scale: 2 })
      const imgBar = canvasBar.toDataURL('image/png')
      if (finalY + 220 > pageHeight) {
        doc.addPage()
        finalY = 40
      }
      doc.setFontSize(14)
      doc.text('Min/Max/Average (All Sensors)', 40, finalY + 20)
      doc.addImage(imgBar, 'PNG', 40, finalY + 30, pageWidth - 80, 200)
      finalY += 30 + 200 + 20
    }

    // 5) Capture each radial chart slide
    const radialSlides = document.querySelectorAll('#radial-charts-container .radial-chart-slide')
    for (let i = 0; i < radialSlides.length; i++) {
      const slide = radialSlides[i]
      await new Promise((r) => setTimeout(r, 300))
      const canvasRadial = await html2canvas(slide, { backgroundColor: '#fff', scale: 2 })
      const imgRadial = canvasRadial.toDataURL('image/png')
      if (finalY + 240 > pageHeight) {
        doc.addPage()
        finalY = 40
      }
      // Assume each `.radial-chart-slide` has an inner <h3> with the sensor name
      const sensorName = slide.querySelector('h3')?.textContent || `Sensor ${i + 1}`
      doc.setFontSize(14)
      doc.text(`Sensor: ${sensorName}`, 40, finalY + 20)
      // Center a 200×200 image
      doc.addImage(imgRadial, 'PNG', pageWidth / 2 - 100, finalY + 30, 200, 200)
      finalY += 30 + 200 + 20
    }

    doc.save('measurements_report.pdf')
  }

  return (
    <CContainer lg>
      {/* Refresh + Export Buttons */}
      <div style={{ width: '100%', textAlign: 'right', margin: '5px -5%' }}>
        <CButton color="dark" onClick={() => window.location.reload()}>
          Refresh
        </CButton>
        <CButton color="primary" onClick={handleExportPdf} style={{ marginLeft: '8px' }}>
          Export
        </CButton>
      </div>

      {/* Filters + Table */}
      <CCard style={{ width: '90%', margin: '20px auto' }}>
        <CCardHeader
          style={{
            backgroundColor: '#3c4b64',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '12px',
          }}
        >
          Sensors Measurements
        </CCardHeader>
        <CCardBody>
          <CRow>
            {props.Source ? (
              <MandrekasFilterComponent
                setRawData={setTableData}
                SourcesList={getSourceList(JSONdata)}
                SensorsList={getSensorList(JSONdata)}
                setJSONdata={setJSONdata}
                Source={props.Source}
              />
            ) : (
              <MandrekasFilterComponent
                setRawData={setTableData}
                SourcesList={getSourceList(JSONdata)}
                SensorsList={getSensorList(JSONdata)}
                JSONdata={JSONdata}
                setJSONdata={setJSONdata}
                FilterBySource={true}
              />
            )}
          </CRow>
          <CRow>
            <MeasurementsTable tableData={TableData} setCurrentTableData={() => {}} />
          </CRow>
        </CCardBody>
      </CCard>

      {/* Measurements Trends Chart */}
      <CCard style={{ width: '100%', marginTop: '20px' }}>
        <CCardHeader
          style={{
            backgroundColor: '#3c4b64',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '12px',
          }}
        >
          Measurements Trends
        </CCardHeader>
        <CCardHeader>
          <GraphFilter
            SensorsList={GraphFilterSensorsList}
            setSensorsList={setGraphFilterSensorsList}
            setGraphData={setGraphData}
            GraphData={GraphData}
            rawData={TableData}
          />
        </CCardHeader>
        <CCardBody>
          <MeasurementsGraph GraphData={GraphData} />
        </CCardBody>
      </CCard>

      {/* All Sensors Min/Max/Avg Bar Chart */}
      <CCard style={{ width: '100%', marginTop: '20px' }}>
        <CCardHeader
          style={{
            backgroundColor: '#3c4b64',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '12px',
          }}
        >
          Min/Max/Average Measurements (all Sensors)
        </CCardHeader>
        <CCardBody>
          <AllSensorsMinMaxAvgBarChart ChartData={AllSensorsMinMaxAvgData} />
        </CCardBody>
      </CCard>

      {/* Radial Charts per Sensor */}
      <div style={{ marginTop: '20px' }}>
        <MandrekasRadialChartsCard
          JSONdata={TableData}
          SensorsList={RadialChartsFilterSensorList}
        />
      </div>
    </CContainer>
  )
}

Measurements.propTypes = {
  SensorsList: PropTypes.any,
  SourcesList: PropTypes.any,
  setRawData: PropTypes.any,
  setJSONdata: PropTypes.any,
  FilterBySource: PropTypes.any,
  Source: PropTypes.any,
}

export default Measurements
