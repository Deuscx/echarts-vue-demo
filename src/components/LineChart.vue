<script setup lang="ts">
import type { EChartsOption } from 'echarts/types/dist/shared'
import dayjs from 'dayjs'
const props = defineProps({
  data: ref<any>(),
})

const range = ref([1388851800000, 1441296000000])
const option = computed<EChartsOption>(() => {
  if (!props.data || !props.data.length)
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
      source: props.data
        .filter(
          d =>
            +new Date(d.Time) > range.value[0]
            && +new Date(d.Time) < range.value[1],
        ),
      dimensions: props.data.dimensions,
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'line' }],
  }
})
</script>

<template>
  <n-date-picker
    v-model:value="range"
    type="datetimerange"
    clearable
    :default-calendar-start-time="1388851800000"
    :default-calendar-end-time="1441296000000"
  />
  <v-chart
    v-if="option"
    w-full
    h-50vh
    :option="option"
    theme="ovilia-green"
    autoresize
  />
</template>
