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

const startIndex = ref(0)
const speed = ref(1)
const interval = computed(() => 1000 / speed.value)
const totalLen = computed(() => {
  if (!monitorData.value || !monitorData.value.length)
    return 0
  return Math.floor((startIndex.value / monitorData.value.length) * 100)
})
const source = computed(() => {
  if (monitorData.value)
    return monitorData.value.slice(startIndex.value, startIndex.value + 50)
  else return []
})
const option = computed<EChartsOption>(() => {
  if (!monitorData.value || !monitorData.value.length)
    return false
  return {
    legend: {},
    tooltip: {},
    dataset: {
      source: source.value,
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

useIntervalFn(() => {
  startIndex.value += 1
}, interval)

function changeTime(e) {
  startIndex.value = Math.floor(((monitorData.value.length - 1) / 100) * e)
}
</script>

<template>
  <section>
    <div
      flex
      items-center
      mb-1rem
    >
      <label w5vw>日期</label>
      <n-slider
        :step="1"
        @update:value="changeTime"
      />
      <div w10vw>
        {{ monitorData && monitorData[startIndex] && monitorData[startIndex].Time }}
      </div>
    </div>
    <div
      flex
      items-center
      mb-1rem
    >
      <label w5vw>速度</label>
      <n-input-number
        v-model:value="speed"
        min="1"
        max="4"
        clearable
      />
    </div>
  </section>
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
