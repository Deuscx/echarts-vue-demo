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
  <div>
    <n-carousel
      show-arrow
      autoplay
      dot-placement="left"
      class="  flex
    justify-center"
    >
      <img
        v-for="index in 3"
        :key="index"
        class="w100% h80vh img"
        :src="`${index}.jpg`"
      >
    </n-carousel>
  </div>
</template>

<style scoped>
img {
  background-size: cover;
}
</style>
