<template>
  <div>
    <h1 class="title">Kotti Design System</h1>

    <h2 id="toc_0">Overview</h2>

    <p>This design system helps to unify our design language and provides the documentation for further product design decisions. The Kotti
      design system has two main parts: foundation and components. </p>
    <p>The foundation is higher level and works as a guideline for the whole system, which defines the layout, color, icons, typography
      and writing style. It also creates styles and characteristics which are different from other design systems.</p>
    <p>Components are more concrete elements. They are pre-defined
      and cannot be changed in most cases. These components include banners, buttons, drawers and more.</p>

    <h2 id="toc_1">Design Principles</h2>

    <p>Design Principles are a set of considerations that helps teams with decision making. We named our design system based
      on the design principles we use.</p>

    <p>
      <strong>Keen:</strong> The design should encourage users to be willing to engage with the product.</p>

    <p>
      <strong>Okay:</strong> It&#39;s okay to not follow the foundation, but there should be a strong reason. It&#39;s okay to break
      the design principles but only when it's the only way to solve the requirement. </p>

    <p>
      <strong>Transparent:</strong> By making design cues easy to perceive and detect, the user can process information smoothly without being aware of
      their presence.</p>

    <p>
      <strong>Timely:</strong> The design needs to respond quickly and help the user finish their task in a timely matter.</p>

    <p>
      <strong>Intuitive:</strong> The design should be intuitive and easy to understand, and decrease the learning curve.</p>

    <h2 id="toc_2">Update Logs</h2>

    <ul>
      <li>2018-01-04: First document published</li>
    </ul>
  </div>
</template>


<script>
import Sidebar from '~/components/Sidebar.vue'

export default {
  name: 'Index',
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
