<template>
	<div :class="objectClass">
		<div v-for="(item, index) in menu" :key="index">
			<div
				v-if="item.title"
				v-text="isNarrow ? '' : item.title"
				:style="{ color: themeColor.textColor }"
				class="navbar-menu__section"
			/>
			<a
				v-for="(link, index) in item.links"
				:key="index"
				:href="link.link"
				:style="{
					color: link.isActive ? themeColor.activeColor : themeColor.textColor,
				}"
			>
				<div :class="{ active: link.isActive, 'navbar-menu__item': true }">
					<i class="yoco" v-text="link.icon" />
					<span v-if="!isNarrow" v-text="link.title" />
				</div>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarMenu',
	props: {
		mobileMenuToggle: { type: Boolean, default: false },
		menu: { type: Array, default: null },
		isNarrow: { type: Boolean, default: false },
	},
	inject: {
		themeColor: {
			from: 'KtNavbarTheme',
			default: () => {
				return {
					textColor: 'rgba(255,255,255, 0.8)',
					activeColor: 'rgba(255,255,255, 1)',
				}
			},
		},
	},
	computed: {
		objectClass() {
			return {
				'navbar-menu': true,
				'navbar-menu--narrow': this.isNarrow,
			}
		},
	},
}
</script>
