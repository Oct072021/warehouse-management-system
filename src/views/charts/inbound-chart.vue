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
    <!-- <keep-alive> -->
    <transition name="switch">
      <tradeChart v-if="value" height="100%" width="100%" />
    </transition>
    <transition name="switch">
      <orderChart v-if="!value" height="100%" width="100%" />
    </transition>

    <!-- <tradeChart v-if="value" height="100%" width="100%" />
    <orderChart v-if="!value" height="100%" width="100%" />-->
    <!-- </keep-alive> -->
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

.switch-enter-active {
  transition: all 0.3s ease-out;
}

.switch-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.switch-enter-from,
.switch-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

