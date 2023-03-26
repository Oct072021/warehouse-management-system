<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
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
      switch (nowMonth) {
        case 1 | 2 | 3:
          this.monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          break
        case 9 | 10 | 11 | 12:
          this.monthArr = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          break
        case 4:
          this.monthArr = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
          break
        case 5:
          this.monthArr = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
          break
        case 6:
          this.monthArr = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
          break
        case 7:
          this.monthArr = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
          break
        case 8:
          this.monthArr = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
          break
      }
    },
    setOptions({ inbound, outbound } = {}) {
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
          data: ['inbound', 'outbound']
        },
        series: [{
          name: 'inbound',
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
          name: 'outbound',
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
        }]
      })
    }
  }
}
</script>
