<template>
	<div class="kt-navbar-quick-links">
		<div v-if="!isNarrow" class="kt-navbar-quick-links__title" v-text="title" />
		<a
			v-for="(item, index) in links"
			:key="index"
			class="kt-navbar-quick-links__link"
			:href="item.link"
			target="_blank"
			rel="noopener noreferrer"
		>
			<span v-if="!isNarrow" v-text="item.title" /> <i class="yoco">link</i>
		</a>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarQuickLink',
	props: {
		title: { type: String, default: 'Quick Links' },
		links: { type: Array, default: () => [] },
	},
	computed: {
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
	},
}
</script>

<style lang="scss" scoped>
.kt-navbar-quick-links {
	padding: 1.2rem 1rem;
	margin: 0.4rem 0;
	background: var(--navbar-border);
}
.kt-navbar-quick-links__title {
	font-size: 0.6rem;
	font-weight: 700;
	text-transform: uppercase;
	opacity: 0.64;
}
.kt-navbar-quick-links__link {
	display: flex;
	align-items: center;
	color: var(--navbar-color-light);
	&:hover {
		color: var(--navbar-color);
	}
	i {
		font-size: 0.8rem;
	}
}
</style>
