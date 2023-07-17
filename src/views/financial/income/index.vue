<template>
  <div class="tab-container">
    <el-tag>mounted times : {{ createdTimes }}</el-tag>
    <el-alert
      :closable="false"
      style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;"
      title="Tab with keep-alive"
      type="success"
    />

    <HeaderFilter :config-data="config" @buttonClick="buttonClick" />

    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive :include="alive">
          <tab-pane
            v-if="activeName == item.key"
            :ref="item.key"
            :key="item.key"
            :type="item.key"
            :search-list="list"
            @create="showCreatedTimes"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { createArticle } from '@/api/outbound'
import TabPane from './components/TabPane'
import HeaderFilter from '@/components/HeaderFilter'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import { throttle } from '@/utils/common'
import { config } from './config'

const calendarTypeOptions = [
  { key: 'GZ', display_name: 'GuangZhou' },
  { key: 'SZ', display_name: 'ShenZhen' },
  { key: 'SH', display_name: 'ShangHai' },
  { key: 'BJ', display_name: 'BeiJing' }
]

export default {
  name: 'Tab',
  components: { TabPane, HeaderFilter },
  directives: { waves },
  data() {
    return {
      config,
      tabMapOptions: [
        { label: 'GuangZhou', key: 'GZ' },
        { label: 'ShangHai', key: 'SH' },
        { label: 'BeiJing', key: 'BJ' },
        { label: 'ShenZhen', key: 'SZ' }
      ],
      activeName: 'GZ',
      createdTimes: 0,
      downloadLoading: false,
      allData: null,
      list: {
        title: undefined,
        itemID: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        itemID: [
          { required: true, message: 'itemID is required', trigger: 'blur' }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ],
        client: [
          { required: true, message: 'client is required', trigger: 'blur' }
        ],
        specs: [
          { required: true, message: 'specs is required', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: 'quantity is required', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'price is required', trigger: 'blur' }
        ],
        mass: [{ required: true, message: 'mass is required', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        itemID: '',
        client: '',
        specs: 0,
        quantity: 0,
        price: 0,
        total: 0,
        title: '',
        type: '',
        mass: 0
      },
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      }
    }
  },
  computed: {
    alive() {
      return this.$store.getters.alive
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    buttonClick(data, e) {
      this.list = { ...this.list, ...data }
      console.log(this.list)
      if (e === 'search') {
        this.handleFilter()
      } else if (e === 'export') {
        this.handleDownload()
      }
    },
    showCreatedTimes(data) {
      this.createdTimes = this.createdTimes + 1
      this.allData = data
    },
    handleDownload: throttle(function() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          'itemID',
          'title',
          'data',
          'quantity',
          'price',
          'total'
        ]
        const filterVal = [
          'itemID',
          'title',
          'timestamp',
          'quantity',
          'price',
          'total'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `income-list-${this.activeName}`
        })
        this.downloadLoading = false
      })
    }, 5 * 1000),
    formatJson(filterVal) {
      return this.allData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    handleFilter() {
      const temp = this.$refs
      for (const key in temp) {
        if (temp[key].length !== 0) {
          temp[key][0].resetAlive_search() // invoke children component method
          break
        }
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        itemID: '',
        specs: '',
        timestamp: new Date(),
        title: '',
        quantity: 0,
        price: 0,
        total: 0,
        type: ''
      }
    },
    create() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.total = this.temp.price * this.temp.quantity
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          this.temp.timestamp = +new Date(this.temp.timestamp)
          console.log(this.temp)
          createArticle(this.temp).then(res => {
            if (res.code === 20000) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
              // The TabPane component listens for the searchList, passing in a new list to cause the view to refresh
              this.list = {
                page: 1,
                limit: 10,
                title: undefined,
                itemID: undefined,
                sort: '+id'
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
