<template>
  <div>
    <sidebar class="sidebar"/>
    <nuxt class="container"/>
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


<style>
.container {
  padding: 1rem;
  box-sizing: border-box;
  padding-left: 11rem;
  width: 100%;
}
@media (max-width: 840px) {
  .sidebar {
    display: none;
  }
  .container {
    padding-left: 1rem;
  }
}
</style>
