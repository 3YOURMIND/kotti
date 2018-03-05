<template>
  <div class="sidemenu">
    <div class="subline">Foundation</div>
    <ul>
      <li>
        <nuxt-link to="/layout">Layout</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/color">Color</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/icons">Icons</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/typography">Typography</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/writing">Writing Style</nuxt-link>
      </li>
    </ul>
    <div class="subline">Components</div>
    <ul>
      <li>
        <nuxt-link to="/banners">Banners</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/buttons">Buttons</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/drawer">Drawer</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/inputs">Inputs</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/loadings">Loadings</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/tables">Tables</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/toaster">Toaster</nuxt-link>
      </li>
    </ul>
    <div class="subline">Resource</div>
    <ul>
      <li>
        <nuxt-link to="/designkit">Design Kit</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style lang="scss" scoped>
.sidemenu {
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
      padding: 0.2rem 0.8rem;
      display: block;
      color: #f8f8f8;
    }

    .nuxt-link-exact-active {
      padding: 0.2rem 0.8rem;
      display: block;
      font-weight: 600;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .subline {
    font-size: 0.875em;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.64);
    margin: 1.2rem 0 0.8rem 0;
    text-transform: uppercase;
  }
}
</style>
