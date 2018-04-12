<template lang="md">

# Drawer

Drawer is another layer of the interface. It adds more information or functionality to the current layout without messing up the elements.

It is best to place secondary functionality or information in the drawer, and only present the most important elements or interaction in the workspace.

## Structure

![Structure](~/assets/img/drawer_structure.png)

* **Drawer:** The size of drawer depends on information density. There are three sizes: `Default`, `Wide` and `Full Open`.
* **Handle:** By clicking the handles, the drawer can be `Full Open` to display more information.
* **Background:** The background should be black `#000000` with 46% opacity.

<div class="element-example">
  <button class="primary mr-16px"@click="showDrawer=true">Show Default Size Drawer</button>
  <button class="primary"  @click="showWideDrawer=true">Show Wide Size Drawer</button>
</div>
<transition name="drawer" mode="out-in">
<div class="drawer-mask" v-if="showDrawer">
  <div class="drawer-container" :class="{'drawer-expand': expand}">
    <div class="drawer-header">
      <h2>default header</h2>
    </div>
    <div class="drawer-body">
      <slot name="body">
        default body
      </slot>
    </div>
    <div class="drawer-footer">
      <button class="w-100" @click="showDrawer=false">Close</button>
    </div>
    <div class="drawer-handle" @click="expand = !expand">
      <i class="yoco" v-if="expand">chevron_right</i>
      <i class="yoco" v-else>chevron_left</i>
    </div>
  </div>
</div>
</transition>

<transition name="drawer" mode="out-in">
<div class="drawer-mask" v-if="showWideDrawer">
  <div class="drawer-container drawer-wide" :class="{'drawer-expand': wideExpand}">
    <div class="drawer-header">
      <h2>default header</h2>
    </div>
    <div class="drawer-body">
      <slot name="body">
        default body
      </slot>
    </div>
    <div class="drawer-footer">
      <button class="w-100" @click="showWideDrawer=false">Close</button>
    </div>
    <div class="drawer-handle" @click="wideExpand = !wideExpand">
      <i class="yoco" v-if="wideExpand">chevron_right</i>
      <i class="yoco" v-else>chevron_left</i>
    </div>
  </div>
</div>
</transition>

```html
<div class="drawer-mask">
  <div class="drawer-container">
    <div class="drawer-header">
      <h2>default header</h2>
    </div>
    <div class="drawer-body">
        default body
    </div>
    <div class="drawer-footer">
      <button class="w-100">Close</button>
    </div>
    <div class="drawer-handle">
      <i class="yoco" v-if="expand">chevron_right</i>
      <i class="yoco" v-else>chevron_left</i>
    </div>
  </div>
</div>

<div class="drawer-mask">
  <div class="drawer-container drawer-wide">
    <div class="drawer-header"></div>
    <div class="drawer-body"></div>
    ...
  </div>
</div>
```



</template>

<script>
export default {
  name: 'Drawer',
  data () {
    return {
      expand: false,
      wideExpand: false,
      showDrawer: false,
      showWideDrawer: false
    }
  }
}
</script>
