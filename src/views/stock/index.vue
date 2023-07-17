<template>
  <div class="app-container">
    <HeaderFilter :config-data="config" @buttonClick="buttonClick" />

    <m-Page
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    >
      <template v-slot:table>
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @sort-change="sortChange"
        >
          <el-table-column
            label="#"
            prop="id"
            sortable="custom"
            align="center"
            width="80"
            :class-name="getSortClass('id')"
          />

          <el-table-column label="ItemID" prop="itemID" width="200px" align="center" />

          <el-table-column label="Title" min-width="200px">
            <template slot-scope="{row}">
              <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
              <el-tag>{{ row.type | typeFilter }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Specs" width="110px" align="center" prop="specs" />

          <el-table-column label="Quantity" width="110px" align="center" prop="quantity" />

          <el-table-column label="Mass" width="80px" align="center" prop="mass" />

          <el-table-column
            label="Actions"
            align="center"
            width="230"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{row, $index}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">Edit</el-button>
              <el-button
                v-if="row.status != 'deleted'"
                size="mini"
                type="danger"
                @click="handleDelete(row, $index)"
              >Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </m-Page>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="110px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Repository" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="ItemID" prop="itemID">{{ temp.itemID }}</el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Specs" prop="specs">
          <el-input v-model="temp.specs">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Quantity" prop="quantity">
          <el-input v-model="temp.quantity" />
        </el-form-item>
        <el-form-item label="Mass" prop="mass">
          <el-input v-model="temp.mass">
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle, remove } from '@/api/outbound'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import { throttle } from '@/utils/common'
import mPage from '@/components/mPage' // page components
import HeaderFilter from '@/components/HeaderFilter'
import { config } from './config'

const calendarTypeOptions = [
  { key: 'GZ', display_name: 'GuangZhou' },
  { key: 'SZ', display_name: 'ShenZhen' },
  { key: 'SH', display_name: 'ShangHai' },
  { key: 'BJ', display_name: 'BeiJing' }
]

export default {
  name: 'Stock',
  components: { mPage, HeaderFilter },
  directives: { waves },
  data() {
    return {
      config,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      showReviewer: false,
      temp: {
        id: undefined,
        itemID: '',
        specs: 0,
        quantity: 0,
        title: '',
        type: '',
        mass: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
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
        specs: [
          { required: true, message: 'specs is required', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: 'quantity is required', trigger: 'blur' }
        ],
        mass: [{ required: true, message: 'mass is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  watch: {
    listQuery: {
      handler: function() {
        this.handleFilter()
      },
      deep: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    buttonClick(data, e) {
      this.listQuery = { ...this.listQuery, ...data }
      if (e === 'search') {
        this.handleFilter()
      } else if (e === 'export') {
        this.handleDownload()
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(res => {
            if (res.code === 20000) {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$notify({
                title: 'Failed',
                message: 'Update Failed',
                type: 'error',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      remove(row).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$notify({
            title: 'Failed',
            message: 'delete Failed',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleDownload: throttle(function() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['itemID', 'title', 'specs', 'quantity', 'mass']
        const filterVal = ['itemID', 'title', 'specs', 'quantity', 'mass']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'stock'
        })
        this.downloadLoading = false
      })
    }, 5 * 1000),
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>