<script setup lang="ts">
import type { EChartsOption } from 'echarts/types/dist/shared'
import { scandata } from '~/composables/chartData'

const seriesValue = ref(['line', 'line', 'line', 'line'])
const series = computed(() => seriesValue.value.map(type => ({ type })))
const range = ref([1388851800000, 1441296000000])
const option = computed<EChartsOption>(() => {
  if (!scandata.value || !scandata.value.length)
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
      // startValue: '01/05/2014 00:00:00',
      endValue: 30,
    },
    tooltip: {},
    dataset: {
      source: scandata.value.filter(
        d =>
          +new Date(d.Time) > range.value[0]
          && +new Date(d.Time) < range.value[1],
      ),
      dimensions: scandata.value.dimensions,
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: series.value,
  }
})

const seriesType = [
  {
    label: '柱状',
    value: 'bar',
  },
  {
    label: '线状',
    value: 'line',
  },
]
</script>

<template>
  <n-date-picker
    v-model:value="range"
    type="datetimerange"
    clearable
    :default-calendar-start-time="1388851800000"
    :default-calendar-end-time="1441296000000"
  />
  <div
    flex
    justify-center
  >
    <n-select
      v-for="index in 4"
      :key="index"
      v-model:value="seriesValue[index - 1]"
      class="w20"
      :options="seriesType"
    />
  </div>
  <v-chart
    v-if="option"
    w-full
    h-50vh
    :option="option"
    theme="ovilia-green"
    autoresize
  />
</template>
