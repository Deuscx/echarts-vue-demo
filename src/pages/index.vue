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
    'WEC: ava. Rotation': avaRotation,
    'WEC: ava. Power': avaPower,
    'CS101 : Rotor temp. 1': rotorTemp,
  } = d
  return {
    avaWindspeed,
    avaRotation,
    avaPower,
    rotorTemp,
    Time,
  }
}).then((data) => {
  const dimensions = [
    'Time',
    { name: 'avaWindspeed', displayName: '平均风速' },
    { name: 'avaRotation', displayName: '平均转速' },
    { name: 'avaPower', displayName: '平均功率' },
    { name: 'rotorTemp', displayName: '转子温度' },
  ]
  data.dimensions = dimensions
  scandata.value = data
})
</script>

<template>
  <!-- <n-collapse :default-expanded-names="['1', '2', '3', '4']">
    <n-collapse-item
      title="风机特征"
      name="1"
    >
      <line-chart
        v-if="scandata"
        :data="scandata"
      />
    </n-collapse-item>
    <n-collapse-item
      title="风机特征"
      name="2"
    >
      <dynamic-line-chart
        v-if="scandata"
        :data="scandata"
      />
    </n-collapse-item>
    <n-collapse-item
      title="监控图"
      name="3"
    >
      <monitor-chart />
    </n-collapse-item>
    <n-collapse-item
      title="动态指标图"
      name="4"
    >
      <dynamic-monitor-chart />
    </n-collapse-item>
  </n-collapse> -->
</template>
