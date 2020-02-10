<template>
	<div :class="bannerClass">
		<div class="collapse">
			<div class="glyph">
				<span v-if="icon">
					<i class="yoco" v-text="icon" />
				</span>
				<span v-else>
					<slot name="glyph">
						<i class="yoco">announce</i>
					</slot>
				</span>
			</div>
			<div class="message" v-text="message" />
			<div v-if="!expandable" class="action" @click="handleClick">
				<button v-if="actionText.length" class="text" v-text="actionText" />
			</div>
			<div v-else class="action" @click="isExpand = !isExpand">
				<button v-if="!isExpand" class="text" v-text="switchText" />
				<button v-else class="text" v-text="switchCloseText" />
			</div>
		</div>
		<div v-if="isExpand" class="expand">
			<slot name="expand" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtBanner',
	props: {
		isGrey: {
			type: Boolean,
			default: false,
		},
		message: String,
		icon: {
			type: String,
			default: '',
		},
		actionText: {
			type: String,
			default: '',
		},
		switchText: {
			type: String,
			default: 'View',
		},
		switchCloseText: {
			type: String,
			default: 'Close',
		},
	},
	data() {
		return {
			isExpand: false,
		}
	},
	computed: {
		bannerClass() {
			return {
				'banner': true,
				'banner-grey': this.isGrey,
			}
		},
		expandable() {
			return Boolean(this.$slots.expand)
		},
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt)
		},
	},
}
</script>
