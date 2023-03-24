/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart',
    roles: ['admin']
  },
  children: [
    {
      path: 'inbound-chart',
      component: () => import('@/views/charts/inbound-chart'),
      name: 'inboundChart',
      meta: { title: 'inbound Chart', noCache: true }
    },
    {
      path: 'outbound-chart',
      component: () => import('@/views/charts/outbound-chart'),
      name: 'outboundChart',
      meta: { title: 'outbound Chart', noCache: true }
    }
  ]
}

export default chartsRouter
