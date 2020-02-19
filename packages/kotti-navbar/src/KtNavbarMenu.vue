<template>
	<div class="kt-navbar-menu">
		<div v-for="(item, index) in sections" :key="index">
			<div
				v-if="item.title"
				class="kt-navbar-menu__section"
				v-text="isNarrow ? '' : item.title"
			/>
			<a
				v-for="(link, linkIndex) in item.links"
				:key="linkIndex"
				:class="{ active: link.isActive }"
				class="kt-navbar-menu__item"
				:href="link.link ? link.link : null"
				@click="$emit('menuLinkClick', link)"
			>
				<i class="yoco" v-text="link.icon" />
				<span
					v-if="!isNarrow"
					:data-test="`kt-navbar-section-item-${link.title.toLowerCase()}`"
					v-text="link.title"
				/>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarMenu',
	props: {
		sections: { type: Array, default: null },
	},
	computed: {
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
	},
}
</script>
<style lang="scss">
.kt-navbar-menu {
	box-sizing: border-box;
	padding: 0.4rem 1rem;
	text-align: left;
	&__section {
		display: block;
		padding: 0.2rem 0;
		margin-top: 0.4rem;
		font-size: 0.85em;
		font-weight: 700;
		color: var(--navbar-color-light);
		text-transform: uppercase;
	}
	&__item {
		display: block;
		padding: 0.6rem 0;
		font-size: 0.75rem;
		color: inherit;
		&:hover {
			color: var(--navbar-color-active);
			cursor: pointer;
		}
		&.active {
			color: var(--navbar-color-active);
		}
	}
	&__item span {
		margin-left: 0.8rem;
	}
	.yoco {
		font-size: 1rem;
	}
}
</style>
