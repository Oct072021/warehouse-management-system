/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/stock',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'stock',
      component: () => import('@/views/table/complex-table'),
      name: 'stock',
      meta: { title: 'stock' }
    }
  ]
}
export default tableRouter
