<template>

<!-- <button :class="classArray" :disabled="isDisabled">{{ label }}</button> -->

<!-- <button :class="classObj" :disabled="isDisabled">{{ label }}</button> -->

<button
  :style="styleObj"
  :disabled="isDisabled"
  @click="onClick"
>{{ label }}</button>
</template>

<script>

export default {
  name: 'TButton',
  props: {
    label: {
      // validator: (v) => !isNaN(v) && (typeof v === 'string' || typeof v === 'number'),
      default: 'tlačítko'
    },
    size: {
      validator: (v) => ['small', 'medium', 'large'].indexOf(v) >=0,
      default: 'medium'
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className () {
      if (this.size === 'small') return 'font-14'
      return this.size === 'medium' ? 'font-18' : 'font-22'
    },
    classArray () {
      let ar = []
      if (this.size === 'small') {
        ar.push('font-14')
      } else {
        ar.push(this.size === 'medium' ? 'font-18' : 'font-22')
      }
      if (this.isDisabled) {
        ar.push('btn-disabled')
      }
      return ar
    },
    classObj () {
      let obj = {
        'font-14': this.size === 'small',
        'font-18': this.size === 'medium',
        'font-22': this.size === 'large',
        'btn-disabled': this.isDisabled
      }
      return obj
    },
    styleObj () {
      let fontSize
      if (this.size === 'small') {
        fontSize = 14
      } else {
        fontSize = this.size === 'medium' ? 18 : 22
      }

      let obj = {
        fontSize: fontSize + 'px'
      }
      if (this.isDisabled) {
        obj.cursor = 'not-allowed'
      }
      return obj
    }
  },
  methods: {
    onClick () {
      this.$emit('button-clicked')
    }
  }

}

</script>

<style lang="stylus" scoped>

button
  padding: .5em .8em
  font-weight: bold
  background: blue
  color: white
  border: 2px solid blue
  border-radius: 4px
  margin: 5px
  &:not(.btn-disabled)
    cursor: pointer

.font-14
  font-size: 14px

.font-18
  font-size: 18px

.font-22
  font-size: 22px

.btn-disabled
  cursor: not-allowed

</style>