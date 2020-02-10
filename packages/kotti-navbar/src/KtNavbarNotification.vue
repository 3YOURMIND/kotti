<template>
	<a :href="link">
		<div
			:class="objectClass"
			:style="{
				'color': themeColor.textColor,
				'border-color': themeColor.borderColor,
			}"
		>
			<div>
				<i
					v-if="!count || !isNarrow"
					class="navbar-notification__icon yoco"
					v-text="'bell'"
				/>
				<span
					v-show="!isNarrow"
					class="navbar-notification__label"
					v-text="title"
				/>
			</div>
			<div
				v-show="count"
				class="navbar-notification__number"
				:style="{
					color: themeColor.textColor,
					background: themeColor.borderColor,
				}"
				v-text="count"
			/>
		</div>
		<div
			class="navbar-notification--mobile"
			:style="{
				color: themeColor.textColor,
				background: themeColor.borderColor,
			}"
		>
			<i v-if="!count" class="yoco">bell</i> <span v-else v-text="count" />
		</div>
	</a>
</template>

<script>
import color from 'color'

export default {
	name: 'KtNavbarNotification',
	props: {
		count: { type: Number, default: 0 },
		link: { type: String, default: null },
		title: { type: String, default: 'Notification' },
	},
	inject: {
		KtTheme: {
			default: {
				navbarTextColor: 'rgba(255,255,255,.54)',
				navbarBackgroundColor: '#122C56',
			},
		},
	},
	computed: {
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
		themeColor() {
			return {
				textColor: this.KtTheme.navbarTextColor,
				borderColor: color(this.KtTheme.navbarBackgroundColor).isDark()
					? 'rgba(255,255,255,0.24)'
					: 'rgba(0,0,0,0.24)',
			}
		},
		objectClass() {
			return {
				'navbar-notification': true,
				'navbar-notification--narrow': this.isNarrow,
			}
		},
	},
}
</script>
