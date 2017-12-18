<template>
  <div>
    <h2>Components</h2>
    <div class="columns">
      <div class="column col-6 col-md-12">
        <p>Our layout has 3 main components:
          <b>Navbar</b>,
          <b>Actionbar</b>, and
          <b>Workspace</b>. The
          <b>Actionbar</b> can be omited if necessary. However,
          <b>Navbar</b> and
          <b>Workspace</b> are required for every page.</p>
      </div>
      <div class="column col-6 col-md-12">
        <lightbox :imgUrl="imgOverview" />
      </div>
    </div>
    <h3>Navbar</h3>
    <div>
      <p>The Navbar is the top-level navgation for user. The width is fixed:
        <code>280px</code> or
        <code>14rem</code>. The background is
        <code>Primay-600 (#2659AB)</code>.</p>
    </div>
    <h3>Actionbar</h3>
    <div>
      <p>Actionbar always located between Navbar and Workspace, which can be omited if necessary. Actionbar is consider as attachment
        to Workspace. It represent addtional and important information of Workspace.
      </p>
      <p>The width of Actionbar is also fixed:
        <code>320px</code> or
        <code>16rem</code>. The bacground color is
        <code>#F8F8F8</code>.
      </p>
      <p>The elements suggested on Actionbar are:
        <b>primay action button</b>, Second action buttton, information doesn't require complex interaction, and
        <b>sub-menu of Workspace</b>.</p>
    </div>
    <h3>Workspace</h3>
    <div>
      <p>Workspace designed as a space for related tasks, most of interactions should be inside this area.</p>
      <p>The width of Workspace is responsive:
        <code>90%</code> of the screen width. The background is
        <code>#FFFFFF</code>, with dropshadow:
        <code>1px 0 1px #DBDBDB</code>.</p>
    </div>
  </div>
</template>

<script>
import Lightbox from '~/components/Lightbox.vue'
import imgOverview from '~/assets/img/layout_overview.png'

export default {
  name: 'layout-components',
  components: {
    Lightbox
  },
  data () {
    return {
      imgOverview
    }
  }
}
</script>
