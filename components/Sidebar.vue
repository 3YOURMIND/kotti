<template>
  <div class="sidebar">
    <div class="logo-nav">
      <nuxt-link to="/">
        <img
          src="~/assets/img/nav_logo.svg"
          alt="vector graphic as logo for the navigation bar"
        />
      </nuxt-link>
    </div>
    <MenuList class="sidemenu" />
  </div>
</template>

<script>
import MenuList from '~/components/Menu.vue'

export default {
  name: 'Sidebar',
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

// .sidebar {
//   background: #2659ab;
//   height: 100vh;
//   width: 12rem;
//   padding: 1.2rem;
//   overflow-y: auto;
//   float: left;
//   color: #f8f8f8;
//   position: fixed;
// }
</style>
