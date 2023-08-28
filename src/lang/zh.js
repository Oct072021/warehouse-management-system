export default {
  // route list(sideBar)
  route: {
    Dashboard: '仪表盘',
    Permission: '权限控制',
    RolePermission: '角色权限',
    DirectivePermission: '指令权限',
    Charts: '图表',
    InboundChart: '入库图',
    OutboundChart: '出库图',
    page401: '401',
    page404: '404',
    ErrorLog: '错误日志',
    Stock: '库存管理',
    Record: '订单管理',
    Inbound: '入库订单',
    Outbound: '出库订单',
    ExternalLink: '外链',
    Financial: '财务管理',
    income: '收入',
    expend: '支出'
  },

  // login page
  login: {
    name: '仓库后台管理系统',
    loginForm: '登录页面',
    login: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '结合业务进行模拟！！！',
    wechat: '微信登录',
    qq: 'QQ登录'
  },

  // Dashboard page
  dashboard: {
    profit: '收益',
    orders: '订单量',
    inbound: '入库',
    outbound: '出库',
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    itemID: '商品ID',
    total: '总价',
    from: '仓库',
    todoList: '添加备忘',
    item: '项',
    left: '未完成',
    all: '全部',
    active: '待做',
    completed: '已完成'
  },

  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips:
      '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },

  // errorLog page
  errorLog: {
    errorLog: '错误日志',
    clear: '清除全部',
    msg: '报错',
    info: '信息',
    url: '接口地址',
    message: '报错详情',
    stack: '堆栈'
  },

  components: {
    documentation: '文档',
    tinymceTips:
      '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips:
      '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2:
      '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips:
      '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    username: '用户名',
    updatedAt: '更新时间',
    roles: '权限'
  },

  example: {
    warning:
      '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips:
      'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  }
}
