<script setup lang="ts">
import * as d3 from 'd3'
import type { DSVParsedArray } from 'd3'
import type { EChartsOption } from 'echarts/types/dist/shared'

const monitorData = ref<DSVParsedArray>({ columns: 0, length: 0 })
d3.csv('./monitor.csv').then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 28 ~ d3.csv ~ data', data)

  const dimensions = [
    'Time',
    { name: 'ָIndicator', displayName: '指标', type: 'float' },
  ]
  data.dimensions = dimensions
  monitorData.value = data
  console.log(monitorData)
})

const option = computed<EChartsOption>(() => {
  if (!monitorData.value || !monitorData.value.length)
    return false
  //   return {
  //     legend: {},
  //     tooltip: {},
  //     toolbox: {
  //       right: 10,
  //       feature: {
  //         dataZoom: {
  //           yAxisIndex: "none",
  //         },
  //         restore: {},
  //         saveAsImage: {},
  //       },
  //     },
  //     dataset: {
  //       source: [
  //         { "ָIndicator": 0.002158842, Time: "01/05/2014 00:10:00" },
  //         { "ָIndicator": 0.002834303, Time: "01/05/2014 00:20:00" },
  //         { "ָIndicator": 0.003316942, Time: "01/05/2014 00:30:00" },
  //         { "ָIndicator": 0.003530137, Time: "01/05/2014 00:40:00" },
  //         { "ָIndicator": 0.003819931, Time: "01/05/2014 00:50:00" },
  //       ],
  //       dimensions: [
  //         { name: "ָIndicator", displayName: "指标", type: "float" },
  //         // 'ָIndicator',
  //         "Time",
  //       ],
  //     },
  //     xAxis: { type: "category" },
  //     yAxis: { name: "指标", type: "value" },
  //     series: [
  //       {
  //         type: "line",
  //         encode: {
  //           x: "Time",
  //           y: "ָIndicator",
  //         },
  //       },
  //     ],
  //     visualMap: {
  //       //   type: 'piecewise',
  //       top: 50,
  //       right: 1,
  //       dimension: 0,
  //       //   seriesIndex: 0,
  //       inRange: {
  //         color: ["#65B581", "#FFCE34", "#FD665F"],
  //       },
  //     },
  //   };
  return {
    legend: {},
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
        saveAsImage: {},
      },
    },
    dataZoom: {
      type: 'slider',
      // startValue: '01/05/2014 00:00:00',
      endValue: 30,
    },
    tooltip: {},
    dataset: {
      source: monitorData.value,
      dimensions: monitorData.value.dimensions,
    },
    xAxis: { type: 'category' },
    yAxis: { name: '指标', type: 'value' },
    series: [
      {
        type: 'line',
        encode: {
          x: 'Time',
          y: 'ָIndicator',
        },
      },
    ],
    visualMap: {
      //   type: 'piecewise',
      top: 50,
      right: 1,
      dimension: 1,
      //   seriesIndex: 0,
      //   pieces: [
      //     { min: 0.002122 }, // 不指定 max，表示 max 为无限大（Infinity）。
      //   ],
      pieces: [
        {
          lte: 0.002121,
          color: 'green',
        },
        {
          gt: 0.002122,
          color: 'red',
        },
      ],
    },
  }
})
</script>

<template>
  <v-chart
    v-if="option"
    w-full
    h-50vh
    :option="option"
    theme="ovilia-green"
    autoresize
  />
</template>

<style scoped>
</style>
