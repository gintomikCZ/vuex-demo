import { createRouter, createWebHistory } from 'vue-router'
import Employees from '../components/Employees.vue'
import EmployeeDetail from '../components/EmployeeDetail.vue'
import EmployeesForm from '../components/EmployeesForm.vue'
import TransitionsDemo from '../components/TransitionsDemo.vue'

const routes = [
  {
    path: '/',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/transitions',
    name: 'TransitionsDemo',
    component: TransitionsDemo
  },
  {
    path: '/employee/:id',
    name: 'Employee',
    component: EmployeeDetail
  },
  {
    path: '/employeesForm',
    name: 'employeesForm',
    component: EmployeesForm
  },
  {
    path: '/employeesForm/:id',
    name: 'employeesFormEdit',
    component: EmployeesForm

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
