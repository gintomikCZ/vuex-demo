<template>
<div class="container">
  <h1>Javascript Frameworks - day #7</h1>
  <!-- <t-button label="malé" size="small"/>
  <t-button label="střední" size="medium"/>
  <t-button label="velké" size="large"/>
  <t-button label="disabled" size="large" is-disabled/> -->

  <template v-if="displayButtons">
    <t-button
      v-for="(button, index) in buttons"
      :key="'buttonek' + index"
      :size="button"
      :label="index + 1"
      class="text-underlined" />
  </template>

  <div v-else>no buttons</div>

  <div v-if="divToDisplay === 'pink'" class="my-div pink-div">pink</div>
  <div v-else-if="divToDisplay === 'blue'" class="my-div blue-div">blue</div>
  <div v-else-if="divToDisplay === 'green'" class="my-div green-div">green</div>
  <div v-else class="my-div">no color</div>

</div>
<div class="container">
  <router-link to="/employees">employees</router-link>
</div>
<div class="container">
  <!-- <t-button
    label="employees"
    @button-clicked="onEmployeesClicked"/> -->
    <t-button
      :label="'employees'"
      @button-clicked="$router.push('employees')"/>
</div>
</template>
<script>

import TButton from './TButton.vue'
export default {
  name: 'IndexPage',
  data () {
    return {
      buttons: ['small', 'medium', 'large'],
      divToDisplay: 'pink',
      displayButtons: true
    }
  },
  methods: {
    onEmployeesClicked () {
      // přesměrovat na routu "employees"
      this.$router.push('/employees')
    }
  },
  components: { TButton }
}
</script>

<style lang="stylus">
.container
  width: 80%
  margin: 20px auto

h1
  text-align: center

.pink-div
  background: lightpink
.blue-div
  background: lightblue
.green-div
  background: lightgreen
.my-div
  width: 100px
  height: 100px
  display: flex
  justify-content: center
  align-items: center
  margin: 10px
  display: inline-flex
.text-underlined
  text-decoration: underline

a
  font-weight: bold
  text-decoration: none
</style>
