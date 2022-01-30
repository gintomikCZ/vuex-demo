<template>
  <h2>List of employees</h2>
  <p v-if="loading">loading ...</p>
  <template v-else>
    <table v-if="employeesArray.length">
      <thead>
        <!-- <tr>
          <t-table-cell is-header content="first name"/>
          <t-table-cell is-header content="last name"/>
          <t-table-cell is-header content="date of birth"/>
          <t-table-cell is-header content="position"/>
          <t-table-cell is-header content="salary"/>
        </tr> -->
        <t-table-row
          :row-ar="headerNames"
          is-header
        >
          <!-- <template v-slot:front>
            <th></th>
          </template> -->
          <template v-slot:rear>
            <th colspan="2"></th>
          </template>
        </t-table-row>
      </thead>
      <tbody>
        <!-- <tr v-for="employee in employeesArray" :key="employee.id">
          <t-table-cell :content=employee.firstName />
          <t-table-cell :content=employee.lastName />
          <t-table-cell :content=employee.dateOfBirth />
          <t-table-cell :content=employee.position />
          <t-table-cell :content=employee.salary />
        </tr> -->
        <t-table-row
          v-for="(employee, index) in employeesArray"
          :key="index"
          :row-ar="employee"
          is-clickable
          @row-clicked="onRowClicked(employee[0])"
        >
        <!-- <template v-slot:front>
          <td>*</td>
        </template> -->
          <template v-slot:rear>
            <!-- <td>delete</td>
            <td>edit</td> -->
            <t-table-cell
              is-clickable
              content="delete"
              @cell-clicked="onDeleteClicked(employee[0])"/>
            <t-table-cell
              is-clickable
              content="edit"
              @cell-clicked="onEditClicked(employee[0])"/>
          </template>
        </t-table-row>
      </tbody>
    </table>
    <div v-else>no employees</div>
  </template>
</template>

<script>

import TTableRow from './TTableRow.vue'
import TTableCell from './TTableCell.vue'

export default {
  name: 'EmployeesList',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    employees () {
      return this.$store.state.employees
    },
    employeesArray () {
      return this.employees.map((obj) => {
        return Object.values(obj)
      })
    },
    headerNames () {
      return Object.keys(this.employees[0])
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    onRowClicked (par) {
      this.$router.push('/employee/' + par)
    },
    onDeleteClicked (id) {
      this.loading = true;
      this.$store.dispatch('deleteEmployee', id).then(() => {
        this.loadData()
      })
    },
    onEditClicked (id) {
      this.$router.push('/employeesForm/' + id)
    },
    loadData () {
      this.$store.dispatch('getEmployees').then(() => {
        this.loading = false
      })
    }
  },
  components: { TTableRow, TTableCell }
}

</script>

<style lang="stylus">

table
  margin: 20px auto

</style>