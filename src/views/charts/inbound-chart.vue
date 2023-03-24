<template>
  <div class="chart-container">
    <el-switch
      v-model="value"
      class="switch"
      active-color="#13ce66"
      inactive-color="#1890FF"
      active-text="turnover"
      inactive-text="order quantity"
    />
    <tradeChart v-if="value" height="100%" width="100%" />
    <orderChart v-if="!value" height="100%" width="100%" />
  </div>
</template>

<script>
import tradeChart from '@/components/Charts/inboundChart-trade'
import orderChart from '@/components/Charts/inboundChart-order'

export default {
  name: 'InboundChart',
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

