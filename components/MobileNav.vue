<template>
  <div>
    <div class="mobile-logo">
      <img src="~/assets/img/logo-nav.svg">
    </div>
    <div class="mobile-menu-button c-hand" @click="isOpen=!isOpen">
      Menu <i class="yoco" v-if="isOpen">chevron_up</i>
      <i class="yoco" v-else>chevron_down</i>
    </div>
    <div class="mobile-menu-expand" v-if="isOpen">
      <ul @click="isOpen=false">
        <li><nuxt-link to="/color">Colors</nuxt-link></li>
        <li><nuxt-link to="/layout">Layout</nuxt-link></li>
        <li><nuxt-link to="/typography">Typography</nuxt-link></li>
        <li><nuxt-link to="/table">Table</nuxt-link></li>
        <li><nuxt-link to="/Icons">Icons</nuxt-link></li>
        <li><nuxt-link to="/form">Form</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mobiel-menu',
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-logo {
  padding: 1rem;
  height: 3.2rem;
  width: 100%;
  top: 0;
  background: #fff;
  box-shadow: 0 0 1px #8f8f8f;
  position: fixed;
  img {
    height: 1.4rem;
  }
  z-index: 999;
}
.mobile-menu-button {
  width: auto;
  padding: 0 .8rem;
  height: 2.4rem;
  background: #f8f8f8;
  border-radius: .1rem;
  position: fixed;
  top: .4rem;
  right: .4rem;
  text-align: center;
  i {
    line-height: 2.4rem;
  }
  z-index: 999;
}
.mobile-menu-expand {
  position: fixed;
  margin-top: 3rem;
  font-size: 1.2em;
  width: 100%;
  box-shadow: 0 0 5px #8f8f8f;
  background: #fff;
  z-index: 998;
}
ul {
  margin: 0;
  padding: 1.2rem;
}
li {
  text-align: center;
  padding: .8em 0;
  list-style: none;
}


</style>
