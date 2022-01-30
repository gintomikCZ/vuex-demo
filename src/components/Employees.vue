<template>
  <div class="about">
    <employees-list/>
    <!-- <button @click="addNewEmployee">add new employee</button> -->
    <t-button label="add new employee" @button-clicked="onButtonClicked"/>
  </div>

</template>

<script>
import EmployeesList from './EmployeesList.vue'
import TButton from './TButton.vue'
export default {
  components: { EmployeesList, TButton },
  methods: {
    onButtonClicked() {
      this.$router.push('employeesForm')
    }
  }
}
</script>

