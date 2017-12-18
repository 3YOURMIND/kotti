<template>
  <div class="sidebar">
    <div class="logo-nav">
      <nuxt-link to="/"><img src="~/assets/img/nav_logo.svg"></nuxt-link>
    </div>
    <div class="subline">Foundation</div>
    <ul>
      <li><nuxt-link to="/layout">Layout</nuxt-link></li>
      <li><nuxt-link to="/color">Color</nuxt-link></li>
      <li><nuxt-link to="/icons">Icons</nuxt-link></li>
      <li><nuxt-link to="/typography">Typography</nuxt-link></li>
      <li><nuxt-link to="/writing">Writing Style</nuxt-link></li>
    </ul>
    <div class="subline">Components</div>
    <ul>
      <li><nuxt-link to="/banners">Banners</nuxt-link></li>
      <li><nuxt-link to="/buttons">Button</nuxt-link></li>
      <li><nuxt-link to="/inputs">Inputs</nuxt-link></li>
      <li><nuxt-link to="/notifications">Notification</nuxt-link></li>
      <li><nuxt-link to="/table">Tables</nuxt-link></li>
      <!-- <li>Toogles</li>
      <li>Workflow</li>
      <li>Overlay</li> -->
    </ul>
    <div class="subline">Resource</div>
    <ul>
      <li>Sketch Kit</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.logo-nav {
  margin: 1.2rem 0; 
  text-align: left;
  height: 2.4rem;
}
.sidebar {
  background: #2659AB;
  height: 100vh;
  width: 12rem;
  padding: 1.2rem;
  overflow-y: scroll;
  float: left;
  color:#F8F8F8; 
  position: fixed;
  ul {

    width: 100%;
    margin: 0;
  }
  li {
    margin: 0;
    line-height: 1.4rem;
    list-style: none;
  
  a {
    text-decoration: none;
    padding: .4rem .8rem;
    display: block;
    color: #F8F8F8;
  }
  .nuxt-link-exact-active {
    padding: .4rem .8rem;
    display: block;
    font-weight: 600;
    background: rgba(0, 0, 0, .2);
  }
  }
  .subline {
    font-size: 0.875em;
    font-weight: 600;
    color: rgba(255, 255, 255, .64);
    margin: 1.2rem 0 .8rem 0;
    text-transform: uppercase;
  }
}

</style>
