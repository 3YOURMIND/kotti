<template lang="md">
```html
deprecate 
```
## Grid System

Kotti using grid system inherit 
[Spectre's Grid System](https://picturepan2.github.io/spectre/layout.html). 
You can check full documentation on Spectre's website. Here only lists the differents.

### Gutter

The gutter in Kotti is 16px (8px on each side of a column). You can also remove the gutter by add `col-gapless` to `columns` class; `row-gapless` can remove the row gaps. `col-gutter-sm` 
can change the `gutter` between two columns to 8px, `row-gutter-sm` changes the `gutter` between two rows to 8px;

<div class="element-example">
  <div class="container">
    <div class="columns">
      <div class="column col-12">Default Gutter</div>
      <div class="column col-2">
        <div class="content">col-2</div>
      </div>
      <div class="column col-10">
        <div class="content">col-10</div>
      </div>
      <div class="column col-2">
        <div class="content">col-2</div>
      </div>
      <div class="column col-10">
        <div class="content">col-10</div>
      </div>
    </div>
    <div class="columns row-gutter-sm">
      <div class="column col-12">Row gutter small</div>
      <div class="column col-2">
        <div class="content">col-2</div>
      </div>
      <div class="column col-10">
        <div class="content">col-10</div>
      </div>
      <div class="column col-2">
        <div class="content">col-2</div>
      </div>
      <div class="column col-10">
        <div class="content">col-10</div>
      </div>
    </div>
    <div class="columns row-gapless col-gapless">
      <div class="column col-12">No gutter</div>
      <div class="column col-6">
        <div class="content">Row gapless, Col gapless</div>
      </div>
      <div class="column col-6">
        <div class="content">Row gapless, Col gapless</div>
      </div>
    </div>
    <div class="columns row-gapless col-gutter-sm">
      <div class="column col-6">
        <div class="content">Row gapless, Col gutter 8px</div>
      </div>
      <div class="column col-6">
        <div class="content">Row gapless, Col gutter 8px</div>
      </div>
    </div>
  </div>
</div>

```html
<div class="container">
  <div class="columns">
    <div class="column col-2">col-2</div>
    <div class="column col-10">col-10</div>
  </div>
  <!-- Row gutter small and none -->
  <div class="columns row-gutter-sm">
    <div class="column col-2">col-2</div>
    <div class="column col-10">col-10</div>
  </div>
  <div class="columns row-gapless">
    <div class="column col-2">col-2</div>
    <div class="column col-10">col-10</div>
  </div>
  <!-- Col gutter small and none -->
  <div class="columns col-gutter-sm">
    <div class="column col-2">col-2</div>
    <div class="column col-10">col-10</div>
  </div>
   <div class="columns col-gapless">
    <div class="column col-2">col-2</div>
    <div class="column col-10">col-10</div>
  </div>
</div>
```

  
</template>

<style lang="scss" scoped>
.content {
	color: #fff;
	background: #3173de;
}
</style>
