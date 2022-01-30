<template>
  <div class="flex-center">
    <h2>Vue Transitions Demo</h2>
    <t-button
      :label="label"
      @button-clicked="onButtonClicked"
    />
    <transition name="slide">
      <div v-if="showSquare" class="square"></div>
    </transition>

  </div>
</template>
<script>
import TButton from './TButton.vue'
export default {
  name: 'TransitionsDemo',
  data() {
    return {
      label: "show",
      showSquare: false
    }
  },
  methods: {
    onButtonClicked () {
      if (this.showSquare) {
        this.showSquare = false
        this.label = "show"
        return
      }
      this.showSquare = true
      this.label = "hide"
    }
  },
  components: { TButton }
}
</script>
<style lang="stylus">

.flex-center
  display: flex
  flex-direction: column
  align-items: center
.square
  width: 200px
  height: 200px
  background: lightpink
  border: 1px solid #343434
  border-radius: 4px

.slide-enter-from
  opacity: 0
  transform: translateX(-100px)

.slide-enter-to, .slide-leave-from
  opacity: 1
  transform: translateX(0)

.slide-leave-to {
  opacity: 0
  transform: translateX(100px)
}
.slide-enter-active, .slide-leave-active
  transition: all .5s


</style>