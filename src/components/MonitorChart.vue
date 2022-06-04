<script setup lang="ts">
import { monitorData } from '~/composables/chartData'

const option = computed<EChartsOption>(() => {
  if (!monitorData.value || !monitorData.value.length)
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
    dataZoom: {
      type: 'slider',
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
        markLine: {
          lineStyle: {
            color: '#FD665F',
          },
          precision: 6,
          data: [
            {
              yAxis: 0.002122,
            },
          ],
        },
      },
    ],
    visualMap: {
      //   type: 'piecewise',
      top: 50,
      right: 1,
      dimension: 1,
      precision: 6,
      pieces: [
        {
          lte: 0.002121,
          color: 'green',
          label: '正常',
        },
        {
          gt: 0.002122,
          color: 'red',
          label: '异常',
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
