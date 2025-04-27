export const getMeasurementTableData = (JSONData) => {
  return JSONData?.map((item) => item)
}

export const filterDataByDate = (JSONData, startDate, endDate) => {
  if (startDate != '' && endDate != '') {
    return JSONData?.filter(
      (item) =>
        Date.parse(item.timestamp) <= Date.parse(endDate) &&
        Date.parse(item.timestamp) >= Date.parse(startDate),
    )
  } else {
    return JSONData
  }
}

export const getMeasurementGraphData = (JSONData) => {
  // Structuring the data to be readable for the chart
  let SensorList = []
  JSONData?.map((item) => {
    let test = SensorList.findIndex((sensor) => sensor == item.sensor) < 0

    return test ? SensorList.push(item.sensor) : test
  })

  let GraphData = SensorList?.map((item) => {
    return {
      series: { name: item, hidden: false, data: [] },
      colors: ['#' + Math.floor(Math.random() * 16777215 + 6).toString(16)], // random color generator
    }
  })

  JSONData?.map((item) => {
    let Index = GraphData.findIndex((GraphItem) => GraphItem.series.name == item.sensor)
    if (Index >= 0) {
      GraphData[Index].series.data.push({ x: item.timestamp, y: item.measurement })
      //    GraphData[Index].series.hidden = true
    }
  })
  return GraphData
}

export const getSourceList = (JSONData) => {
  let SourceList = []
  JSONData?.map((item) => {
    let test = SourceList.findIndex((source) => source == item.source) < 0

    return test ? SourceList.push(item.source) : test
  })
  return SourceList
}

export const getSensorList = (JSONData) => {
  let SensorList = []
  JSONData?.map((item) => {
    let test = SensorList.findIndex((sensor) => sensor == item.sensor) < 0

    return test ? SensorList.push(item.sensor) : test
  })

  return SensorList
}

export const getCurrentTablePageData = (currentData, page, pageLenth) => {
  return currentData?.slice(pageLenth * (page - 1), page * pageLenth)
}

export const getTablePageSensors = (currentData, page, pageLenth) => {
  return getSensorList(getCurrentTablePageData(currentData, page, pageLenth))
}

export const getFilteredMandrekasTableData = (
  JSONData,
  startDate,
  endDate,
  SourceList,
  SensorList,
) => {
  let FilteredData = []
  if (startDate != '' && endDate != '') {
    FilteredData = JSONData?.filter(
      (item) =>
        Date.parse(item.timestamp) <= Date.parse(endDate) &&
        Date.parse(item.timestamp) >= Date.parse(startDate),
    )
  } else {
    FilteredData = JSONData
  }
  FilteredData = FilteredData?.filter((item) => {
    let testSensor

    SensorList?.length > 0 ? (testSensor = SensorList?.includes(item.sensor)) : (testSensor = true)

    let testSource
    SourceList?.length > 0 ? (testSource = SourceList?.includes(item.source)) : (testSource = true)

    return testSensor && testSource
  })

  return FilteredData
}

export const getSensorMinMaxAvgData = (sensorName, JSONData) => {
  let SensorRadialChartData = {
    sensor: '',
    max: null,
    min: null,
    total: 0,
    occurrence: 0,
    average: null,
  }
  JSONData?.map((item, Index) => {
    if (item?.sensor == sensorName) {
      if (SensorRadialChartData.sensor == '') {
        SensorRadialChartData = {
          sensor: item?.sensor,
          max: item?.measurement,
          min: item?.measurement,
          total: SensorRadialChartData.total + item?.measurement,
          occurrence: SensorRadialChartData.occurrence + 1,
        }
      } else {
        SensorRadialChartData = {
          ...SensorRadialChartData,
          total: SensorRadialChartData.total + item?.measurement,
          occurrence: SensorRadialChartData.occurrence + 1,
        }
        if (item?.measurement < SensorRadialChartData.min) {
          SensorRadialChartData.min = item?.measurement
        }
        if (item?.measurement > SensorRadialChartData.max) {
          SensorRadialChartData.max = item?.measurement
        }
      }
    }
  })
  if (SensorRadialChartData.occurrence > 0) {
    return {
      ...SensorRadialChartData,
      average:
        Math.round((SensorRadialChartData.total / SensorRadialChartData.occurrence) * 1000) / 1000,
    }
  } else {
    return SensorRadialChartData
  }
}

export const getAllSensorsMinMaxAvgDataData = (SensorList, FilteredData) => {
  // let SensorList = getSensorList(FilteredData)
  let SensorListRadialChartsData = SensorList?.map((item) => {
    return getSensorMinMaxAvgData(item, FilteredData)
  })
  return SensorListRadialChartsData
}
