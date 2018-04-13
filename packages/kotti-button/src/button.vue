<template>
  <button :class="[type, objecClass]">
    <i :class="loadingClass" v-if="loading"/>
    <i class="yoco" v-text="icon"></i>
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'KtButton',
  props: {
    type: '',
    icon: '',
    loading: Boolean,
  },
  computed: {
    loadingClass() {
      return {
        'inline loading': true,
        white: this.type === 'primary',
      };
    },
    objecClass() {
      return {
        icon: this.icon,
        'icon-only': this.icon && this.$slots.default,
      };
    },
  },
};
</script>

