<script setup lang="ts">
import { monitorData } from '~/composables/chartData'

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
console.log('🚀 ~ file: ReconstructionChart.vue ~ line 17 ~ source ~ source', source)
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
    yAxis: { name: 'RES', type: 'value' },
    series: [
      {
        type: 'line',
        encode: {
          x: 'Time',
          y: 'REs',
        },
        markLine: {
          lineStyle: {
            color: '#FD665F',
          },
          precision: 4,
          data: [
            {
              yAxis: 0.004,
            },
          ],
        },
      },
    ],
    visualMap: {
      top: 50,
      right: 1,
      dimension: 1,
      precision: 6,
      pieces: [
        {
          lte: 0.003999,
          color: 'green',
          label: '正常',
        },
        {
          gt: 0.004,
          color: 'red',
          label: '故障',
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
