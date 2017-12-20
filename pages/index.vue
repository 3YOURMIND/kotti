<template>
    <div>
      <h1 class="title">Kotti Design System</h1>
      <h2 class="subtitle">Design Principles</h2>
      <h3>Keen</h3>
      <h3>Observalbe</h3>
      <h3>Trasparent</h3>
      <h3>Timely</h3>
      <div><p>The design need to response and help user finish their task in a timely matter.</p></div>
      <h3>Iconic</h3>
    </div>
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
