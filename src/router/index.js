import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home.vue'
// import login from '@/pages/login.vue'
// const Home = () => import('@/pages/Home.vue')
// 任务台
const Work = () => import('@/pages/MyWork/myWork.vue')
// 流程中心
const ProcessCenter = () => import('@/pages/ProcessCenter/processCenter.vue')
const applyForm = () => import('@/pages/ProcessCenter/applyForm/index.vue')
// 工作流管理
const Template = () => import('@/pages/WorkFlow/Template/template.vue')
const PlateForm = () => import('@/pages/WorkFlow/Template/plateform.vue')
const Design = () => import('@/pages/WorkFlow/Template/design.vue')
const ChartFlow = () => import('@/pages/WorkFlow/Template/chartFlow.vue')
// 节点
const WorkNode = () => import ('@/pages/WorkFlow/Worknode/worknode.vue')
// 表单
const Workform = () => import('@/pages/WorkFlow/Workform/workform.vue')
const Controlform = () => import('@/pages/WorkFlow/Workform/controlform.vue')
// 角色
const RolePower = () => import('@/pages/RolePower/rolepower.vue')
// 组织结构
const UserManage = () => import('@/pages/UserManage/usermanage.vue')

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: login
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/work',
        name: 'Work',
        component: Work
      },
      {
        path: '/processcenter',
        name: 'ProcessCenter',
        component: ProcessCenter
      },{
        path: '/applyForm',
        name: 'applyForm',
        component: applyForm
      },
      {
        path: '/template',
        name: 'Template',
        component: Template
      },
      {
        path: '/plateform',
        name: 'PlateForm',
        component: PlateForm
      },
      {
        path: '/design',
        name: 'Design',
        component: Design
      },
      {
        path: '/chartflow',
        name: 'ChartFlow',
        component: ChartFlow
      },
      {
        path: '/workform',
        name: 'Workform',
        component: Workform
      },
      {
        path: '/controlform',
        name: 'Controlform',
        component: Controlform
      },
      {
        path: '/worknode',
        name: 'WorkNode',
        component: WorkNode
      },
      {
        path: '/rolepower',
        name: 'RolePower',
        component: RolePower
      },
      {
        path: '/usermanage',
        name: 'UserManage',
        component: UserManage
      }
    ]
  }

]

const router = new VueRouter({
  routes
})
// // 判断路由的权限 跳转404
// router.beforeEach((to, from, next) => {
//   // 获取store里面的token

// })

export default router
