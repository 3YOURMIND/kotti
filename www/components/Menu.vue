<template>
  <div class="sidemenu">
    <div class="subline" @click="showFoundation=!showFoundation">Foundation</div>
    <ul v-if="showFoundation">
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
    <div class="subline" @click="showComponents=!showComponents">Components</div>
    <ul v-if="showComponents">
      <li>
        <nuxt-link to="/avatars">Avatars</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/banners">Banners</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/buttons">Buttons</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/drawer">Drawers</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/headings">Headings</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/forms">Forms</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/inputs">Inputs</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/inline-edit">Inline Edit</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/modal">Modal</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/loadings">Loadings</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/popovers">Popovers</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/tables">Tables</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/toaster">Toaster</nuxt-link>
      </li>
       <li>
        <nuxt-link to="/utilities">Utilities</nuxt-link>
      </li>
    </ul>
    <div class="subline" @click="showResource=!showResource">Resource</div>
    <ul v-if="showResource">
      <li>
        <nuxt-link to="/kotti-style">Kotti Style</nuxt-link>
        <nuxt-link to="/designkit">Design Kit</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'Menu',
	data() {
		return {
			showFoundation: true,
			showComponents: false,
			showResource: false,
		};
	},
};
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
		font-size: 1.05em;
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
		font-size: 1em;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.64);
		margin: 1.2rem 0 0.8rem 0;
		text-transform: uppercase;
		&:hover {
			cursor: pointer;
			color: #fff;
		}
	}
}
</style>
