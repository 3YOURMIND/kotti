<template>
	<div class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header"><h1 v-text="currentSection" /></div>
			<div class="actionbar-body">
				<div class="actionbar-menu has-icon-right">
					<ul v-for="item in filteredSubmenus" :key="item.id">
						<nuxt-link
							v-for="child in item.child"
							:to="`/${item.parent}/${child.to}`"
							:key="child.to"
						>
							<li>
								<span v-text="child.label" />
								<span v-if="child.isCSS" class="indicator-only-css">CSS</span>
								<i class="yoco">chevron_right</i>
							</li>
						</nuxt-link>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.nuxt-link-exact-active li {
	font-weight: 600;
	color: #2c66c4;

	i {
		color: #2c66c4;
	}
}

.indicator-only-css {
	font-size: 0.6em;
	background: #64ad13;
	color: #fff;
	line-height: 1em;
	padding: 0.1rem 0.2rem;
	margin-left: 0.2rem;
	border-radius: 0.2rem;
}
</style>

<script>
import Submenu from '../assets/json/submenu'

export default {
	name: 'Actionbar',
	data() {
		return {
			submenu: Submenu,
		}
	},
	computed: {
		currentSection() {
			const pathName = this.$route.name ? this.$route.name.split('-')[0] : ''
			const sectionName = pathName.slice(0, 1).toUpperCase() + pathName.slice(1)
			return sectionName
		},
		filteredSubmenus() {
			return Submenu.filter(
				menu => menu.parent.toLowerCase() === this.currentSection.toLowerCase(),
			)
		},
	},
}
</script>
