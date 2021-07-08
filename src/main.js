import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueApexCharts from 'vue3-apexcharts'
import './index.css'

createApp(App).use(VueApexCharts).mount('#app')
