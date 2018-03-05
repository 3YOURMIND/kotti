<template lang="md">
  # Loadings

  ## Skeleton Screen

  A skeleton screen gives a visual cue that content is loading one after the other into each UI element area. We suggest using skeleton screen for content densitive pages. 


  There are three types of skeleton elements: 

  1. **Circle:** Cicular shape which width and height are equal to parents' width, class name `circle`;
  2. **Square:** Width and height are equal to parents' width, class name `square`;
  3. **Rectangle:** Width equals to parents, height can be midium `md` or large `lg`.

  <div class="element-example">
    <div class="columns">
      <div class="column col-1">
        <div class="skeleton circle" />
      </div>
      <div class="column col-5">
        <div class="skeleton rectangle md"/>
        <div class="skeleton rectangle md"/>
        <div class="skeleton rectangle md w-50"/>
      </div>
    </div>
  </div>

  ```html
  <div class="columns">
    <div class="column col-1">
      <div class="skeleton circle" />
    </div>
    <div class="column col-5">
      <div class="skeleton rectangle md"/>
      <div class="skeleton rectangle md"/>
      <div class="skeleton rectangle md w-50"/>
    </div>
  </div>
  ```

  <div class="element-example">
    <div class="columns">
    <div class="column col-1">
      <div class="skeleton square" />
    </div>
    <div class="column col-6">
      <div class="skeleton rectangle"/>
      <div class="skeleton rectangle md"/>
      <div class="skeleton rectangle lg w-50"/>
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
      <div class="skeleton rectangle"/>
      <div class="skeleton rectangle md"/>
      <div class="skeleton rectangle lg w-50"/>
    </div>
    </div>
  </div>
  ```

  ## Spin Loading

  Loading indicator is used for loading and updating. `loading` class is regular size, `lg` is large size.

  <div class="element-example">
    <div class="columns">
      <div class="column col-6">
      <div class="loading"/>
      </div>
      <div class="column col-6">
        <div class="loading lg"/>
      </div>
    </div>
  </div>

  ```html
  <div class="loading"/>
  <div class="loading lg"/>
  ```
  
  You can also use animated loading indicator inline `inline` with other elements.


  <button>
    <div class="loading inline"></div>
    Uploading
  </button>

  ```html
  <button>
    <div class="loading inline"></div>
       Uploading
  </button>
  ```

  Using `white` class can change the ring color.

  <button class="primary">
      <div class="loading inline white"></div>
       Uploading
  </button>

  ```html
  <button class="primary">
    <div class="loading inline white"></div>
      Uploading
  </button>
  ```



 
  
  


</template>

<script>
export default {
  name: 'Loadings'
}
</script>

