<template>
	<div v-on-clickaway="clickawayMenu" class="user-menus">
		<div
			v-if="isMenuShow"
			class="user-menu"
			:style="{ background: themeColor.backgroundColor }"
			@click="clickawayMenu"
		>
			<slot name="user-menu-items" />
			<div class="user-menu-items">
				<div v-for="(section, index) in sections" :key="index">
					<div
						v-if="section.title"
						class="user-menu__section"
						:style="{ color: themeColor.textColor }"
						v-text="section.title"
					/>
					<a
						v-for="(link, index) in section.links"
						:key="index"
						:href="link.link"
						class="user-menu__item"
						:style="{ color: themeColor.textColor }"
						:data-test="
							`navbar:footer:element:${link.title
								.toLowerCase()
								.split(' ')
								.join('-')}`
						"
						@click="$emit('click', link)"
						v-text="link.title"
					/>
				</div>
			</div>
		</div>
		<div :class="userInfoClass" @click="isMenuShow = !isMenuShow">
			<div class="user-info-avatar">
				<KtAvatar small :src="userAvatar" />
			</div>
			<div v-if="!isNarrow || isMenuShow" class="user-info-text">
				<div
					class="user-info-text__name"
					:style="{ color: themeColor.textColor }"
					v-text="userName"
				/>
				<div
					class="user-info-text__status"
					:style="{ color: themeColor.textColor }"
					v-text="userStatus"
				/>
			</div>
			<div
				v-if="!isNarrow || isMenuShow"
				class="user-info-toggle"
				:style="{ color: themeColor.textColor }"
			>
				<i v-if="isMenuShow" class="yoco">chevron_down</i>
				<i v-else class="yoco">chevron_up</i>
			</div>
		</div>
	</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar'
import { mixin as clickaway } from 'vue-clickaway'

const linkIsValid = (link) => Boolean(link.title)

const sectionIsValid = (section) =>
	Array.isArray(section.links) &&
	Boolean(section.links.length) &&
	section.links.every(linkIsValid)

export default {
	name: 'KtUserMenu',
	components: {
		KtAvatar,
	},
	mixins: [clickaway],
	props: {
		userAvatar: { type: String, default: null },
		sections: {
			type: Array,
			required: true,
			validator: (sections) => sections.every(sectionIsValid),
		},
		userName: { type: String, default: null },
		userStatus: { type: String, required: true },
	},
	inject: {
		KtTheme: {
			default: {
				navbarTextColor: 'rgba(255,255,255,.54)',
				navbarBackgroundColor: '#122C56',
			},
		},
	},
	data() {
		return {
			isMenuShow: false,
		}
	},
	computed: {
		themeColor() {
			return {
				textColor: this.KtTheme.navbarTextColor,
				backgroundColor: this.KtTheme.navbarBackgroundColor,
			}
		},
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
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
	},
}
</script>
