<template lang="md">

# Popovers

Using popovers to provide extra information or operations. Comparing to `tooltip`, `popovers` can carry more information.

<div class="element-example">
  <div class="popover popover-left mr-8px">
    <button class="secondary">Popover left</button>
    <div class="popover-container">
      <div class="card">
        <div class="card-header">
          <h2>Hover me title</h2>
        </div>
        <div class="card-body">
          This is the hover popover
        </div>
        <div class="card-footer">
          <button class="danger">Delete</button>
          <button class="text">cancel</button>
        </div>
      </div>
    </div>
  </div>
  <div class="popover popover-bottom mr-8px">
    <button class="secondary">Popover bottom</button>
    <div class="popover-container">
      <div class="card">
        <div class="card-header">
          <h2>Hover me title</h2>
        </div>
        <div class="card-body">
          This is the hover popover
        </div>
        <div class="card-footer">
          <button class="danger">Delete</button>
          <button class="text">cancel</button>
        </div>
      </div>
    </div>
  </div>
  <div class="popover popover-up mr-8px">
    <button class="secondary">Popover up</button>
    <div class="popover-container">
      <div class="card">
        <div class="card-header">
          <h2>Hover me title</h2>
        </div>
        <div class="card-body">
          This is the hover popover
        </div>
        <div class="card-footer">
          <button class="danger">Delete</button>
          <button class="text">cancel</button>
        </div>
      </div>
    </div>
  </div>
  <div class="popover popover-right mr-8px">
    <button class="secondary">Popover right</button>
    <div class="popover-container">
      <div class="card">
        <div class="card-header">
          <h2>Hover me title</h2>
        </div>
        <div class="card-body">
          This is the hover popover
        </div>
        <div class="card-footer">
          <button class="danger">Delete</button>
          <button class="text">cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>

You can use `card` component in `popover-container`. There are also 4 different positions for popovers. `popover-right`, `popover-left`, `popover-up` and `popover-bottom`.

```html
<div class="popover popover-right">
  <button class="">Popover right</button>
  <div class="popover-container">
    <div class="card">
      <div class="card-header">
        <h2>Hover me title</h2>
      </div>
      <div class="card-body">
        This is the hover popover
      </div>
      <div class="card-footer">
        <button class="danger">Delete</button>
        <button class="text">cancel</button>
      </div>
    </div>
  </div>
</div>
```


</template>

<script>
export default {
	name: 'Popovers',
};
</script>
