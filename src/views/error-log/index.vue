<template>
  <div>
    <div slot="title">
      <span style="padding:0 30px;">{{ $t(`errorLog.errorLog`) }}</span>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-delete"
        @click="clearAll"
      >{{ $t(`errorLog.clear`) }}</el-button>
    </div>
    <el-table :data="errorLogs" border empty-text="No Error">
      <el-table-column :label="$t(`errorLog.message`)">
        <template slot-scope="{row}">
          <div>
            <span class="message-title">{{ $t(`errorLog.msg`) }}:</span>
            <el-tag type="danger">{{ row.err.message }}</el-tag>
          </div>
          <br>
          <div>
            <span class="message-title" style="padding-right: 10px;">{{ $t(`errorLog.info`) }}:</span>
            <el-tag type="warning">{{ row.info }}</el-tag>
          </div>
          <br>
          <div>
            <span class="message-title" style="padding-right: 16px;">{{ $t(`errorLog.url`) }}:</span>
            <el-tag type="success">{{ row.url }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t(`errorLog.stack`)">
        <template slot-scope="scope">{{ scope.row.err.stack }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ErrorLog',
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  },
  methods: {
    clearAll() {
      this.$store.dispatch('errorLog/clearErrorLog')
    }
  }
}
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
