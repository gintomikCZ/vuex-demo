<template>
  <form @submit="onSubmit">
    <h2>add new employee</h2>
    <!-- <form-control
      control="firstName"
      label="first name"
      @value-input="onInput"
    />
    <form-control
      control="lastName"
      label="last name"
      @value-input="onInput"
    /> -->
    <template v-if="!loading">
      <form-control
        v-for="control in controls"
        :input-type="formData[control].inputType"
        :do-reset="formData[control].reset"
        :key="control"
        :label="formData[control].label"
        :innitial-value="formData[control].innitialValue"
        :control="control"
        :rules="formData[control].rules"
        @value-input="onInput"
        @valid-changed="onValidChanged"
        @has-been-reset="onHasBeenReset"
      />
    </template>
    <t-button :is-disabled="!formValid" label="submit"/>
    <t-button label="back to list" @button-clicked="$router.push('/employees')"/>
  </form>
</template>

<script>
import FormControl from './FormControl.vue'
import TButton from './TButton.vue'
import db from '../utils/db.js'
export default {
  name: 'EmployeesForm',
  data () {
    return {
      formData: {
        firstname: {
          value: '',
          label: 'first name',
          innitialValue: '',
          inputType: 'text',
          valid: false,
          reset: false,
          rules: [
            {
              validator: 'required',
              message: 'This field is required.'
            },
            {
              validator: 'minLength',
              parameter: 2,
              message: 'Please enter at least 2 characters.'
            }
          ]
        },
        lastname: {
          value: '',
          label: 'last name',
          inputType: 'text',
          innitialValue: '',
          valid: false,
          reset: false,
          rules: [
            {
              validator: 'required',
              message: 'This field is required.'
            },
            {
              validator: 'minLength',
              parameter: 3,
              message: 'Please enter at least 3 characters.'
            }
          ]
        },
        dateofbirth: {
          value: '',
          label: 'date of birth',
          inputType: 'text',
          innitialValue: '',
          valid: false,
          reset: false,
          rules: [
            {
              validator: 'required',
              message: 'This field is required.'
            }
          ]
        },
        position: {
          value: '',
          label: 'position',
          inputType: 'text',
          innitialValue: '',
          valid: false,
          reset: false,
          rules: [
            {
              validator: 'required',
              message: 'This field is required.'
            }
          ]
        },
        salary: {
          value: '',
          label: 'salary',
          inputType: 'number',
          innitialValue: '',
          valid: false,
          reset: false,
          rules: [
            {
              validator: 'required',
              message: 'This field is required.'
            },
            {
              validator: 'isNumber',
              message: 'Please enter a number.'
            },
            {
              validator: 'greaterThen',
              parameter: 299,
              message: 'The minimum salary is 300.'
            }
          ]
        },
      },
      loading: true,
      workingMode: null
    }
  },
  computed: {
    controls () {
      return Object.keys(this.formData)
    },
    employees () {
      return this.$store.state.employees
    },
    formValid () {
      return Object.keys(this.formData).reduce((acc, curr) => {
        return acc && this.formData[curr].valid
      }, true)
    },
    // total () {
    //   return [1, 15, 23, 80].reduce((acc, curr) => {
    //     let square = curr * curr
    //     return acc + square
    //   }, 1)
    // }
  },
  created () {
    if (this.$route.params.id) {
      this.workingMode = 'edit'
      db.get('employees/' + this.$route.params.id).then((record) => {
        Object.keys(record).forEach(key => {
          if (key in this.formData) {
            this.formData[key].innitialValue = record[key]
          }
        })
        this.loading = false
      })
    } else {
      this.workingMode = 'add'
      this.loading = false
    }
  },
  methods: {
    onInput (payload) {
      this.formData[payload.control].value = payload.value
    },
    onValidChanged (payload) {
      this.formData[payload.control].valid = payload.valid
    },
    onSubmit (e) {
      e.preventDefault()
      if (!this.formValid) return
      const data = {
        firstname: this.formData.firstname.value,
        lastname: this.formData.lastname.value,
        dateofbirth: this.formData.dateofbirth.value,
        position: this.formData.position.value,
        salary: this.formData.salary.value
      }
      if (this.workingMode === 'add') {
        this.$store.dispatch('addEmployee', data).then(() => {
          this.$router.push('/employees')
        })
      } else {
        data.id = this.$route.params.id
        this.$store.dispatch('editEmployee', data).then(() => {
          this.$router.push('/employees')
        })
      }
    },
    onHasBeenReset(payload) {
      this.formData[payload.control].reset = false
    }
  },
  components: { FormControl, TButton }
}
</script>

<style lang="stylus">
form
  text-align: left
  width: 80%
  margin: 20px auto

</style>