<template>
  <th
    @click="onClicked"
  >{{ content }}</th>
</template>

<script>
export default {
  name: 'TTableCellTh',
  props: {
    content: {
      // validator: (v) => !isNaN(v) && (typeof v === 'string' || typeof v === 'number'),
      default: ''
    },
    isClickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className () {
      let ar = typeof this.content === 'number' ? ['align-right'] : ['align-left']
      if (this.isClickable) {
        ar.push('cell-clickable')
      }
      return ar
    }
  },
  methods: {
    onClicked () {
      if (this.isClickable) {
        this.$emit('cell-clicked')
      }
    }
  }
}
</script>

<style lang="stylus">

</style>