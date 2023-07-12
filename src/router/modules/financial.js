/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const financialRouter = {
  path: '/financial',
  component: Layout,
  meta: {
    title: 'Financial',
    icon: 'money',
    roles: ['admin', 'accountant']
  },
  children: [
    {
      path: 'income',
      component: () => import('@/views/financial/income'),
      name: 'income',
      meta: { title: 'income' }

    },
    {
      path: 'expend',
      component: () => import('@/views/financial/expend'),
      name: 'expend',
      meta: { title: 'expend' }
    }
  ]
}

export default financialRouter
