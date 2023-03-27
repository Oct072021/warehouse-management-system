<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">admin</el-tag> can see this
        </span>
        <el-tag v-permission="['admin']" class="permission-sourceCode" type="info">
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['dataOperator']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">dataOperator</el-tag> can see this
        </span>
        <el-tag v-permission="['dataOperator']" class="permission-sourceCode" type="info">
          v-permission="['dataOperator']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['accountant']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">accountant</el-tag> can see this
        </span>
        <el-tag v-permission="['accountant']" class="permission-sourceCode" type="info">
          v-permission="['accountant']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin', 'dataOperator']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag> and
          <el-tag class="permission-tag" size="small">dataOperator</el-tag> can see this
        </span>
        <el-tag v-permission="['admin', 'dataOperator']" class="permission-sourceCode" type="info">
          v-permission="['admin','dataOperator']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin', 'accountant']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag> and
          <el-tag class="permission-tag" size="small">accountant</el-tag> can see this
        </span>
        <el-tag v-permission="['admin', 'accountant']" class="permission-sourceCode" type="info">
          v-permission="['admin','accountant']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin', 'dataOperator', 'accountant']" class="permission-alert">
          All roles can see this
        </span>
        <el-tag v-permission="['admin', 'dataOperator', 'accountant']" class="permission-sourceCode" type="info">
          v-permission="['admin','dataOperator','accountant']"
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .permission-alert {
    width: 340px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }

  ::v-deep .permission-sourceCode {
    margin-left: 15px;
  }

  ::v-deep .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

