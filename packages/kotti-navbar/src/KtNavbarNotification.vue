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
					v-if="!number || !isNarrow"
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
				v-show="number"
				class="navbar-notification__number"
				:style="{
					color: themeColor.textColor,
					background: themeColor.borderColor,
				}"
				v-text="number"
			/>
		</div>
		<div
			class="navbar-notification--mobile"
			:style="{
				color: themeColor.textColor,
				background: themeColor.borderColor,
			}"
		>
			<i class="yoco" v-if="!number">bell</i> <span v-else v-text="number" />
		</div>
	</a>
</template>

<script>
export default {
	name: 'KtNavbarNotification',
	props: {
		isNarrow: { type: Boolean, default: false },
		number: { type: Number, default: 0 },
		title: { type: String, default: 'Notificatoin' },
		link: { type: String, default: null },
	},
	inject: {
		themeColor: {
			from: 'theme',
			default: () => {
				return {
					textColor: '#fff',
					borderColor: '#dbdbdb',
				}
			},
		},
	},
	computed: {
		objectClass() {
			return {
				'navbar-notification': true,
				'navbar-notification--narrow': this.isNarrow,
			}
		},
	},
}
</script>
