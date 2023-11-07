<template>
	<div class="kt-actionbar-nav">
		<!-- FIXME: External Dependencies Should not Be Used without Injection -->
		<router-link
			v-for="(item, index) in menu"
			:key="index"
			class="kt-actionbar-nav__item"
			:class="navItemClass(item)"
			tag="li"
			:to="item.to"
		>
			<i
				class="yoco kt-actionbar-nav__icon"
				:class="navItemIconClass"
				v-text="item.icon"
			/>
			<span class="kt-actionbar-nav__label" v-text="item.label" />
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'ActionbarMenu',
	props: {
		menu: { default: () => [], type: Array },
		menuStyle: { default: () => ({}), type: Object },
	},
	computed: {
		navItemIconClass() {
			return {
				[`kt-actionbar-nav__icon--${this.menuStyle.iconPosition}`]:
					this.menuStyle.iconPosition ?? false,
			}
		},
	},
	methods: {
		navItemClass(item) {
			return {
				'kt-actionbar-nav__item--active': item.active,
				'kt-actionbar-nav__item--disabled': item.disabled,
			}
		},
	},
}
</script>
