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
    <keep-alive>
      <tradeChart v-if="value" height="100%" width="100%" />
      <orderChart v-if="!value" height="100%" width="100%" />
    </keep-alive>
  </div>
</template>

<script>
import tradeChart from '@/components/Charts/outboundChart-trade'
import orderChart from '@/components/Charts/outboundChart-order'

export default {
  name: 'OutboundChart',
  components: { tradeChart, orderChart },
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

