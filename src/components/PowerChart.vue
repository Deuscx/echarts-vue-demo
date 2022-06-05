<script setup lang="ts">
import { powerWindData } from '~/composables/chartData'

const option = computed<EChartsOption>(() => {
  if (!powerWindData.value || !powerWindData.value.length)
    return false
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
    // dataZoom: {
    //   type: 'slider',
    //   endValue: 30,
    // },
    tooltip: {},
    // animationDuration: 1000 * 60 * 10,
    dataset: [
      {
        source: powerWindData.value,
        dimensions: powerWindData.value.dimensions,
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
    xAxis: { name: '风速', type: 'category' },
    yAxis: { name: '功率', type: 'value' },
    series: [
      {
        type: 'scatter',
        encode: {
          x: 'avaWindspeed',
          y: 'avaPower',
        },
      },
      {
        name: 'line',
        type: 'line',
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 },
      },
    ],
  }
})
watch(option, (val) => {
  if (val)
    console.log('😀 power', val)
})
</script>

<template>
  <v-chart
    v-if="option"
    w-full
    h-100vh
    :option="option"
    theme="ovilia-green"
    autoresize
  />
</template>

<style scoped>
</style>
