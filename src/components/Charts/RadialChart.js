// RadialChart.jsx
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import html2canvas from 'html2canvas'

const RadialChart = forwardRef(({ labels, series }, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const containerRef = useRef(null) // wrap the entire chart in a <div> for html2canvas

  // series: [max, average, min]
  const rawSeries = series || []
  const maxVal = rawSeries[0] || 1

  const computedFill = [
    100,
    rawSeries[1] !== undefined ? (rawSeries[1] / maxVal) * 100 : 0,
    rawSeries[2] !== undefined ? (rawSeries[2] < 0 ? 0 : (rawSeries[2] / maxVal) * 100) : 0,
  ]

  const colors = ['#1ab7ea', '#0084ff', '#ffc300']
  const trailColor = '#d6d6d6'
  const containerSize = 250

  const getRingContainerStyle = (index, top, left, width, height) => ({
    position: 'absolute',
    top,
    left,
    width,
    height,
    transition: 'filter 0.2s ease',
    filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)',
  })

  // Expose an async getImage() to parent (returns base64 PNG)
  useImperativeHandle(ref, () => ({
    getImage: async () => {
      if (!containerRef.current) return null
      const canvas = await html2canvas(containerRef.current, { backgroundColor: null, scale: 2 })
      return canvas.toDataURL('image/png')
    },
  }))

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: containerSize, height: containerSize }}
    >
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
            trailColor,
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
            trailColor,
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
            trailColor,
          })}
        />
      </div>

      {/* Center text */}
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
          pointerEvents: 'none',
        }}
      >
        {hoveredIndex !== null ? (
          <div style={{ fontSize: 16, color: colors[hoveredIndex], fontWeight: 'bold' }}>
            {labels?.[hoveredIndex]
              ? `${labels[hoveredIndex]}: ${rawSeries[hoveredIndex]} °C`
              : `${hoveredIndex === 0 ? 'Max' : hoveredIndex === 1 ? 'Avg' : 'Min'}: ${
                  rawSeries[hoveredIndex]
                } °C`}
          </div>
        ) : (
          <>
            <div style={{ fontSize: 14, color: colors[0], marginBottom: 3, fontWeight: 'bold' }}>
              {labels?.[0] ? `${labels[0]}: ${rawSeries[0]} °C` : `Max: ${rawSeries[0]} °C`}
            </div>
            <div style={{ fontSize: 14, color: colors[1], marginBottom: 3, fontWeight: 'bold' }}>
              {labels?.[1] ? `${labels[1]}: ${rawSeries[1]} °C` : `Avg: ${rawSeries[1]} °C`}
            </div>
            <div style={{ fontSize: 14, color: colors[2], fontWeight: 'bold' }}>
              {labels?.[2] ? `${labels[2]}: ${rawSeries[2]} °C` : `Min: ${rawSeries[2]} °C`}
            </div>
          </>
        )}
      </div>
    </div>
  )
})

RadialChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  series: PropTypes.arrayOf(PropTypes.number),
}

export default RadialChart
