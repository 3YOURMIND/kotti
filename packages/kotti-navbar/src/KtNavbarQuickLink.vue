<template>
	<div class="kt-navbar-quick-links">
		<div v-if="!isNarrow" class="kt-navbar-quick-links__title" v-text="title" />
		<a
			class="kt-navbar-quick-links__link"
			v-for="(item, index) in links"
			:key="index"
			:href="item.link"
			target="_blank"
			rel="noopener noreferrer"
		>
			<span v-text="item.title" v-if="!isNarrow" /> <i class="yoco">link</i>
		</a>
	</div>
</template>

<script>
import color from 'color'

export default {
	name: 'KtNavbarQuickLink',
	props: {
		title: { type: String, default: 'Quick Links' },
		links: { type: Array, default: [] },
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
	border-top: 1px solid var(--navbar-border);
	padding: 0.8rem 1rem;
}
.kt-navbar-quick-links__title {
	font-size: 0.6rem;
	font-weight: 700;
	text-transform: uppercase;
}
.kt-navbar-quick-links__link {
	display: flex;
	font-size: 0.75rem;
	padding: 0.3rem 0;
	justify-content: space-between;
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
