<template>
  <section class="container">
    <div>
      <h1 class="title">YoUI</h1>
      <h2 class="subtitle">Yoda UI Design Library</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  display: flex;
}

</style>
