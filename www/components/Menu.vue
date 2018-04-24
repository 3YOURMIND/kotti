<template>
  <div class="sidemenu">
    <div class="subline" @click="showFoundation=!showFoundation">
      <i class="yoco">layer</i> Foundation
    </div>
    <ul v-if="showFoundation">
      <li>
        <nuxt-link to="/foundations/layout">Layout</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/foundations/color">Color</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/foundations/icons">Icons</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/foundations/typography">Typography</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/foundations/writing">Writing Style</nuxt-link>
      </li>
    </ul>
    <div class="subline" @click="showComponents=!showComponents">
      <i class="yoco">dashboard</i> Components</div>
    <ul v-if="showComponents">
      <li>
        <nuxt-link to="/components/avatars">Avatars</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/banners">Banners</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/buttons">Buttons</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/drawer">Drawers</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/headings">Headings</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/forms">Forms</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/inputs">Inputs</nuxt-link>
      </li>

      <li>
        <nuxt-link to="/components/modal">Modal</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/loadings">Loadings</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/popovers">Popovers</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/tables">Tables</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/components/toaster">Toaster</nuxt-link>
      </li>
       <li>
        <nuxt-link to="/utilities">Utilities</nuxt-link>
      </li>
    </ul>
     <div class="subline" @click="showPatterns=!showPatterns">
       <i class="yoco">structure</i> Patterns</div>
     <ul v-if="showPatterns">   
        <li>
        <nuxt-link to="/patterns/inline-edit">Inline Edit</nuxt-link>
      </li>
    </ul>
    <div class="subline" @click="showResources=!showResources"><i class="yoco">download</i>Resource</div>
    <ul v-if="showResources">
      <li>
        <nuxt-link to="/resources/kotti-style">Kotti Style</nuxt-link>
        <nuxt-link to="/resources/designkit">Design Kit</nuxt-link>
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
			showResources: false,
			showPatterns: false,
		};
	},
	methods: {
		menuSwitch(val) {},
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
			color: #3d3d3d;
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
		color: #3d3d3d;
		margin: 1.2rem 0 0.8rem 0;
		text-transform: uppercase;
		i {
			font-size: 1rem;
			margin-right: 0.4rem;
		}
		&:hover {
			cursor: pointer;
			color: rgba(44, 100, 204, 0.84);
		}
	}
}
</style>
