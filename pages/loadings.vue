<template lang="md">
  # Loadings

  ## Skeleton Screen

  A skeleton screen gives a visual cue that content is loading one after the other into each UI element area. We suggest using skeleton screen for content densitive pages. 


  There are three types of skeleton elements: 

  1. **Circle:** Cicular shape which width and height are equal to parents' width, class name `skeleton--circle`;
  2. **Square:** Width and height are equal to parents' width, class name `skeleton--square`;
  3. **Rectangle:** Width equals to parents or half `skeleton--rectangle__half`, height can be `skeleton--rectangle__2x` doubled or tripled `skeleton--rectangle__3x`.

  <div class="element-example">
    <div class="columns">
      <div class="column col-1">
        <div class="skeleton--circle" />
      </div>
      <div class="column col-5">
        <div class="skeleton--rectangle skeleton--rectangle__2x"/>
        <div class="skeleton--rectangle skeleton--rectangle__2x"/>
        <div class="skeleton--rectangle skeleton--rectangle__2x skeleton--rectangle__half"/>
      </div>
    </div>
  </div>

  ```html
  <div class="columns">
    <div class="column col-1">
      <div class="skeleton--circle" />
    </div>
    <div class="column col-5">
      <div class="skeleton--rectangle skeleton--rectangle__2x"/>
      <div class="skeleton--rectangle skeleton--rectangle__2x"/>
      <div class="skeleton--rectangle skeleton--rectangle__2x skeleton--rectangle__half"/>
    </div>
  </div>
  ```

  <div class="element-example">
    <div class="columns">
    <div class="column col-1">
      <div class="skeleton--square" />
    </div>
    <div class="column col-6">
      <div class="skeleton--rectangle"/>
      <div class="skeleton--rectangle skeleton--rectangle__2x"/>
      <div class="skeleton--rectangle skeleton--rectangle__3x skeleton--rectangle__half"/>
    </div>
    </div>
  </div>

  ```html
   <div class="element-example">
    <div class="columns">
    <div class="column col-1">
      <div class="skeleton--square" />
    </div>
    <div class="column col-6">
      <div class="skeleton--rectangle"/>
      <div class="skeleton--rectangle skeleton--rectangle__2x"/>
      <div class="skeleton--rectangle skeleton--rectangle__3x skeleton--rectangle__half"/>
    </div>
    </div>
  </div>
  ```

  ## Spin Loading

  Loading indicator is used for loading and updating. `loading` class is regular size, `loading-lg` is large size.

  <div class="element-example">
    <div class="columns">
      <div class="column col-6">
      <div class="loading"/>
      </div>
      <div class="column col-6">
        <div class="loading loading-lg"/>
      </div>
    </div>
  </div>

  ```html
  <div class="loading"/>
  <div class="loading loading-lg"/>
  ```
  
  You can also use animated loading indicator inline `loading--inline` with other elements. `loading--white` class changes the ring color.

  <div class="element-example">
    <div class="columns">
    <div class="column col-4">
    <button class="primary w-100">
      <div class="loading loading--inline loading--white"></div>
       Uploading
    </button>
    </div>
    <div class="column col-4">
    <button class="secondary w-100">
      <div class="loading loading--inline"></div>
       Uploading
    </button>
    </div>
    </div>
  </div>

  ```html
  <button class="primary">
    <div class="loading loading--inline loading--white"></div>
      Uploading
  </button>
  <button class="secondary">
    <div class="loading loading--inline"></div>
       Uploading
  </button>
  ```


 
  
  


</template>

<script>
export default {
  name: 'Loadings'
}
</script>

