<script setup lang="ts">
import { scandata } from '~/composables/chartData'

const startIndex = ref(0)
const speed = ref(1)
const interval = computed(() => 2000 / speed.value)
const totalLen = computed(() => {
  if (!scandata.value || !scandata.value.length)
    return 0
  return Math.floor((startIndex.value / scandata.value.length) * 100)
})
const source = computed(() => {
  if (scandata.value)
    return scandata.value.slice(startIndex.value, startIndex.value + 10)
  else return []
})
const seriesValue = ref(['line', 'line', 'line', 'line'])
const series = computed(() => seriesValue.value.map(type => ({ type })))
const option = computed(() => {
  if (!scandata.value || !scandata.value.length)
    return false
  return {
    legend: {},
    title: {
      text: '风机特征',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: true,
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    // yAxis: {
    //   type: 'value',
    //   boundaryGap: [0, '100%'],
    //   splitLine: {
    //     show: false,
    //   },
    // },
    dataset: {
      source: source.value,
      dimensions: scandata.value.dimensions,
    },
    series: series.value,
  }
})

useIntervalFn(() => {
  startIndex.value += 1
}, interval)

function changeTime(e) {
  startIndex.value = Math.floor(((scandata.value.length - 1) / 100) * e)
}

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
        {{ scandata && scandata[startIndex] && scandata[startIndex].Time }}
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

<style scoped>
</style>
