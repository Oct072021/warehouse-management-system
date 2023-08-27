/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/stock',
  component: Layout,
  name: 'Stock',
  meta: {
    title: 'Stock',
    icon: 'table',
    roles: ['admin', 'dataOperator']
  },
  children: [
    {
      path: '',
      component: () => import('@/views/stock'),
      name: 'stock',
      meta: { title: 'Stock' }
    }
  ]
}
export default tableRouter
