<template>
  <div>
    <el-table :data="list" border fit highlight-current-row style="width: 100%" draggable>
      <el-table-column v-loading="loading" align="center" label="#" width="65" element-loading-text="请给我点时间！"
        prop="id"></el-table-column>

      <el-table-column width="180px" label="itemID" prop="itemID"></el-table-column>

      <el-table-column min-width="120px" label="Title">
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

      <el-table-column class-name="status-col" label="Quantity" prop='quantity' width="150"></el-table-column>

      <el-table-column class-name="status-col" label="Price" prop='price' width="150"></el-table-column>

      <el-table-column class-name="status-col" label="Total" prop='total' width="150"></el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />
  </div>

</template>

<script>
import {
  fetchList,
  remove,
} from '@/api/inbound'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'GZ'
    },
    searchList: {
      type: Object,
      default: {
        page: 1,
        limit: 10,
        sort: '+id',
        title: undefined,
        itemID: undefined
      }
    }
  },
  watch: {
    searchList: {
      handler: function (val) {
        this.listQuery = { ...val, type: this.type }
        this.getList()
      },
      deep: true
    },
  },
  data() {
    return {
      list: null,
      listQuery: {
        ...this.searchList,
        type: this.type,
      },
      loading: false,
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      fetchList(this.listQuery).then(res => {
        this.list = res.data.items
        this.loading = false
        this.total = res.data.total
        this.$emit('create', res.data.allItems) // return all data
      })
    },
  }
}
</script>

