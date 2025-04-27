import React, { useEffect, useState } from 'react'
import '../../scss/style.scss'
import MeasurementsTable from './MeasurementsTable'
import MeasurementsGraph from './MeasurementsGraph'
import {
  filterDataByDate,
  getAllSensorsMinMaxAvgDataData,
  getCurrentTablePageData,
  getMeasurementGraphData,
  getMeasurementTableData,
  getSensorList,
  getSourceList,
} from './MandrekasHelpers'
//import { JSONdata } from './Dummydata'
import { useSelector } from 'react-redux'
import { DatePicker, Space } from 'antd'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import MandrekasFilterComponent from './MandrekasFilterComponent'
import GraphFilter from './GraphFilter'
import MandrekasRadialCharts from './RadialChartsComponents/MandrekasRadialCharts'
import MandrekasSlider from './RadialChartsComponents/MandrekasSlider'
import MandrekasRadialChartsCard from './RadialChartsComponents/MandrekasRadialChartsCard'
import AllSensorsMinMaxAvgBarChart from './AllSensorsMinMaxAvgBarChart'
import dayjs from 'dayjs'
import { getMeasurement_Service } from 'src/services/measurementsServices'
import PropTypes from 'prop-types'
const { RangePicker } = DatePicker

function Measurements(props) {
  console.log(props.Source)
  const mandrekaTablePage = useSelector((state) => state.mandrekaTablePage)
  const [JSONdata, setJSONdata] = useState([])
  const [TableData, setTableData] = useState(JSONdata)
  const [CurrentTableData, setCurrentTableData] = useState([TableData])
  const [GraphData, setGraphData] = useState([])
  const [GraphFilterSensorsList, setGraphFilterSensorsList] = useState()
  const [RadialChartsFilterSensorList, setRadialChartsFilterSensorList] = useState([])
  const [AllSensorsMinMaxAvgData, setAllSensorsMinMaxAvgData] = useState([])


  useEffect(() => setTableData(getMeasurementTableData(JSONdata)), [JSONdata])
  useEffect(() => {
    setGraphFilterSensorsList(getSensorList(TableData).slice(0, 4))
  }, [TableData])
  useEffect(() => {
    setGraphData(getMeasurementGraphData(TableData))
  }, [TableData])
  useEffect(() => {
    if (TableData?.length > 0 && TableData?.length < JSONdata?.length) {
      setRadialChartsFilterSensorList(getSensorList(TableData))
    } else {
      setRadialChartsFilterSensorList([])
    }
  }, [TableData])

  useEffect(() => {
    setAllSensorsMinMaxAvgData(getAllSensorsMinMaxAvgDataData(getSensorList(TableData), TableData))
    // getAllSensorsMinMaxAvgDataData(SensorsList, JSONdata)
  }, [TableData])

  // useEffect(() => {
  //   getMeasurement_Service(1,'2020-01-01','2026-01-01').then((response) => {
  //     console.log(response)
  //   })
  // }, [])

  return (
    <CContainer lg>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <CCard
          className="measurementsTable"
          style={{
            width: '90%',
            margin: '20px auto',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
          }}
        >
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
              {props.Source !== undefined && props.Source !== null && props.Source !== '' ? (
                <MandrekasFilterComponent
                  setRawData={setTableData}
                  SourcesList={getSourceList(JSONdata)}
                  SensorsList={getSensorList(JSONdata)}
                  setJSONdata={setJSONdata}
                  Source={props.Source}
                ></MandrekasFilterComponent>
              ) : (
                <MandrekasFilterComponent
                  setRawData={setTableData}
                  SourcesList={getSourceList(JSONdata)}
                  SensorsList={getSensorList(JSONdata)}
                  JSONdata={JSONdata}
                  setJSONdata={setJSONdata}
                  Source={props.Source}
                  FilterBySource={true}
                ></MandrekasFilterComponent>
              )}
            </CRow>
            <CRow>
              <MeasurementsTable
                tableData={TableData}
                setCurrentTableData={setCurrentTableData}
              ></MeasurementsTable>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard style={{ width: '100%', marginBottom: '15px' }}>
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
            ></GraphFilter>
          </CCardHeader>
          <CCardBody>
            <MeasurementsGraph GraphData={GraphData}></MeasurementsGraph>
          </CCardBody>
        </CCard>
        <CCard style={{ width: '100%', marginBottom: '15px' }}>
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
          <CCardHeader>
            {/* <GraphFilter
              SensorsList={GraphFilterSensorsList}
              setSensorsList={setGraphFilterSensorsList}
              setGraphData={setGraphData}
              GraphData={GraphData}
              rawData={TableData}
            ></GraphFilter> */}
          </CCardHeader>
          <CCardBody>
            <AllSensorsMinMaxAvgBarChart
              ChartData={AllSensorsMinMaxAvgData}
              /*  MaxList={AllSensorsMinMaxAvgData?.map((item) => item?.max)}
              AverageList={AllSensorsMinMaxAvgData?.map((item) => item?.average)}
              MinList={AllSensorsMinMaxAvgData?.map((item) => item?.min)}
              SensorsList={AllSensorsMinMaxAvgData?.map((item) => item?.sensor)} */
            ></AllSensorsMinMaxAvgBarChart>
          </CCardBody>
        </CCard>
        <MandrekasRadialChartsCard
          JSONdata={TableData}
          SensorsList={RadialChartsFilterSensorList}
        ></MandrekasRadialChartsCard>
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
