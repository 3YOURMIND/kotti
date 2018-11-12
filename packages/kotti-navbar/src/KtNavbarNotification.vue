<template>
	<div>
		<div
			:class="objectClass"
			:style="{ color: textColor, 'border-color': borderColor }"
		>
			<div v-if="!isNarrow">
				<i class="navbar-notification__icon yoco" v-text="'bell'" />
				<span class="navbar-notification__label">Notification</span>
			</div>
			<div
				class="navbar-notification__number"
				:style="{ color: textColor, background: borderColor }"
				v-text="number"
			/>
		</div>
		<div
			class="navbar-notification--mobile"
			:style="{ color: textColor, background: borderColor }"
		>
			<i class="yoco" v-if="!number">bell</i> <span v-else v-text="number" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarNotification',
	props: {
		isNarrow: { type: Boolean, default: false },
		textColor: { type: String, default: '#fff' },
		borderColor: { type: String, default: '#dbdbdb' },
		number: { type: Number, default: 0 },
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
