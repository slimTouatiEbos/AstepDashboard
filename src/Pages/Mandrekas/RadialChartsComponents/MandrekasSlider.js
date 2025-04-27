import PropTypes from 'prop-types'
import React, { Component, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../../index.css'
import { FaAngleLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import MandrekasRadialCharts from './MandrekasRadialCharts'
import RadialChart from 'src/components/Charts/RadialChart'
import CIcon from '@coreui/icons-react'
import { cilArrowThickLeft, cilArrowThickRight } from '@coreui/icons'
import Icon, { RightOutlined, LeftOutlined } from '@ant-design/icons'
import MandrekasBarChart from './MandrekasSensorMinMaxAvgBarChart'
import MandrekasSensorMinMaxAvgBarChart from './MandrekasSensorMinMaxAvgBarChart'

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <RightOutlined
      id="NextArrow"
      className={className}
      style={{
        color: '#0084ff',
        cursor: 'pointer',
        fontSize: '50px',
        position: 'absolute', // Correctly position the arrow
        right: '10px', // Ensure it stays within bounds
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <LeftOutlined
      id="PrevArrow"
      className={className}
      style={{
        color: '#0084ff',
        cursor: 'pointer',
        fontSize: '50px',
        position: 'absolute', // Correctly position the arrow
        //   left: '10px', // Ensure it stays within bounds
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    />
  )
}

function MandrekasSlider(props) {
  const settings = {
    lazyLoad:"ondemand",
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

  // useEffect(() => {
  //   setChartsData(props.RadialChartsData)
  //   var PrevArrow = document.getElementById('PrevArrow')
  //   PrevArrow && PrevArrow.click()
  // }, [props.RadialChartsData])

  // useEffect(() => {
  //   var PrevArrow = document.getElementById('PrevArrow')
  //   PrevArrow && PrevArrow.click()
  //   // PrevArrow.click()
  // }, [ChartsData])
  useEffect(() => {
    setChartsData(props.RadialChartsData)
    requestAnimationFrame(() => {
      const PrevArrow = document.getElementById('PrevArrow')
      PrevArrow?.click()
    })
  }, [props.RadialChartsData])
  
  //console.log(ChartsData)

  return (
    <>
      <div className="slider-container" style={{ width: '100%', position: 'relative' }}>
        <Slider {...settings}>
          {ChartsData &&
            ChartsData?.map((item, index) => {
              // console.log(item)

              return (
                <div key={index} className="chart-item">
                  <MandrekasRadialCharts
                    key={index}
                    sensor={item?.sensor}
                    max={item?.max}
                    average={item?.average}
                    min={item?.min}
                  />
                </div>
              )
            })}
        </Slider>
      </div>
      <div className="slider-container" style={{ width: '100%', position: 'relative' }}>
        <Slider {...settings}>
          {ChartsData &&
            ChartsData?.map((item, index) => {
              return (
                <div key={index} className="chart-item">
                  <MandrekasSensorMinMaxAvgBarChart
                    key={index}
                    sensor={item?.sensor}
                    max={item?.max}
                    average={item?.average}
                    min={item?.min}
                  />
                </div>
              )
            })}
        </Slider>
      </div>
    </>
  )
}

export default MandrekasSlider

SampleNextArrow.propTypes = {
  className: PropTypes.any,
  onClick: PropTypes.any,
  style: PropTypes.any,
}

SamplePrevArrow.propTypes = {
  className: PropTypes.any,
  onClick: PropTypes.any,
  style: PropTypes.any,
}

MandrekasSlider.propTypes = {
  RadialChartsData: PropTypes.any,
}
