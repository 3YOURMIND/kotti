<template>
	<div :class="objectClass">
		<div v-for="(item, index) in sections" :key="index">
			<div
				v-if="item.title"
				v-text="isNarrow ? '' : item.title"
				class="navbar-menu__section"
			/>
			<a
				v-for="(link, index) in item.links"
				:key="index"
				:href="link.link ? link.link : null"
				@click="$emit('menuLinkClick', link)"
			>
				<div :class="{ active: link.isActive, 'navbar-menu__item': true }">
					<i class="yoco" v-text="link.icon" />
					<span
						v-if="!isNarrow"
						v-text="link.title"
						:data-test="`navbar-section-item-${link.title.toLowerCase()}`"
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
		objectClass() {
			return {
				'navbar-menu': true,
				'navbar-menu--narrow': this.isNarrow,
			}
		},
	},
}
</script>
