<template>
  <div class="sidebar">
    <div class="logo-nav">
      <nuxt-link to="/"><img src="~/assets/img/logo-nav.svg"></nuxt-link>
    </div>
    <ul>
      <li><nuxt-link to="/color">Color</nuxt-link></li>
      <li><nuxt-link to="/layout">Layout</nuxt-link></li>
      <li><nuxt-link to="/typography">Typography</nuxt-link></li>
      <li><nuxt-link to="/table">Table</nuxt-link></li>
      <li><nuxt-link to="/Icons">Icons</nuxt-link></li>
      <li><nuxt-link to="/form">Form</nuxt-link></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.logo-nav {
  margin: 1.2rem 0 2rem 0; 
  text-align: left;
  height: 1rem;
  img {
    height: 1rem;
  }
}
.sidebar {
  background: #f8f8f8;
  height: 100vh;
  width: 12rem;
  padding: 1.2rem;
  float: left;
  position: fixed;
  ul {
    line-height: 2rem;
    width: 100%;
    margin: 0;
    padding-left: 1.2rem;
  }
  li {
    font-size: 0.875em;
    list-style: none;
  }
    a {
    font-weight: bold;
    text-transform: uppercase;
    color: #575757;
  }
  a:active {
    color: #575757;
  }
}

</style>
