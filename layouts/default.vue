<template>
  <div>
    <sidebar class="sidebar" />
    <mobile-nav class="mobile-menu" />
    <nuxt class="container" />
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
  max-width: 54rem;
  padding: 2.2rem;
  height: 100%;
  position: fixed;
  z-index: -1;
  overflow: scroll;
  float: left;
  box-sizing: border-box;
  padding-left: 14.2rem;
  width: 98%;
  background: #ffffff;
  box-shadow: 1px 0 2px #dbdbdb;
}
@media (max-width: 840px) {
  .sidebar {
    display: none;
  }
  .container {
    margin: 4rem 1%;
    padding: 1rem;
  }
  .mobile-menu {
    display: block;
  }
}
</style>
