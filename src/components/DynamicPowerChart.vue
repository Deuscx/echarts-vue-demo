<script setup lang="ts">
import { powerWindData } from '~/composables/chartData'

const startIndex = ref(500)
const speed = ref(1)
const interval = computed(() => 2000 / speed.value)
const totalLen = computed(() => {
  if (!powerWindData.value || !powerWindData.value.length)
    return 0
  return Math.floor((startIndex.value / powerWindData.value.length) * 100)
})
const source = computed(() => {
  if (powerWindData.value)
    return powerWindData.value
  else return []
})
const option = computed<EChartsOption>(() => {
  if (!powerWindData.value || !powerWindData.value.length)
    return false
  return {
    legend: {},
    animationDuration: 3 * 60 * 1000,
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
    tooltip: {},
    dataset: [
      {
        source: source.value,
        dimensions: source.value.dimensions,
      },
      {
        transform: {
          type: 'ecStat:regression',
          // config: { method: 'polynomial', order: 3 },
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
    ],
  }
})

useIntervalFn(() => {
  startIndex.value += 10
}, interval)

function changeTime(e) {
  startIndex.value = Math.floor(((powerWindData.value.length - 1) / 100) * e)
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
        {{ powerWindData && powerWindData[startIndex] && powerWindData[startIndex].Time }}
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
    h-100vh
    :option="option"
    theme="ovilia-green"
    autoresize
  />
</template>

<style scoped>
</style>
