import * as d3 from 'd3'
import type { DSVParsedArray } from 'd3'

export const scandata = ref<DSVParsedArray>({ columns: 0, length: 0 })
export const powerWindData = ref([])
d3.csv('/SCADA_data.csv', (d: any) => {
  // console.log('🚀d', d)
  // 重新命名csv的列名
  const {
    Time,
    'WEC: ava. windspeed': avaWindspeed,
    'WEC: ava. Rotation': avaRotation,
    'WEC: ava. Power': avaPower,
    'CS101 : Rotor temp. 1': rotorTemp,
  } = d
  powerWindData.value.push([avaWindspeed, avaPower])
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

// 监控数据
export const monitorData = ref<DSVParsedArray>({ columns: 0, length: 0 })
d3.csv('/monitor.csv').then((data) => {
  const dimensions = [
    'Time',
    { name: 'ָIndicator', displayName: '指标', type: 'float' },
  ]
  data.dimensions = dimensions
  monitorData.value = data
})

// resData
export const resData = ref<DSVParsedArray>({ columns: 0, length: 0 })
d3.csv('/res.csv').then((data) => {
  const dimensions = [
    'Time',
    { name: 'REs', type: 'float' },
  ]
  data.dimensions = dimensions
  resData.value = data
})
