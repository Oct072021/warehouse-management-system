<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="ItemID" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.itemID | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Total" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.total | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="From" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag>
          {{ row.type }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchList } from '@/api/inbound'

export default {
  filters: {
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.items.slice(3, 11)
      })
    }
  }
}
</script>
