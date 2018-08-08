<template>
	<div class="user-menus" v-on-clickaway = "clickawayMenu">
		<div class="user-menu" v-if="isMenuShow" @click="clickawayMenu">
			<slot name="user-menu-items"/>
			<div class="user-menu-items">
				<div v-for="(item, index) in userMenuItems" :key="index">
					<div
						v-if="item.sectionTitle"
						class="user-menu__section"
						v-text="item.sectionTitle"
					/>
					<a
						v-for="(link, index) in item.links"
						:href="link.link"
						:key="index"
						@click="handleLinkClicked(link)"
						class="user-menu__item"
						v-text="link.title"
					/>
				</div>
			</div>
		</div>
		<div :class="userInfoClass" @click="isMenuShow=!isMenuShow">
			<div class="user-info-avatar">
				<KtAvatar small :src="userAvatar"/>
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
		userAvatar: { type: String, default: null },
		userName: { type: String, required: true },
		userStatus: { type: String, required: true },
		userMenuItems: { type: Object, required: true },
	},
	components: {
		KtAvatar,
	},
	mixins: [clickaway],
	data() {
		return {
			isMenuShow: false,
			isNarrow: false,
		}
	},
	computed: {
		userInfoClass() {
			return {
				'user-info': true,
				'user-info--narrow': this.isNarrow,
				'user-info--narrow-wide': this.isNarrow && this.isMenuShow,
			}
		},
	},
	methods: {
		clickawayMenu() {
			this.isMenuShow = false
		},
		handleLinkClicked(item) {
			this.$emit('userMenuLinkClicked', item)
		},
		setNarrowValue(value) {
			this.isNarrow = value
		},
	},
	created() {
		this.$parent.$on('toggleKtNavbarNarrowEvent', this.setNarrowValue)
	},
}
</script>
