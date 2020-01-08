<template>
	<div :class="objectClass">
		<div v-for="(item, index) in sections" :key="index">
			<div
				v-if="item.title"
				v-text="isNarrow ? '' : item.title"
				:style="{ color: themeColor.textColor }"
				class="navbar-menu__section"
			/>
			<a
				v-for="(link, index) in item.links"
				:key="index"
				:href="link.link ? link.link : null"
				:style="{
					color: link.isActive ? themeColor.activeColor : themeColor.textColor,
				}"
				@click="$emit('menuLinkClick', link)"
			>
				<div :class="{ active: link.isActive, 'navbar-menu__item': true }">
					<i class="yoco" v-text="link.icon" />
					<span
						v-if="!isNarrow"
						v-text="link.title"
						:data-test="`up__navbar-menu-item-${link.title.toLowerCase()}`"
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
	inject: {
		KtTheme: {
			default: {
				navbarTextColor: 'rgba(255,255,255,.54)',
				navbarTextActiveColor: 'rgba(255,255,255,1)',
			},
		},
	},
	computed: {
		themeColor() {
			return {
				activeColor: this.KtTheme.navbarTextActiveColor,
				textColor: this.KtTheme.navbarTextColor,
			}
		},
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
