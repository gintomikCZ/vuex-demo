<template>

  <component
    :is="componentName"
    :content="content"
    :is-clickable="isClickable"
    @cell-clicked="onCellClicked"></component>
  <!-- <td
    v-if="!isHeader"
    :class="className"
    @click="onClicked"
  >{{ content }}</td>
  <th
    v-else
    @click="onClicked"
  >{{ content }}</th> -->
</template>

<script>
import TTableCellTd from './TTableCellTd.vue'
import TTableCellTh from './TTableCellTh.vue'
export default {
  name: 'TTableCell',
  props: {
    content: {
      // validator: (v) => !isNaN(v) && (typeof v === 'string' || typeof v === 'number'),
      default: ''
    },
    isHeader: {
      type: Boolean,
      default: false
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
    },
    componentName () {
      return this.isHeader ? 'TTableCellTh' : 'TTableCellTd'
    }
  },
  methods: {
    onCellClicked () {
      // this.$emit('cell-clicked')
    }
  },
  components: { TTableCellTd, TTableCellTh}
}
</script>

<style lang="stylus">
th
  background: lightgreen

td, th
  padding: .25em

.align-left
  text-align: left

.align-right
  text-align: right

.cell-clickable
  cursor: pointer
  transition: all .3s ease
.cell-clickable:hover
  background: #efefef
  color: black
</style>