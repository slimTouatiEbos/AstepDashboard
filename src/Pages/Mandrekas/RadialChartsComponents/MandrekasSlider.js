import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../../index.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import MandrekasRadialCharts from './MandrekasRadialCharts'
import MandrekasSensorMinMaxAvgBarChart from './MandrekasSensorMinMaxAvgBarChart'

function SampleNextArrow(props) {
  const { className, onClick } = props
  return (
    <RightOutlined
      id="NextArrow"
      className={className}
      style={{
        color: '#0084ff',
        cursor: 'pointer',
        fontSize: '50px',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, onClick } = props
  return (
    <LeftOutlined
      id="PrevArrow"
      className={className}
      style={{
        color: '#0084ff',
        cursor: 'pointer',
        fontSize: '50px',
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    />
  )
}

function MandrekasSlider(props) {
  const settings = {
    lazyLoad: 'ondemand',
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const [ChartsData, setChartsData] = useState(props.RadialChartsData)

  useEffect(() => {
    setChartsData(props.RadialChartsData)
    requestAnimationFrame(() => {
      const PrevArrow = document.getElementById('PrevArrow')
      PrevArrow?.click()
    })
  }, [props.RadialChartsData])

  return (
    <>
      {/* Hide Slick’s default arrow icons (the black squares) */}
      <style>
        {`
          .slick-prev:before,
          .slick-next:before {
            display: none !important;
          }
        `}
      </style>

      <div className="slider-container" style={{ width: '100%', position: 'relative' }}>
        <Slider {...settings}>
          {ChartsData &&
            ChartsData.map((item, index) => (
              <div key={index} className="chart-item">
                <MandrekasRadialCharts
                  key={index}
                  sensor={item?.sensor}
                  max={item?.max}
                  average={item?.average}
                  min={item?.min}
                />
              </div>
            ))}
        </Slider>
      </div>

      <div className="slider-container" style={{ width: '100%', position: 'relative' }}>
        <Slider {...settings}>
          {ChartsData &&
            ChartsData.map((item, index) => (
              <div key={index} className="chart-item">
                <MandrekasSensorMinMaxAvgBarChart
                  key={index}
                  sensor={item?.sensor}
                  max={item?.max}
                  average={item?.average}
                  min={item?.min}
                />
              </div>
            ))}
        </Slider>
      </div>
    </>
  )
}

MandrekasSlider.propTypes = {
  RadialChartsData: PropTypes.array,
}

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
}

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default MandrekasSlider
