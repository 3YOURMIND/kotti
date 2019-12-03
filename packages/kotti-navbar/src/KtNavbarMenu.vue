<template>
	<div class="kt-navbar-menu">
		<div v-for="(item, index) in sections" :key="index">
			<div
				v-if="item.title"
				v-text="isNarrow ? '' : item.title"
				class="kt-navbar-menu__section"
			/>
			<a
				v-for="(link, index) in item.links"
				:key="index"
				:href="link.link ? link.link : null"
				@click="$emit('menuLinkClick', link)"
			>
				<div class="kt-navbar-menu__item" :class="{ active: link.isActive }">
					<i class="yoco" v-text="link.icon" />
					<span
						v-if="!isNarrow"
						v-text="link.title"
						:data-test="`kt-navbar-section-item-${link.title.toLowerCase()}`"
					/>
				</div>
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
	text-align: left;
	box-sizing: border-box;
	padding: 0.4rem 1.2rem;
	color: #fff;
	&:hover {
		cursor: pointer;
	}
	&--narrow {
		padding: 0.4rem 0;
		margin: 0.8rem 0.2rem;
		text-align: center;
	}
	&__section {
		display: block;
		text-transform: uppercase;
		font-size: 0.75em;
		font-weight: 700;
		opacity: 0.64;
		padding: 0.2rem 0;
		margin-top: 0.4rem;
	}
	&__item {
		display: block;
		font-size: 0.75rem;
		padding: 0.6rem 0;
	}
	&__item span {
		margin-left: 0.8rem;
	}
	.yoco {
		font-size: 1rem;
	}
	.active {
		font-weight: 700;
	}
}
</style>
