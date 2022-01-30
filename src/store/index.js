import { createStore } from 'vuex'
import db from '../utils/db.js'

export default createStore({
  state: {
   employees: [],
   employeeDetail: null
  },
  mutations: {
    addEmployees (state, data) {
      state.employees = data
    },
    setEmployeeDetail (state, record) {
      state.employeeDetail = record
    }
  },
  actions: {
    getEmployees (context) {
      return db.get('employees').then((data) => {
        context.commit('addEmployees', data)
      })
    },
    getEmployee (context, id) {
      return db.get('employees/' + id).then((record) => {
        context.commit('setEmployeeDetail', record)
      })
    },
    deleteEmployee (context, id) {
      return db.delete('employees/' + id)
    },
    addEmployee (context, data) {
      return db.post('employees', data)
    },
    editEmployee (context, data) {
      return db.put('employees', data)
    }
  }
})

/*
state: data,
mutations: funkce, které upravují data - synchronní
actions: funkce asynchronní, můžou volat mutations
*/
