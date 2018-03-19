<template>
  <div class="sidebar">
    <div class="navbar-wrapper">
      <div class="navbar-header">
        <div class="logo-nav mt-16">
          <nuxt-link to="/">
            <img
              src="~/assets/img/nav_logo.svg"
              alt="vector graphic as logo for the navigation bar"
            />
          </nuxt-link>
        </div>
    </div>
    <div class="navbar-body">
      <MenuList class="sidemenu" />
    </div>
    <div class="navbar-footer">
      <a href="https://github.com/3YOURMIND/kotti">
      <button class="primary">Github</button>
      </a>
    </div>
    </div>
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
.navbar-footer {
  color: rgba(255, 255, 255, .46);
  text-align: center;
}

</style>
