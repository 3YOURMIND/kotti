<template>
  <div>
    <h1>Layout</h1>
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
      <p>The width of Actionbar is also fixed: <code>320px</code> or 
      <code>16rem</code>. The bacground color is <code>#F8F8F8</code>.
      </p>
      <p>The elements suggested on Actionbar are: <b>primay action button</b>, Second action buttton, 
      information doesn't require complex interaction, and <b>sub-menu of Workspace</b>.</p>
    </div>
    <h3>Workspace</h3>
    <div>
      <p>Workspace designed as a space for related tasks, most of interactions should be include in the area.</p>
      <p>The width of Workspace is responsive: <code>90%</code> of the screen width. The background is <code>#FFFFFF</code>,
      with dropshadow: <code>1px 0 1px #DBDBDB</code>.</p>
    </div>
    <h2>Metric</h2>
    <div>
      <p>Youi's metric based on <code>4px</code> and we call it is one unit. The unit can be used as variable in <code>SCSS</code>.
      Table below shows the unit to pixel mapping. </p>
    </div>
    <table class="table table-striped table-hover">
      <tr>
      <th>Unit</th><th>Pixel</th><th>SCSS Variable</th><th>in REM</th>
      </tr>
      <tr>
        <td>1 Unit</td><td>4px</td><td><code>$unit-1</code></td><td><code>.2rem</code></td>
      </tr>
      <tr>
        <td>2 Unit</td><td>8px</td><td><code>$unit-2</code></td><td><code>.4rem</code></td>
      </tr>
      <tr><td>4 Unit</td><td>16px</td><td><code>$unit-4</code></td><td><code>.8rem</code></td></tr>
      <tr>
        
        <td>6 Unit</td><td>24px</td><td><code>$unit-6</code></td><td><code>1.2rem</code></td>
      </tr>
      <tr>
        <td>8 Unit</td><td>32px</td><td><code>$unit-8</code></td><td><code>1.6rem</code></td>
      </tr>
    </table>
    <h3>Padding and Margin</h3>
    <div class="columns">
      <div class="column col-6">
      <p>Following 3 types of margin or padding metric are suggested:</p>
      <ol>
        <li><b>Border Margin:</b> tha gap between element and window, the width is <code>24px</code>.</li>
        <li><b>Block Margin:</b> tha gap between two elements, the width is <code>24px</code>.</li>
        <li><b>Element Padding:</b> the padding of elements.</li>
      </ol>
      </div>
      <div class="column col-6">
       <lightbox :imgUrl="imgPadding"/>
      </div>
    </div>
    <h3>Element Heights</h3>
    <div>
      <p>Most of the elements in Youi has fixed height, which is <code>32px</code>.
      We suggest element's height should match the metric unit.</p>
    </div>
  </div>
</template>
<script>
import Lightbox from '~/components/Lightbox.vue'
import imgOverview from '~/assets/img/layout_overview.png'
import imgPadding from '~/assets/img/layout_metric.png'

export default {
  name: 'layout',
  components: {
    Lightbox
  },
  data () {
    return {
      imgOverview,
      imgPadding
    }
  }
}
</script>


<style lang="scss" scoped>
</style>

