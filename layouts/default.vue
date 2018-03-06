<template>
  <div class="d-flex">
    <sidebar class="navbar" />
    <mobile-nav class="mobile-menu" />
    <div class="workspace">
      <nuxt class="content" />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import MobileNav from '~/components/MobileNav.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar, MobileNav
  }
}
</script>

<style>
.mobile-menu {
  display: none;
}
.condtainer {
  padding: 2.2rem;
  height: 100%;
  min-height: 100vh;
  z-index: -1;
  overflow-y: auto;
  float: left;
  box-sizing: border-box;
  padding-left: 14.2rem;
  width: 98%;
  background: #ffffff;
  box-shadow: 1px 0 2px #dbdbdb;
}
.content {
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
}
@media (max-width: 840px) {
  .sidebar {
    display: none;
  }
  .container {
    position: relative;
    margin: 2.8rem 0;
    padding: 1rem;
    width: 100%;
    box-shadow: 0;
  }
  .mobile-menu {
    display: block;
  }
}
</style>
