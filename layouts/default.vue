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
  max-width: 68rem;
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
    padding-left: 1rem;
  }
}
</style>
