<template>
  <div>
    <h1 class="title">Kotti Design System</h1>

    <h2 id="toc_0">Overview</h2>

    <p>Design system helps to unified our design language and provides the document for further product design decision. Kotti
      design system has two main parts: foundation and components. </p>
    <p>The foundation is higher lever and works as guide lines for the whole system, which defines the layout, color, icons, typography
      and writing style. It also creates the styles and characteristics different from other design system.</p>
    <p>Components are more concrete elements. They are pre-defined
      and cannot be changed in most case. These components include: banners, buttons, drawer , etc.</p>

    <h2 id="toc_1">Design Principles</h2>

    <p>Design Principles are a set of considerations that helps teams with decision making. We named our design system based
      on the design principles we use.</p>

    <p>
      <strong>Keen:</strong> The design should encourage users to use and willing to engage the product.</p>

    <p>
      <strong>Okay:</strong> It&#39;s okay not for follow the foundation, but needs a strong reason to support. It&#39;s okay break
      the design principles but only when its the only way to solve the requirement. </p>

    <p>
      <strong>Transparent:</strong> Making the design easy to perceive or detect, user can process smoothly without being aware of
      its presence.</p>

    <p>
      <strong>Timely:</strong> The design need to response and help user finish their task in a timely matter.</p>

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
