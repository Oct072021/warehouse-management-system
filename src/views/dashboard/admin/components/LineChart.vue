<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import i18n from '@/lang'
import { mapGetters } from 'vuex'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      nowDate: new Date(),
      monthArr: []
    }
  },
  computed: {
    ...mapGetters(['language'])
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    language: {
      handler(val) {
        this.initChart()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.getMonthArr()
      this.setOptions(this.chartData)
    },

    getMonthArr() {
      const nowMonth = this.nowDate.getMonth() + 1
      const start =
        nowMonth > 3 && nowMonth < 9 ? nowMonth : nowMonth <= 3 ? 3 : 9
      this.monthArr = i18n.t(`dashboard.month`).slice(start - 3, start + 3)
    },

    setOptions({ inbound, outbound } = {}) {
      const i18nInbound = i18n.t(`dashboard.inbound`)
      const i18nOutbound = i18n.t(`dashboard.outbound`)

      this.chart.setOption({
        xAxis: {
          data: this.monthArr,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: [i18nInbound, i18nOutbound]
        },
        series: [
          {
            name: i18nInbound,
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: inbound,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: i18nOutbound,
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: outbound,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
