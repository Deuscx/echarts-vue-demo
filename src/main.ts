import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import * as echarts from 'echarts'
import { transform } from 'echarts-stat'
// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer,
} from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  ScatterChart,
} from 'echarts/charts'
import {
  DataZoomComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
} from 'echarts/components'
import App from './App.vue'

echarts.registerTransform(transform.regression)
use([
  CanvasRenderer,
  BarChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LineChart,
  LegendComponent,
  DatasetComponent,
  DataZoomComponent,
  TransformComponent,
  ToolboxComponent,
  TitleComponent,
  VisualMapComponent,
  VisualMapPiecewiseComponent,
  VisualMapContinuousComponent,
  MarkLineComponent,

])

const app = createApp(App)

app.component('VChart', ECharts)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
