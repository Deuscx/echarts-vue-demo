<script setup lang="ts">
import * as d3 from 'd3'
import type { DSVParsedArray } from 'd3'

const name = $ref('')

const router = useRouter()

const scandata = ref<DSVParsedArray>({ columns: 0, length: 0 })
d3.csv('./SCADA_data.csv', (d: any) => {
  // console.log('🚀d', d)
  // 重新命名csv的列名
  const {
    Time,
    'WEC: ava. windspeed': avaWindspeed,
    'WEC : max. windspeed': maxWindspeed,
    'WEC : min. windspeed': minWindspeed,
  } = d
  return {
    avaWindspeed,
    maxWindspeed,
    minWindspeed,
    Time,
  }
}).then((data) => {
  const dimensions = [
    'Time',
    { name: 'avaWindspeed', displayName: '平均风速' },
    { name: 'maxWindspeed', displayName: '最大风速' },
    { name: 'minWindspeed', displayName: '最小风速' },
  ]
  data.dimensions = dimensions
  scandata.value = data
  console.log(scandata)
})
</script>

<template>
  <n-collapse :default-expanded-names="['1', '2', '3']">
    <n-collapse-item
      title="折线图"
      name="1"
    >
      <line-chart
        v-if="scandata"
        :data="scandata"
      />
    </n-collapse-item>
    <n-collapse-item
      title="动态折线图"
      name="2"
    >
      <dynamic-line-chart
        v-if="scandata"
        :data="scandata"
      />
    </n-collapse-item>
    <n-collapse-item
      title="黄金"
      name="3"
    >
      <div>真棒</div>
    </n-collapse-item>
  </n-collapse>
</template>
