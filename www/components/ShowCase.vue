<template>
  <div class="code-switch">
    <div class="switcher" v-text="currentCode" @click="showCode=!showCode"/>
    <slot name="vue" v-if="showCode"/>
    <slot name="style" v-else/>
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
  computed: {
    currentCode() {
      return this.showCode ? 'Kotti-UI' : 'Kotti-Style';
    }
  }
};
</script>

<style lang="scss" scoped>
.code-switch {
  position: relative;
  padding-top: .5rem;
  .switcher {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    font-size: 12px;
    background: rgba(0, 0, 0, .4);
    padding: .2rem .5rem;
    width: 100%;
  }
  .switcher:hover {
    background: rgba(44, 100, 204, .6);
    cursor: pointer;
  }
}
</style>

