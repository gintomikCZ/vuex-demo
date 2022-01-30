<template>
  <tr>
    <slot name="front"></slot>
    <t-table-cell
      v-for="item in rowAr"
      :key="item"
      :content="item"
      :is-header="isHeader"
      :is-clickable="isClickable"
      @cell-clicked="onCellClicked"
    />
    <slot name="rear"></slot>
  </tr>
</template>

<script>
import TTableCell from './TTableCell.vue'

export default {
  name: 'TTableRow',
  props: {
    rowAr: {
      validator: (v) => Array.isArray(v)
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
  methods: {
    onCellClicked () {
      this.$emit('row-clicked')
    }
  },
  components: { TTableCell }
}

</script>