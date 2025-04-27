import { CCard, CCardBody } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Button, Collapse, DatePicker, Select } from 'antd'
import PropTypes from 'prop-types'
import { getFilteredMandrekasTableData } from './MandrekasHelpers'

import dayjs from 'dayjs'
import useMeasurementService from 'src/services/measurementsServices'
import { useSelector } from 'react-redux'
// import { getMeasurement_Service } from 'src/services/measurementsServices'
const { RangePicker } = DatePicker

function MandrekasFilterComponent(props) {
  const CollapseLabels = ['More Filters', 'Hide']
  const [CollapseItemLabel, setCollapseItemLabel] = useState(CollapseLabels[0])
  // const [startDate, setstartDate] = useState(dayjs().subtract(7, 'day'))
  // const [endDate, setendDate] = useState(dayjs())
  const [startDate, setstartDate] = useState('2020-01-01');
  const [endDate, setendDate] = useState('2026-01-01')
  const [SourcesList, setSourcesList] = useState([])
  const [SensorsList, setSensorsList] = useState([])

  // useEffect(() => {
  //   let resp
  //   getMeasurement_Service(props.Source, startDate, endDate)
  //     .then((response) => {
  //       resp = response
  //       props.setJSONdata(response)
  //       props.setRawData(
  //         getFilteredMandrekasTableData(
  //           props.JSONdata,
  //           startDate,
  //           endDate,
  //           SourcesList,
  //           SensorsList,
  //         ),
  //       )
  //     })
  //     .catch((res) => {
  //       props.setJSONdata([])
  //       alert('failed to fetch data')
  //     })
  // }, [startDate, endDate, SourcesList, SensorsList])
  const { getMeasurement_Service } = useMeasurementService();
  const { data } = useSelector((state) => state.measurement);
  
  // Fetch new data when source or date changes
  useEffect(() => {
    getMeasurement_Service(props.Source, startDate, endDate);
  }, [ startDate, endDate,props.Source]);
  
  useEffect(() => {
    console.log(props.Source)
    props.setJSONdata(data);
    props.setRawData(
      getFilteredMandrekasTableData(
        data, 
        startDate,
        endDate,
        SourcesList,
        SensorsList,
      )
    );
  }, [data, startDate, endDate, SourcesList, SensorsList,props.Source]);

  return (
    <div>
      <CCard className="filter-card" style={{ marginBottom: '10px' }}>
        <CCardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h6 style={{ fontSize: '1.2rem', color: '#39539E' }}>Date & Time</h6>
            <Button
              type="default"
              onClick={() => {
                setstartDate(dayjs().subtract(7, 'day'))
                setendDate(dayjs())
                setSourcesList([])
                setSensorsList([])
              }}
              style={{
                backgroundColor: '#39539E',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Reset
            </Button>
          </div>

          {/* Date Range Picker */}
          <RangePicker
            showTime
            value={[
              startDate === '' ? startDate : dayjs(startDate),
              endDate === '' ? endDate : dayjs(endDate),
            ]}
            onChange={(dates, dateStrings) => {
              setstartDate(dateStrings[0])
              setendDate(dateStrings[1])
              console.log(dates)
              console.log(dateStrings)
            }}
            /* style={{
              width: '100%',
              marginBottom: '0px',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }} */
            className="Date-Range-Picker"
          />

          {/* Collapse Section */}
          <Collapse
            items={[
              {
                key: '1',
                label: (
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#39539E', // Label color
                      cursor: 'pointer',
                      transition: 'color 0.3s, transform 0.3s',
                      textAlign: 'left', // Align text properly
                      marginLeft: '10px',
                    }}
                    className="collapse-label"
                  >
                    {CollapseItemLabel}
                  </span>
                ),
                children: (
                  <div>
                    {props.FilterBySource && (
                      <div style={{ marginBottom: '15px' }}>
                        <h6 style={{ color: '#39539E', fontSize: '1rem' }}>Select Sources</h6>
                        <Select
                          mode="multiple"
                          style={{
                            width: '100%',
                            borderRadius: '8px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                          }}
                          placeholder="Select sources"
                          value={SourcesList}
                          onChange={(value) => setSourcesList(value)}
                          options={props.SourcesList?.map((item) => ({
                            label: item,
                            value: item,
                            desc: item,
                          }))}
                        />
                      </div>
                    )}

                    <div>
                      <h6 style={{ color: '#39539E', fontSize: '1rem' }}>Select Sensors</h6>
                      <Select
                        mode="multiple"
                        style={{
                          width: '100%',
                          borderRadius: '8px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        }}
                        placeholder="Select sensors"
                        value={SensorsList}
                        onChange={(value) => setSensorsList(value)}
                        options={props.SensorsList?.map((item) => ({
                          label: item,
                          value: item,
                          desc: item,
                        }))}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
            ghost
            onChange={(e) => {
              e.length > 0
                ? setCollapseItemLabel(CollapseLabels[1])
                : setCollapseItemLabel(CollapseLabels[0])
            }}
            style={{ marginTop: '15px' }}
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

MandrekasFilterComponent.propTypes = {
  SensorsList: PropTypes.any,
  SourcesList: PropTypes.any,
  setRawData: PropTypes.any,
  JSONdata: PropTypes.any,
  setJSONdata: PropTypes.any,
  FilterBySource: PropTypes.any,
  Source: PropTypes.any,
}

export default MandrekasFilterComponent
