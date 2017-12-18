<template>
  <div class="sidebar">
    <div class="logo-nav">
      <nuxt-link to="/"><img src="~/assets/img/nav_logo.svg"></nuxt-link>
    </div>
    <div class="subline">Foundation</div>
    <ul>
      <li><nuxt-link to="/layout">Layout</nuxt-link></li>
      <li><nuxt-link to="/color">Color</nuxt-link></li>
      <li><nuxt-link to="/typography">Typography</nuxt-link></li>
      <li><nuxt-link to="/icons">Icons</nuxt-link></li>
      <li>Writing Style</li>

    </ul>
    <div class="subline">Components</div>
    <ul>
      <li>Banners</li>
      <li><nuxt-link to="/table">Table</nuxt-link></li>
      <li><nuxt-link to="/form">Button</nuxt-link></li>
      <li>Notification</li>
      <li>Clips</li>
      <li>Toogles</li>
      <li>Text field</li>
      <li>Workflow</li>
      <li>Overlay</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.logo-nav {
  margin: 1.2rem 0; 
  text-align: left;
  height: 4rem;
}
.sidebar {
  background: #2659AB;
  height: 100vh;
  width: 12rem;
  padding: 1.2rem;
  float: left;
  color:#F8F8F8; 
  position: fixed;
  ul {
    line-height: 1.4rem;
    width: 100%;
    margin: 0;
    padding-left: 1.2rem;
  }
  li {
    list-style: none;
  }
  a {
    font-weight: bold;
    color: #F8F8F8;
  }
  a:active {
    color: #F8F8F8;
  }
  .subline {
    font-size: 0.875em;
    color: #DBDBDB;
    margin: 1.2rem 0 .8rem 0;
    text-transform: uppercase;
  }
}

</style>
