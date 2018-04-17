<template lang=md>
  <div class="element-example" @click="showCode=!showCode">
    <slot/>
  </div>

</template>

<script>
export default {
  name: 'ShowCase',
  data() {
    return {
      showCode: false,
    };
  },
  props: {
    source: '',
  },
};
</script>

