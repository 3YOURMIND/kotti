<template>
	<div class="actionbar-nav">
		<router-link
			v-for="(item, index) in menu"
			:key="index"
			tag="li"
			:to="item.to"
			:class="navItemClass(item)"
		>
			<i :class="navItemIconClass" v-text="item.icon" />
			<span class="actionbar-nav__item__label" v-text="item.label" />
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'KtActionBarMenu',
	props: {
		menu: { type: Array, default: null },
		menuStyle: { default: null },
	},
	computed: {
		navItemIconClass() {
			return [
				'yoco actionbar-nav__item__icon',
				`actionbar-nav__item__icon--${this.menuStyle.iconPosition}`,
			]
		},
	},
	methods: {
		navItemClass(item) {
			return {
				'actionbar-nav__item': true,
				'actionbar-nav__item--active': item.active,
				'actionbar-nav__item--disabled': item.disabled,
			}
		},
	},
}
</script>
