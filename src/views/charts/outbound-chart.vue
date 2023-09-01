<template>
  <div class="chart-container">
    <el-switch
      v-model="value"
      class="switch"
      active-color="#13ce66"
      inactive-color="#1890FF"
      :active-text="$t(`charts.turnover`)"
      :inactive-text="$t(`charts.orders`)"
    />
    <Chart height="100%" width="100%" :type="value" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/outboundChart'

export default {
  name: 'OutboundChart',
  components: { Chart },
  data() {
    return {
      value: true
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);

  .switch {
    position: absolute;
    right: 40px;
    top: 50px;
    z-index: 999;
  }
}
</style>

