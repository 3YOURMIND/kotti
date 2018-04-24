<template>
	<div class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header">
				<h1 v-text="currentSection" />
			</div>
			<div class="actionbar-body">
				<div class="actionbar-menu has-icon-right">
					<ul v-for="item in submenu" :key="item.id"
							v-if="item.parent === currentSection.toLowerCase()">
						<nuxt-link v-for="child in item.child" :to="`/${item.parent}/${child.to}`"
						  :key="child.to">
							<li>
								<span v-text="child.label" />
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
</style>


<script>
export default {
	name: 'Actionbar',
	props: {
		currentSection: String,
	},
	data() {
		return {
			submenu: [
				{
					parent: 'foundations',
					child: [
						{
							label: 'Layout',
							to: 'layout',
						},
						{
							label: 'Color',
							to: 'color',
						},
						{
							label: 'Icons',
							to: 'icons',
						},
						{
							label: 'Typography',
							to: 'typography',
						},
						{
							label: 'Writing Style',
							to: 'writing',
						},
					],
				},
				{
					parent: 'components',
					child: [
						{
							label: 'Avatars',
							to: 'avatars',
						},
						{
							label: 'Banners',
							to: 'banners',
						},
						{
							label: 'Drawers',
							to: 'drawer',
						},
						{
							label: 'Headings',
							to: 'headings',
						},
						{
							label: 'Inputs',
							to: 'inputs',
						},
						{
							label: 'Modal',
							to: 'modal',
						},
						{
							label: 'Loadings',
							to: 'loadings',
						},
						{
							label: 'Popovers',
							to: 'popovers',
						},
						{
							label: 'Tables',
							to: 'tables',
						},
						{
							label: 'Toaster',
							to: 'toaster',
						},
						{
							label: 'Utilities',
							to: 'utilities',
						},
					],
				},
				{
					parent: 'patterns',
					child: [
						{
							label: 'Inline Edit',
							to: 'inline-edit',
						},
					],
				},
				{
					parent: 'resources',
					child: [
						{
							label: 'Kotti Style',
							to: 'kotti-style',
						},
						{
							label: 'Design Kit',
							to: 'designkit',
						},
					],
				},
			],
		};
	},
};
</script>
