<script setup lang="ts">
import { powerWindData } from '~/composables/chartData'
// See https://github.com/ecomfe/echarts-stat
// https://github.com/ecomfe/echarts-stat/blob/master/README.zh-CN.md
const data = [
  [96.24, 11.35],
  [33.09, 85.11],
  [57.6, 36.61],
  [36.77, 27.26],
  [20.1, 6.72],
  [45.53, 36.37],
  [110.07, 80.13],
  [72.05, 20.88],
  [39.82, 37.15],
  [48.05, 70.5],
  [0.85, 2.57],
  [51.66, 63.7],
  [61.07, 127.13],
  [64.54, 33.59],
  [35.5, 25.01],
  [226.55, 664.02],
  [188.6, 175.31],
  [81.31, 108.68],
]

const option = computed<EChartsOption>(() => {
  if (!powerWindData.value || !powerWindData.value.length)
    return false
  return {
    legend: {},
    dataset: [

      {
        source: powerWindData.value,
      },
      {
        transform: {
          type: 'ecStat:regression',
          config: {
            method: 'linear',
          },
          print: true,
        },
      },
    ],
    xAxis: {
      name: '风速',
      type: 'category',
    },
    yAxis: {
      name: '功率',
      type: 'value',
    },
    series: [
      {
        type: 'scatter',
      },
      {
        name: 'line',
        type: 'line',
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        label: {
          show: true,
          fontSize: 16,
        },
        labelLayout: {
          dx: -20,
        },
        encode: {
          label: 2,
          tooltip: 1,
        },
      },
    ],
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
