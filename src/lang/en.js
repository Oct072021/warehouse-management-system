export default {
  // route list(sideBar)
  route: {
    Dashboard: 'Dashboard',
    Permission: 'Permission',
    RolePermission: 'Role Permission',
    DirectivePermission: 'Directive Permission',
    Charts: 'Charts',
    InboundChart: 'Inbound Chart',
    OutboundChart: 'Outbound Chart',
    page401: '401',
    page404: '404',
    ErrorLog: 'Error Log',
    Stock: 'Stock',
    Record: 'Record',
    Inbound: 'inbound',
    Outbound: 'outbound',
    ExternalLink: 'External Link',
    Financial: 'Financial',
    income: 'income',
    expend: 'expend'
  },

  // login page
  login: {
    name: 'Warehouse Management System',
    loginForm: 'Login Form',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Please combine you own business simulation! ! !',
    wechat: 'Wechat',
    qq: 'QQ'
  },

  // Dashboard page
  dashboard: {
    profit: 'Profit',
    orders: 'Orders',
    inbound: 'inbound',
    outbound: 'outbound',
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    itemID: 'ItemID',
    total: 'Total',
    from: 'From',
    todoList: 'Add to Todo List',
    item: 'item',
    left: 'left',
    all: 'all',
    active: 'active',
    completed: 'completed'
  },

  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips:
      'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },

  // errorLog page
  errorLog: {
    errorLog: 'Error Log',
    clear: 'Clear All',
    msg: 'Msg',
    info: 'Info',
    url: 'URL',
    message: 'Message',
    stack: 'Stack'
  },

  components: {
    documentation: 'Documentation',
    tinymceTips:
      'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips:
      'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips:
      'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1:
      'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2:
      'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips:
      'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  example: {
    warning:
      'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips:
      'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips:
      'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  }
}
