import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const RadialChart = ({ labels, series }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // series: [max, average, min]
  const rawSeries = series || []
  const maxVal = rawSeries[0] ? rawSeries[0] : 1 // avoid division by zero

  // Compute fill percentages based on max:
  // - Outer ring (max): always 100%
  // - Middle ring (average): (average / max) * 100
  // - Inner ring (min): if negative, fill = 0; otherwise (min / max) * 100
  const computedFill = [
    100,
    rawSeries[1] !== undefined ? (rawSeries[1] / maxVal) * 100 : 0,
    rawSeries[2] !== undefined ? (rawSeries[2] < 0 ? 0 : (rawSeries[2] / maxVal) * 100) : 0,
  ]

  // Define colors for each ring and a grey trail for the incomplete portion
  const colors = ['#1ab7ea', '#0084ff', '#ffc300']
  const trailColor = '#d6d6d6'

  // Container size (adjust as needed)
  const containerSize = 250

  // Helper function for container styles: Only change brightness on hover.
  const getRingContainerStyle = (index, top, left, width, height) => ({
    position: 'absolute',
    top,
    left,
    width,
    height,
    transition: 'filter 0.2s ease',
    filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)',
  })

  return (
    <div style={{ position: 'relative', width: containerSize, height: containerSize }}>
      {/* Outer ring (Max) */}
      <div
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={getRingContainerStyle(0, 0, 0, '100%', '100%')}
      >
        <CircularProgressbar
          value={computedFill[0]}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: colors[0],
            trailColor: trailColor,
          })}
        />
      </div>
      {/* Middle ring (Average) */}
      <div
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={getRingContainerStyle(1, '10%', '10%', '80%', '80%')}
      >
        <CircularProgressbar
          value={computedFill[1]}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: colors[1],
            trailColor: trailColor,
          })}
        />
      </div>
      {/* Inner ring (Min) */}
      <div
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={getRingContainerStyle(2, '20%', '20%', '60%', '60%')}
      >
        <CircularProgressbar
          value={computedFill[2]}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: colors[2],
            trailColor: trailColor,
          })}
        />
      </div>
      {/* Center text: show only hovered ring’s title and value; otherwise, show all */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none', // allow clicks to pass through
        }}
      >
        {hoveredIndex !== null ? (
          <div style={{ fontSize: 16, color: colors[hoveredIndex], fontWeight: 'bold' }}>
            {labels && labels[hoveredIndex]
              ? `${labels[hoveredIndex]}: ${rawSeries[hoveredIndex]}`
              : `${hoveredIndex === 0 ? 'Max' : hoveredIndex === 1 ? 'Avg' : 'Min'}: ${
                  rawSeries[hoveredIndex]
                }`}
          </div>
        ) : (
          <>
            <div style={{ fontSize: 14, color: colors[0], marginBottom: 3, fontWeight: 'bold' }}>
              {labels && labels[0] ? `${labels[0]}: ${rawSeries[0]}` : `Max: ${rawSeries[0]}`}
            </div>
            <div style={{ fontSize: 14, color: colors[1], marginBottom: 3, fontWeight: 'bold' }}>
              {labels && labels[1] ? `${labels[1]}: ${rawSeries[1]}` : `Avg: ${rawSeries[1]}`}
            </div>
            <div style={{ fontSize: 14, color: colors[2], fontWeight: 'bold' }}>
              {labels && labels[2] ? `${labels[2]}: ${rawSeries[2]}` : `Min: ${rawSeries[2]}`}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

RadialChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  series: PropTypes.arrayOf(PropTypes.number),
}

export default RadialChart
