<template>
  <div>
    <sidebar class="sidebar"/>
    <mobile-nav class="mobile-menu" />
    <nuxt class="container"/>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import MobileNav from '~/components/MobileNav.vue'
require('@3yourmind/yoco/docs/dist/yoco-icon.css')

export default {
  components: {
    Sidebar, MobileNav
  }
}
</script>


<style>
.mobile-menu {
  display: none;
}
.container {
  max-width: 56rem;
  padding: 1rem;
  float: left;
  box-sizing: border-box;
  padding-left: 14rem;
  width: 98%;
}
@media (max-width: 840px) {
  .sidebar {
    display: none;
  }
  .container {
    margin-top: 4rem;
    padding-left: 1rem;
  }
  .mobile-menu {
    display: block;
  }
}
</style>
