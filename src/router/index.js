import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/operation_manage',
    name: 'OperateManage',
    component: () => import(/* webpackChunkName: "OperateManage" */ '../views/OperateManageView.vue')
  },
  {
    path: '/warning_manage',
    name: 'WarningManage',
    component: () => import(/* webpackChunkName: "WarningManage" */ '../views/OperateManageView.vue')
  },
  {
    path: '/preplan_manage',
    name: 'PreplanManage',
    component: () => import(/* webpackChunkName: "PreplanManage" */ '../views/OperateManageView.vue')
  },
  {
    path: '/maintenance_manage',
    name: 'MaintenanceManage',
    component: () => import(/* webpackChunkName: "MaintenanceManage" */ '../views/OperateManageView.vue')
  },
  {
    path: '/setting_manage',
    name: 'SettingManage',
    component: () => import(/* webpackChunkName: "SettingManage" */ '../views/OperateManageView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
