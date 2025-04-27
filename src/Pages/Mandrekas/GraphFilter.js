import { Select } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { getSensorList } from './MandrekasHelpers'

function GraphFilter(props) {
  const [AllSensorsList, setAllSensorsList] = useState(getSensorList(props.rawData))

  useEffect(() => {
    setAllSensorsList(getSensorList(props.rawData))
  }, [props.rawData])

  useEffect(() => {
    let NewData
    if (props.SensorsList?.length > 0) {
      NewData = props.GraphData?.map((item) => {
        if (props.SensorsList.includes(item?.series.name)) {
          return { ...item, series: { ...item.series, hidden: false } }
        } else {
          return { ...item, series: { ...item.series, hidden: true } }
        }
      })
    } else {
      NewData = props.GraphData?.map((item) => {
        return { ...item, series: { ...item.series, hidden: false } }
      })
    }

    props.setGraphData(NewData)
  }, [props.SensorsList])

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h6 style={styles.title}>Select Sensors</h6>
      </div>
      <Select
        mode="multiple"
        style={{
          width: '100%',
        }}
        placeholder="select sensors"
        value={props.SensorsList}
        onChange={(value) => {
          props.setSensorsList(value)
        }}
        options={
          AllSensorsList?.length > 0
            ? AllSensorsList.map((item) => ({
                label: item,
                value: item,
                desc: item,
              }))
            : [{ label: 'No sensors available', value: 'no-sensors' }]
        }
        dropdownStyle={styles.dropdown} // Custom dropdown style
        optionLabelProp="desc" // For better hover description display
        tagRender={(prop) => (
          <div style={styles.selectedTag}>
            <span>{prop.label}</span>
            <span onClick={() => prop.onClose()} style={styles.closeIcon}>
              &times;
            </span>
          </div>
        )}
      ></Select>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f7f9fc', // Light background
    borderRadius: '8px', // Rounded corners
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
  },
  header: {
    marginBottom: '15px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#39539E', // Using one of your theme colors for text
    margin: 0,
  },
  select: {
    width: '100%',
    borderColor: '#39539E', // Matching border color with theme
    borderRadius: '5px',
    backgroundColor: '#ffffff', // White background for Select input
    fontSize: '14px',
    padding: '8px',
    transition: 'border-color 0.3s', // Smooth border transition on focus
  },
  selectFocused: {
    borderColor: '#1ab7ea', // Lighter blue for focus state
    boxShadow: '0 0 5px rgba(26, 183, 234, 0.5)', // Focus effect with a glow
  },
  selectItem: {
    fontSize: '14px',
    color: '#39539E', // Dark text color for options
  },
  selectOption: {
    color: '#39539E', // Matching text color
    backgroundColor: '#f0f4fb', // Light blue background for hovered options
    padding: '8px', // Padding for better spacing
    transition: 'background-color 0.3s', // Smooth transition for hover
  },
  selectOptionHover: {
    backgroundColor: '#0084ff', // Lighter blue background when hovered
    color: '#ffffff', // White text on hover
  },
  selectOptionActive: {
    backgroundColor: '#1ab7ea', // Active state with a light blue background
    color: '#ffffff', // White text for active state
  },
  dropdown: {
    backgroundColor: '#ffffff', // White background for dropdown
    borderRadius: '8px', // Rounded dropdown edges
    border: '1px solid #39539E', // Border color to match theme
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Light shadow for dropdown
    padding: '5px 0', // Space inside the dropdown
  },
  selectedTag: {
    backgroundColor: '#f0f4fb', // Light blue background for selected items
    color: '#39539E', // Dark text color for the selected items
    borderRadius: '5px',
    padding: '5px 10px',
    margin: '5px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  },
  closeIcon: {
    marginLeft: '8px',
    color: '#ff5722', // Icon color (you can adjust to match the theme)
    cursor: 'pointer',
    fontSize: '16px',
  },
}

GraphFilter.propTypes = {
  SensorsList: PropTypes.any,
  setSensorsList: PropTypes.any,
  setGraphData: PropTypes.any,
  GraphData: PropTypes.any,
  rawData: PropTypes.any,
}
export default GraphFilter
