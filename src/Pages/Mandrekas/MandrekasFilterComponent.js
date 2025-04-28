import { CCard, CCardBody } from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Collapse, DatePicker, Select, Spin } from 'antd';
import PropTypes from 'prop-types';
import { getFilteredMandrekasTableData } from './MandrekasHelpers';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialMeasurements } from 'src/redux/actions/measurementActions';

const { RangePicker } = DatePicker;

function MandrekasFilterComponent(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  
  // State
  const CollapseLabels = ['More Filters', 'Hide'];
  const [CollapseItemLabel, setCollapseItemLabel] = useState(CollapseLabels[0]);
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2026-01-01');
  const [SourcesList, setSourcesList] = useState([1,2]);
  const [SensorsList, setSensorsList] = useState([]);

  // Get data and loading states from Redux store
  const { 
    mandrekas: { data: mandrekasData, loading: mandrekasLoading }, 
    arcelormittal: { data: arcelormittalData, loading: arcelormittalLoading } 
  } = useSelector((state) => state.measurement);

  // Determine which data to use based on route and selected sources
  const getCurrentData = () => {
    const path = location.pathname.toLowerCase();
    const isDocumentsPath = path.includes('documents');
    
    if (isDocumentsPath) {
      // For documents path, filter based on selected sources
      let result = [];
      if (SourcesList.includes(1)) {
        result = result.concat(mandrekasData || []);
      }
      if (SourcesList.includes(2)) {
        result = result.concat(arcelormittalData || []);
      }
      return result;
    } 
    
    // For other paths, use the original logic
    if (path.includes('mandrekas')) {
      return mandrekasData || [];
    } 
    if (path.includes('arcelormittal')) {
      return arcelormittalData || [];
    }
    
    return [];
  };

  // Check if any data is loading
  const isLoading = () => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes('mandrekas')) {
      return mandrekasLoading;
    } 
    if (path.includes('arcelormittal')) {
      return arcelormittalLoading;
    }
    if (path.includes('documents')) {
      return mandrekasLoading || arcelormittalLoading;
    }
    return false;
  };

  // Build query string for API calls
  const buildQueryString = () => {
    return `startDate=${dayjs(startDate).toISOString()}&endDate=${dayjs(endDate).toISOString()}`;
  };

  // Initial data load - runs once on mount
  const latestStartDate = useRef(startDate);
  const latestEndDate = useRef(endDate);
  
  // Whenever startDate or endDate change, update refs
  useEffect(() => {
    latestStartDate.current = startDate;
    latestEndDate.current = endDate;
  }, [startDate, endDate]);
  
  useEffect(() => {
    console.log("init load");
  
    const currentData = getCurrentData();
    props.setJSONdata(currentData);
    props.setRawData(
      getFilteredMandrekasTableData(
        currentData, 
        startDate,
        endDate,
        SourcesList,
        SensorsList,
      )
    );
  
    return () => {
      console.log("Component unmounted, checking if reset needed");
  
      const defaultStart = dayjs('2020-01-01');
      const defaultEnd = dayjs('2026-01-01');
  
      if (
        !dayjs(latestStartDate.current).isSame(defaultStart, 'day') ||
        !dayjs(latestEndDate.current).isSame(defaultEnd, 'day')
      ) {
        console.log("Dates are different, resetting...");
        dispatch(fetchInitialMeasurements(
          `startDate=${defaultStart.toISOString()}&endDate=${defaultEnd.toISOString()}`
        ));
      } else {
        console.log("Dates already default, no reset needed.");
      }
    };
  }, []);
  

  // Handle data display and filtering
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!isLoading()) {
      console.log("Updating displayed data");
      const currentData = getCurrentData();
      
      props.setJSONdata(currentData);
      props.setRawData(
        getFilteredMandrekasTableData(
          currentData, 
          startDate,
          endDate,
          SourcesList,
          SensorsList,
        )
      );
    }
  }, [mandrekasData, arcelormittalData, startDate, endDate, SourcesList, SensorsList]);

  // Handle date changes - fetch new data
  const handleDateChange = (dates, dateStrings) => {
    console.log("Date changed, fetching new data");
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
    dispatch(fetchInitialMeasurements(
      `startDate=${dayjs(dateStrings[0]).toISOString()}&endDate=${dayjs(dateStrings[1]).toISOString()}`
    ));
  };

  // Handle reset
  const handleReset = () => {
    const newStart = dayjs().subtract(7, 'day');
    const newEnd = dayjs();
    setStartDate(newStart.format('YYYY-MM-DD'));
    setEndDate(newEnd.format('YYYY-MM-DD'));
    setSourcesList([1, 2]); // Reset to show both sources
    setSensorsList([]);
    dispatch(fetchInitialMeasurements(
      `startDate=${newStart.toISOString()}&endDate=${newEnd.toISOString()}`
    ));
  };

  return (
    <div>
      <Spin spinning={isLoading()} tip="Loading data...">
        <CCard className="filter-card" style={{ marginBottom: '10px' }}>
          <CCardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h6 style={{ fontSize: '1.2rem', color: '#39539E' }}>Date & Time</h6>
              <Button
                type="default"
                onClick={handleReset}
                style={{
                  backgroundColor: '#39539E',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                Reset
              </Button>
            </div>

            <RangePicker
              showTime
              value={[
                startDate === '' ? startDate : dayjs(startDate),
                endDate === '' ? endDate : dayjs(endDate),
              ]}
              onChange={handleDateChange}
              className="Date-Range-Picker"
              disabled={isLoading()}
            />

            <Collapse
              items={[
                {
                  key: '1',
                  label: (
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#39539E',
                        cursor: 'pointer',
                        transition: 'color 0.3s, transform 0.3s',
                        textAlign: 'left',
                        marginLeft: '10px',
                      }}
                      className="collapse-label"
                    >
                      {CollapseItemLabel}
                    </span>
                  ),
                  children: (
                    <div>
                      { location.pathname.toLowerCase() === '/documents' && (
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
                            options={[
                              { label: 'Mandrekas', value: 1 },
                              { label: 'ArcelorMittal', value: 2 }
                            ]}
                            disabled={isLoading()}
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
                          disabled={isLoading()}
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
      </Spin>
    </div>
  );
}

MandrekasFilterComponent.propTypes = {
  SensorsList: PropTypes.array,
  SourcesList: PropTypes.array,
  setRawData: PropTypes.func.isRequired,
  JSONdata: PropTypes.array,
  setJSONdata: PropTypes.func.isRequired,
  FilterBySource: PropTypes.bool,
  Source: PropTypes.number,
};

export default MandrekasFilterComponent;