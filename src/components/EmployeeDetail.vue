<template>
<div>
  <h2>Employee detail</h2>
  <p v-if="loading">loading ...</p>
  <ul v-else>
      <li>{{ 'id: ' + employee.id }}</li>
      <li>{{ 'first name: ' + employee.firstname }}</li>
      <li>{{ 'last name: ' + employee.lastname }}</li>
      <li>{{ 'date of birth: ' + employee.dateofbirth }}</li>
      <li>{{ 'position: ' + employee.position }}</li>
      <li>{{ 'salary: ' + employee.salary }}</li>
  </ul>
  <t-button label="back to list" @button-clicked="$router.push('/employees')"/>
</div>
</template>
<script>
import TButton from './TButton.vue'
export default {
  name: 'EmployeeDetail',
  data () {
    return {
      id: null,
      loading: true
    }
  },
  computed: {
    employee () {
      return this.$store.state.employeeDetail
    }
  },
  created () {
    this.id = this.$route.params.id
    this.$store.dispatch('getEmployee', this.id).then(() => {
      this.loading = false
    })
  },
  components: { TButton }
}

</script>
<style lang="stylus">
ul
  list-style-type: none
  padding: 0
  text-align: left
  width: 70%
  margin: 0 auto;

</style>
