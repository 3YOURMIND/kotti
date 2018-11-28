<template>
	<div class="user-menus" v-on-clickaway="clickawayMenu">
		<div
			class="user-menu"
			v-if="isMenuShow"
			@click="clickawayMenu"
			:style="{ background: themeColor.backgroundColor }"
		>
			<slot name="user-menu-items" />
			<div class="user-menu-items">
				<div v-for="(section, index) in sections" :key="index">
					<div
						v-if="section.title"
						class="user-menu__section"
						v-text="section.title"
						:style="{ color: themeColor.textColor }"
					/>
					<a
						v-for="(link, index) in section.links"
						:href="link.link"
						:key="index"
						@click="$emit('KtUserMenuLinkClicked', link)"
						class="user-menu__item"
						v-text="link.title"
						:style="{ color: themeColor.textColor }"
					/>
				</div>
			</div>
		</div>
		<div :class="userInfoClass" @click="isMenuShow = !isMenuShow">
			<div class="user-info-avatar"><KtAvatar small :src="userAvatar" /></div>
			<div class="user-info-text" v-if="!isNarrow || isMenuShow">
				<div
					class="user-info-text__name"
					v-text="userName"
					:style="{ color: themeColor.textColor }"
				/>
				<div
					class="user-info-text__status"
					v-text="userStatus"
					:style="{ color: themeColor.textColor }"
				/>
			</div>
			<div
				class="user-info-toggle"
				v-if="!isNarrow || isMenuShow"
				:style="{ color: themeColor.textColor }"
			>
				<i class="yoco" v-if="isMenuShow">chevron_down</i>
				<i class="yoco" v-else>chevron_up</i>
			</div>
		</div>
	</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar'
import { mixin as clickaway } from '../../../src/mixin/vue-clickaway'

const linkIsValid = link => Boolean(link.title)

const sectionIsValid = section =>
	Array.isArray(section.links) &&
	Boolean(section.links.length) &&
	section.links.every(linkIsValid)

export default {
	name: 'KtUserMenu',
	props: {
		userAvatar: { type: String, default: null },
		sections: {
			type: Array,
			required: true,
			validator: sections => sections.every(sectionIsValid),
		},
		userName: { types: [String, null], required: true },
		userStatus: { type: String, required: true },
	},
	components: {
		KtAvatar,
	},
	mixins: [clickaway],
	inject: {
		themeColor: {
			from: 'KtNavbarTheme',
			default: () => {
				return {
					textColor: '#fff',
					background: '#122C56',
				}
			},
		},
	},
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
		setNarrowValue(value) {
			this.isNarrow = value
		},
	},
	created() {
		this.$parent.$on('toggleKtNavbarNarrowEvent', this.setNarrowValue)
	},
}
</script>
