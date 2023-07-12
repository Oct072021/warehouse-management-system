<template>
  <div>
    <m-Page
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    >
      <template v-slot:table>
        <el-table :data="list" border fit highlight-current-row style="width: 100%" draggable>
          <el-table-column
            v-loading="loading"
            align="center"
            label="#"
            width="50"
            element-loading-text="请给我点时间！"
            prop="id"
          />

          <el-table-column width="180px" label="itemID" prop="itemID" />

          <el-table-column min-width="180px" label="Title">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
              <el-tag>{{ row.type }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column width="120px" align="center" label="Date">
            <template slot-scope="scope">
              <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>

          <el-table-column width="90" align="center" label="Client" prop="client" />

          <el-table-column align="center" label="Specs" width="95" prop="specs" />

          <el-table-column class-name="status-col" label="Quantity" prop="quantity" width="80" />

          <el-table-column class-name="status-col" label="Price" prop="price" width="60" />

          <el-table-column class-name="status-col" label="Total" prop="total" width="90" />

          <el-table-column class-name="status-col" label="Mass" prop="mass" width="90" />

          <el-table-column
            label="Actions"
            align="center"
            width="170"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{row, $index}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">Edit</el-button>
              <el-button
                v-if="row.status != 'deleted'"
                size="mini"
                type="danger"
                @click="handleRemove(row, $index)"
              >Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </m-Page>
  </div>
</template>

<script>
import { fetchList, remove } from '@/api/outbound'
import { debounce } from '@/utils/common'
import mPage from '@/components/mPage'

export default {
  components: { mPage },
  props: {
    type: {
      type: String,
      default: 'GZ'
    },
    searchList: {
      type: Object,
      default: () => {
        return {
          sort: '+id',
          title: undefined,
          itemID: undefined
        }
      }
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id',
        title: undefined,
        itemID: undefined,
        type: this.type
      },
      loading: false,
      total: 0
    }
  },
  watch: {
    searchList: {
      handler: debounce(function(val) {
        this.resetAlive_search()
      }, 2 * 1000),
      deep: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listQuery = { ...this.listQuery, ...this.searchList }
      this.loading = true
      fetchList(this.listQuery).then(res => {
        this.list = res.data.items
        this.loading = false
        this.total = res.data.total
        this.$emit('create', res.data.allItems) // Return all data
      })
    },
    handleUpdate(row) {
      this.$emit('handleUpdate', row)
    },
    handleRemove(row, index) {
      remove(row).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    resetAlive_search() {
      // To clear keep-alive cache,ensure the operation of the search function
      this.$store.dispatch('alive/removeAlive') // remove keep-alive cache
      this.getList()
      // reset keep-alive cache
      setTimeout(() => {
        this.$store.dispatch('alive/setAlive')
      }, 0)
    }
  }
}
</script>

