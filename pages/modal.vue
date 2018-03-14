<template lang="md">

# Modal 


<div class="element-example">
  <button @click="showModal=true">Show the modal</button>

  <div class="modal-mask" v-if="showModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2>This is the header</h2>
      </div>
      <div class="modal-body">
          default body
      </div>
      <div class="modal-footer">
        <button class="text" @click="showModal=false">Close</button>
      </div>
    </div>
  </div>
</div>

```html
<div class="modal-mask">
  <div class="modal-container"> 
    <div class="modal-header">
      <h2>This is the header</h2>
    </div>
    <div class="modal-body">
        default body
    </div>
    <div class="modal-footer">
      <button class="text" @click="showModal=false">Close</button>
    </div>
  </div>
</div>
```


</template>


<script>
export default {
  name: 'Modal',
  data () {
    return {
      showModal: false
    }
  }
}
</script>
