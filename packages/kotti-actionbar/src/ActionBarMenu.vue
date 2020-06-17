<template>
	<div class="actionbar-nav">
		<!-- FIXME: External Dependencies Should not Be Used without Injection -->
		<router-link
			v-for="(item, index) in menu"
			:key="index"
			class="actionbar-nav__item"
			:class="navItemClass(item)"
			tag="li"
			:to="item.to"
		>
			<i
				class="yoco actionbar-nav__item__icon"
				:class="navItemIconClass"
				v-text="item.icon"
			/>
			<span class="actionbar-nav__item__label" v-text="item.label" />
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'KtActionBarMenu',
	props: {
		menu: { default: () => [], type: Array },
		menuStyle: { default: () => ({}), type: Object },
	},
	computed: {
		navItemIconClass() {
			return {
				[`actionbar-nav__item__icon--${this.menuStyle.iconPosition}`]:
					this.menuStyle.iconPosition ?? false,
			}
		},
	},
	methods: {
		navItemClass(item) {
			return {
				'actionbar-nav__item--active': item.active,
				'actionbar-nav__item--disabled': item.disabled,
			}
		},
	},
}
</script>
