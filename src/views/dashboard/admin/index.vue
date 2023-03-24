<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group :profit="profit" :orders="orders" @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom:30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom:30px;"
      >
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { outboundTotal } from '@/api/outbound'
import { inboundTotal } from '@/api/inbound'

const lineChartData = {
  profit: {
    inbound: [],
    outbound: []
  },
  orders: {
    inbound: [],
    outbound: []
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.profit,
      profit: null,
      orders: null
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    async getInboundData() {
      const res = await inboundTotal()
      const { orders, total } = res.data
      // Get PanelGroup Data
      this.profit -= eval(total.join('+'))
      this.orders += eval(orders.join('+'))
      // Get Chart Data
      lineChartData.profit.inbound = total.slice(3, 10)
      lineChartData.orders.inbound = orders.slice(3, 10)
    },
    async getOutboundData() {
      const res = await outboundTotal()
      const { orders, total } = res.data
      // Get PanelGroup Data
      this.profit = eval(total.join('+'))
      this.orders = eval(orders.join('+'))
      // Get Chart Data
      lineChartData.profit.outbound = total.slice(3, 10)
      lineChartData.orders.outbound = orders.slice(3, 10)
    },
    getData() {
      // Control the execution order of async tasks
      this.getOutboundData().then(() => {
        this.getInboundData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
