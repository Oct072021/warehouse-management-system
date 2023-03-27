<template>
  <div>
    <el-badge :is-dot="true" style="line-height: 25px;margin-top: -5px;" @click.native="dialogErrVisible = true">
      <el-button style="padding: 8px 10px;" size="small" type="danger">
        <svg-icon icon-class="bug" />
      </el-button>
    </el-badge>

    <el-dialog :visible.sync="dialogErrVisible" width="40%" append-to-body>
      <div slot="title">
        <span style="padding-right: 10px;">Error Report</span>
      </div>
      <el-form :model="errorLog" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Message">
          <el-input v-model="errorLog.err.message" />
        </el-form-item>
        <el-form-item label="Info">
          <el-input v-model="errorLog.info" />
        </el-form-item>
        <el-form-item label="Url">
          <el-input v-model="errorLog.url" />
        </el-form-item>
        <el-form-item label="Stack">
          <el-input v-model="errorLog.err.stack" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogErrVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitERR">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ErrorLog',
  data() {
    return {
      dialogErrVisible: false,
      errorLog: {
        err: {
          message: '',
          stack: ''
        },
        info: '',
        url: ''
      }
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  },
  methods: {
    clearAll() {
      this.$store.dispatch('errorLog/clearErrorLog')
    },
    submitERR() {
      // Vuex dispatches errorLog method
      this.$store.dispatch('errorLog/addErrorLog', this.errorLog)
      this.$notify({
        title: 'Success',
        message: 'Add Successfully',
        type: 'success',
        duration: 2000
      })
      this.dialogErrVisible = false
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
