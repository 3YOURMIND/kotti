<template lang="md">

# Layout

<layout-components/>

<div class="element-example">
  <div class="d-flex layout-example">
    <div class="navbar">
      <div class="navbar-wrapper">
        <div class="navbar-header">Nav Header</div>
        <div class="navbar-body">Nav Body</div>
        <div class="navbar-footer">Nav footer</div>
      </div>
    </div>
    <div class="actionbar">
      <div class="actionbar-wrapper">
      <div class="actionbar-header">Actionbar Header</div>
        <div class="actionbar-body">Actionbar Body</div>
        <div class="actionbar-footer">Actionbar footer</div>
        </div>
    </div>
    <div class="workspace">
      Workspace
    </div>
  </div>
</div>

```html
<div class="d-flex layout-example">
  <div class="navbar">
    <div class="navbar-wrapper">
      <div class="navbar-header">Nav Header</div>
      <div class="navbar-body">Nav Body</div>
      <div class="navbar-footer">Nav footer</div>
    </div>
  </div>
  <div class="actionbar">
    <div class="actionbar-wrapper">
    <div class="actionbar-header">Actionbar Header</div>
      <div class="actionbar-body">Actionbar Body</div>
      <div class="actionbar-footer">Actionbar footer</div>
      </div>
  </div>
  <div class="workspace">
    Workspace
  </div>
</div>
```

<layout-metric />

</template>

<script>
import LayoutComponents from '~/components/LayoutComponents.vue'
import LayoutMetric from '~/components/LayoutMetric.vue'

export default {
  name: 'Layout',
  components: {
    LayoutComponents, LayoutMetric
  }
}
</script>

<style lang="scss">
.layout-example {
  height: 20rem;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
  color: #333;
  .navbar {
    color: #fff;
  }
  .navbar, .actionbar, .navbar-wrapper, .actionbar-wrapper{
    height: 400px;
    min-height: 0;
    position: relative;
  }
  @media (max-width: 840px) {
      .workspace {
        min-width: 40rem;
        margin-top: 0rem;
        margin-right: 1rem;
      }
  }

}
</style>

