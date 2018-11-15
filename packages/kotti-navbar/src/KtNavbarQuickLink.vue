<template>
	<div
		class="kt-navbar__quick-link"
		:style="{ 'border-color': themeColor.borderColor }"
	>
		<div
			class="kt-navbar__quick-link__title"
			:style="{ color: themeColor.textColor }"
			v-text="title"
		/>
		<a v-for="(item, index) in links" :key="index" :href="item.link">
			<div
				class="kt-navbar__quick-link__links"
				:style="{ color: themeColor.textColor }"
			>
				<span v-text="item.title" /> <i>Icon</i>
			</div>
		</a>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarQuickLink',
	props: {
		title: { type: String, default: 'Quick Links' },
		links: { type: Array, default: [] },
	},
	inject: {
		themeColor: {
			from: 'KtNavbarTheme',
		},
	},
}
</script>

<style lang="scss">
.kt-navbar__quick-link {
	border-top: 1px solid #fff;
	padding: 0.8rem 1.2rem;
}
.kt-navbar__quick-link__title {
	font-size: 0.6rem;
	font-weight: 700;
	opacity: 0.64;
	text-transform: uppercase;
}
.kt-navbar__quick-link__links {
	display: flex;
	font-size: 0.75rem;
	padding: 0.3rem 0;
	justify-content: space-between;
}
</style>
