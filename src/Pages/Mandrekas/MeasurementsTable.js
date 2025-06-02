import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Spin } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getSensorList, getSourceList } from './MandrekasHelpers';

const MeasurementsTable = (props) => {
  const dispatch = useDispatch();
  const [SensorList, setSensorList] = useState([]);
  const [SourceList, setSourceList] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      pageSizeOptions: [5, 10],
    },
  });

    // Map 1 → “Mandrekas”, 2 → “ArcelorMittal”
    const sourceMap = {
      1: 'Mandrekas',
      2: 'ArcelorMittal',
    };
  

  // Get loading states from Redux store
  const { 
    mandrekas: { loading: mandrekasLoading }, 
    arcelormittal: { loading: arcelormittalLoading } 
  } = useSelector((state) => state.measurement);

  // Determine loading state based on current route
  const isLoading = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('mandrekas')) return mandrekasLoading;
    if (path.includes('arcelormittal')) return arcelormittalLoading;
    return mandrekasLoading || arcelormittalLoading;
  };

  const columns = [
    {
      title: 'Date & Time',
      dataIndex: 'timestamp',
      render: (record) => {
        let tmstmp = new Date(record);
        let text = tmstmp.toLocaleString('en-US');
        return <p>{text}</p>;
      },
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#3c4b64',
          color: '#fff',
          textAlign: 'center',
          padding: '12px',
          fontSize: '16px',
          borderBottom: '3px solid #0084ff',
        },
      }),
    },
    {
      title: 'Sensor',
      dataIndex: 'sensor',
      render: (text) => <span style={{ color: '#0084ff' }}>{text}</span>,
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#3c4b64',
          color: '#fff',
          textAlign: 'center',
          padding: '12px',
          fontSize: '16px',
          borderBottom: '3px solid #0084ff',
        },
      }),
    },
    {
      title: 'Measurement',
      dataIndex: 'measurement',
      render: (value) => {
        // Lookup the display name; default to raw value if not in map
        const displayText = value + ' °C';
        return <Tag color="#ffc300">{displayText}</Tag>;
      },      onHeaderCell: () => ({
        style: {
          backgroundColor: '#3c4b64',
          color: '#fff',
          textAlign: 'center',
          padding: '12px',
          fontSize: '16px',
          borderBottom: '3px solid #ffc300',
        },
      }),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      responsive: ['sm'],
      render: (value) => {
        // Lookup the display name; default to raw value if not in map
        const displayText = sourceMap[value] || value;
        return <Tag color="#39539E">{displayText}</Tag>;
      },
      onHeaderCell: () => ({
        style: {
          backgroundColor: '#3c4b64',
          color: '#fff',
          textAlign: 'center',
          padding: '12px',
          fontSize: '16px',
          borderBottom: '3px solid #39539E',
        },
      }),
    },
  ];

  const [TableData, setTableData] = useState(props.tableData);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    dispatch({ type: 'set', mandrekaTablePage: pagination.current });
    props.setCurrentTableData(extra.currentDataSource);
  };

  useEffect(() => {
    dispatch({ type: 'set', mandrekaTablePage: 1 });
    props.setCurrentTableData(props.tableData);
  }, []);

  useEffect(() => setTableData(props.tableData), [props.tableData]);
  useEffect(
    () =>
      setSensorList(
        getSensorList(props.tableData)?.map((item) => {
          return { text: item, value: item };
        }),
      ),
    [props.tableData],
  );

  useEffect(() => {
    setSourceList(
      getSourceList(props.tableData)?.map((item) => {
        return { text: item, value: item };
      }),
    );
    setTableData(props.tableData);
  }, [props.tableData]);

  const customStyles = {
    table: {
      width: '100%',
      backgroundColor: '#f7f9fc',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: '#3c4b64',
      color: '#fff',
      textAlign: 'center',
      padding: '12px',
      fontSize: '16px',
    },
    row: {
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: '#f0f7ff',
      },
    },
    pagination: {
      backgroundColor: '#39539E',
      color: '#fff',
      fontSize: '14px',
      borderRadius: '8px',
      padding: '5px 15px',
      textAlign: 'center',
    },
    paginationButton: {
      backgroundColor: '#1ab7ea',
      borderColor: '#1ab7ea',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: '4px',
    },
    paginationButtonHover: {
      backgroundColor: '#0084ff',
      borderColor: '#0084ff',
      color: '#fff',
    },
    tag: {
      color: '#fff',
      borderRadius: '4px',
      padding: '4px 8px',
      fontWeight: 'bold',
    },
    sourceTag: {
      backgroundColor: '#1ab7ea',
    },
    measurementTag: {
      backgroundColor: '#ffc300',
    },
    sensorText: {
      color: '#0084ff',
      fontWeight: 'bold',
    },
    tableWrapper: {
      margin: '20px 0',
      border: '1px solid #e1e5f2',
      borderRadius: '10px',
      padding: '10px',
      backgroundColor: '#fff',
    },
  };

  return (
    <Spin 
      spinning={isLoading()} 
      tip="Loading data..." 
      size="large"
      style={{ maxHeight: 'none' }} // Prevents Spin from collapsing table height
    >
      <div style={customStyles.tableWrapper}>
        <Table
          columns={columns}
          dataSource={TableData?.map((item, index) => {
            return { key: index, ...item };
          })}
          pagination={{
            ...tableParams.pagination,
            position: ['bottomCenter'],
            itemRender: (current, type, originalElement) => {
              if (type === 'prev') {
                return <a style={customStyles.paginationButton}>Prev</a>;
              }
              if (type === 'next') {
                return <a style={customStyles.paginationButton}>Next</a>;
              }
              return originalElement;
            },
          }}
          onChange={handleTableChange}
          style={customStyles.table}
          scroll={{
            x: 'max-content',
          }}
          rowClassName="custom-row"
          locale={{
            emptyText: 'No Data Available',
          }}
          bordered
          loading={isLoading()} // Additional loading indicator in table
        />
      </div>
    </Spin>
  );
};

MeasurementsTable.propTypes = {
  tableData: PropTypes.array,
  CurrentTableData: PropTypes.array,
  setCurrentTableData: PropTypes.func,
};

export default MeasurementsTable;