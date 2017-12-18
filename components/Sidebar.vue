<template>
  <div class="sidebar">
    <div class="logo-nav">
      <nuxt-link to="/"><img src="~/assets/img/nav_logo.svg"></nuxt-link>
    </div>
    <menu-list class="sidemenu"/>
  </div>
</template>
<script>
import MenuList from '~/components/Menu.vue'

export default {
  name: 'sidebar',
  components: {
    MenuList
  }
}
</script>

<style lang="scss" scoped>
.logo-nav {
  margin: 1.2rem 0;
  text-align: left;
  height: 2.4rem;
}
.sidebar {
  background: #2659AB;
  height: 100vh;
  width: 12rem;
  padding: 1.2rem;
  overflow-y: auto;
  float: left;
  color:#F8F8F8;
  position: fixed;
}
</style>
