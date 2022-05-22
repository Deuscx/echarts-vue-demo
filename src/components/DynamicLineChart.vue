<script setup lang="ts">
const props = defineProps({
  data: ref<any>(),
})

const startIndex = ref(0)
const source = computed(() => {
  if (props.data)
    return props.data.slice(startIndex.value, startIndex.value + 10)
  else return []
})

const option = computed(() => {
  if (!props.data || !props.data.length)
    return false
  return {
    legend: {},
    title: {
      text: 'Dynamic Data & Time Axis',
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
      dimensions: props.data.dimensions,
    },
    series: [
      //   {
      //     name: "Fake Data",
      //     type: "line",
      //     showSymbol: false,
      //     data,
      //   },
      { type: 'line' },
      { type: 'bar' },
      { type: 'bar' },
    ],
  }
})

useIntervalFn(() => {
  startIndex.value += 1
}, 2000)

console.log('🚀', props.data)
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
