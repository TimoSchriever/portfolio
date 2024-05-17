<template>
  <transition name="slide" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style>