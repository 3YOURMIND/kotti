<template>
	<div class="user-menus" v-on-clickaway = "clickawayMenu">
		<div class="user-menu" v-if="isMenuShow" @click="clickawayMenu">
			<slot name="user-menu-items"></slot>
		</div>
		<div :class="userInfoClass" @click="isMenuShow=!isMenuShow">
			<div class="user-info-avatar">
				<KtAvatar small :src="userAvatarSrc"/>
			</div>
			<div class="user-info-text" v-if="!isNarrow || isMenuShow">
				<div class="user-info-text__name" v-text="userName" />
				<div class="user-info-text__status" v-text="userStatus" />
			</div>
			<div class="user-info-toggle" v-if="!isNarrow || isMenuShow">
				<i class="yoco" v-if="isMenuShow">chevron_down</i>
				<i class="yoco" v-else>chevron_up</i>
			</div>
		</div>

	</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar'
import { mixin as clickaway } from '../../mixin/vue-clickaway'

export default {
	name: 'KtUserMenu',
	props: {
		userAvatarSrc: { type: String, default: '' },
		userName: { type: String, default: '--/--' },
		userStatus: { type: String, default: '--/--' },
	},
	components: {
		KtAvatar,
	},
	mixins: [clickaway],
	created() {
		this.$parent.$on('toggleKtNavbarNarrowEvent', this.setNarrowValue)
	},
	data() {
		return {
			isMenuShow: false,
			isNarrow: false,
		}
	},
	computed: {
		userInfoClass() {
			return [
				'user-info',
				{ 'user-info--narrow': this.isNarrow },
				{ 'user-info--narrow-wide': this.isNarrow && this.isMenuShow },
			]
		},
	},
	methods: {
		setNarrowValue(value) {
			this.isNarrow = value
		},
		clickawayMenu() {
			this.isMenuShow = false
		},
	},
}
</script>
