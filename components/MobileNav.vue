<template>
  <div>
    <div class="mobile-logo">
      <img src="~/assets/img/nav_logo.svg">
    </div>
    <div class="mobile-menu-button c-hand" @click="isOpen=!isOpen">
      Menu <i class="yoco" v-if="isOpen">chevron_up</i>
      <i class="yoco" v-else>chevron_down</i>
    </div>
    <div class="mobile-menu-expand-wrapper" v-if="isOpen" @click="isOpen=false">
    <div class="mobile-menu-expand" v-if="isOpen" @click="isOpen=false">
      <menu-list/>
    </div>
    </div>
  </div>
</template>
<script>
import MenuList from '~/components/Menu.vue'
export default {
  name: 'mobiel-menu',
  data () {
    return {
      isOpen: false
    }
  },
  components: {
    MenuList
  }
}
</script>

<style lang="scss" scoped>
.mobile-logo {
  padding: .8rem;
  height: 2.8rem;
  text-align: left;
  top: 0;
  width: 100%;
  background: #2659AB;
  box-shadow: 0 0 1px rgba(0, 0, 0, .8);
  position: fixed;
  img {
    float: left;
    width: 8rem;
    margin-left: -2rem; 
  }
  z-index: 999;
}
.mobile-menu-button {
  width: auto;
  padding: 0 .8rem;
  height: 2rem;
  background: #f8f8f8;
  border-radius: .1rem;
  position: fixed;
  top: .4rem;
  right: .4rem;
  text-align: center;
  i {
    line-height: 2rem;
  }
  z-index: 999;
}
.mobile-menu-expand-wrapper {
  background: rgba(0, 0, 0, .8);
  width: 100%;
  height: 100%;
  z-index: 993;
  position: fixed;
}
.mobile-menu-expand {
  position: fixed;
  margin-top: 2.7rem;
  overflow-y: scroll;
  height: 90vh;
  font-size: 1.2em;
  width: 100%;
  padding: 1.2rem;
  background: #2659AB;
  z-index: 998;
}


</style>
