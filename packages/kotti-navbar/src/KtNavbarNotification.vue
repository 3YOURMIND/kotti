<template>
	<a :href="link">
		<div
			:class="objectClass"
			:style="{
				color: themeColor.textColor,
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
			<i class="yoco" v-if="!count">bell</i> <span v-else v-text="count" />
		</div>
	</a>
</template>

<script>
export default {
	name: 'KtNavbarNotification',
	props: {
		count: { type: Number, default: 0 },
		link: { type: String, default: null },
		title: { type: String, default: 'Notification' },
	},
	inject: {
		themeColor: {
			from: 'KtNavbarTheme',
			default: () => {
				return {
					borderColor: '#dbdbdb',
					textColor: '#fff',
				}
			},
		},
	},
	computed: {
		isNarrow() {
			return this.$KtNavbar.isNarrow
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
