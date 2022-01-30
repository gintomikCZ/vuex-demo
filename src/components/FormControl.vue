<template>
  <div class="p-relative">
      <label :for="control">{{ label }}</label>
      <input
        autocomplete="off"
        :type="inputType"
        :id="control"
        @input="onInput"
        :value="value"
        @blur="validate"
        @focus="onFocus"
      />
      <transition name="fade">
        <div v-if="error" class="error-message">{{ errorMessage }}</div>
      </transition>
    </div>
</template>

<script>
import validator from '../utils/validator.js'
export default {
  name: 'FormControl',
  props: {
    control: String,
    label: String,
    innitialValue: {
      validator: (v) => typeof v === 'string' || typeof v === 'number',
    },
    rules: {
      default: []
    },
    inputType: {
      type: String,
      default: 'text'
    },
    doReset: {
      type: Boolean
    }

  },
  data () {
    return {
      value: '',
      error: false,
      errorMessage: '',
      valid: true
    }
  },
  watch: {
    valid(newValue) {
      this.$emit('valid-changed', {
        control: this.control,
        valid: newValue
      })
    },
    doReset(newValue) {
      if (newValue) {
        this.value = ''
        this.$emit('has-been-reset', {
          control: this.control
        })
        this.initialValidation()
      }
    }
  },
  mounted () {
    this.value = this.innitialValue
    this.$emit('value-input', {
      control: this.control,
      value: this.value
    })
    this.initialValidation()
    this.$emit('valid-changed', {
      control: this.control,
      valid: this.valid
    })
  },
  methods: {
    onInput(e) {
      if (this.inputType === 'number') {
        this.value = e.target.value === '' ? '' : parseInt(e.target.value)
      } else {
        this.value = e.target.value
      }
      this.$emit('value-input', {
        control: this.control,
        value: this.value
      })
    },
    validate() {
      this.rules.forEach(rule => {
        if (!this.error) {
          if (!(rule.validator in validator)) throw new Error('validator not known')
          let result = 'parameter' in rule ? validator[rule.validator](this.value, rule.parameter) : validator[rule.validator](this.value)
          if (!result) {
            this.error = true
            this.valid = false
            this.errorMessage = rule.message
          } else {
            this.valid = true
          }
        }
      })
    },
    onFocus() {
      this.error = false
      this.errorMessage = ''
    },
    initialValidation() {
      this.rules.forEach(rule => {
        if (this.valid) {
          if (!(rule.validator in validator)) throw new Error('validator not known')
          let result = 'parameter' in rule ? validator[rule.validator](this.value, rule.parameter) : validator[rule.validator](this.value)
          if (!result) {
            this.valid = false
          }
        }
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
label
  display: block
input
  padding: .25em .5em
  font-size: 1.1rem
  margin-bottom: 20px
.error-message
  color: red
  position: absolute
  top: calc(100% - 20px)
.p-relative
  position: relative


.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease;
}

</style>