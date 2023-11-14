<template>
	<div class="icon-container" @click="copyLiga(icon)">
		<div class="yoco-flex">
			<div class="yoco-container">
				<i ref="liga" class="yoco size-1" v-text="icon" />
			</div>
			<div class="yoco-container">
				<i ref="liga" class="yoco size-2" v-text="icon" />
			</div>
			<div class="yoco-container">
				<i ref="liga" class="yoco size-3" v-text="icon" />
			</div>
		</div>
		<div class="copy copy-nohover">
			<div class="icon-liga" v-text="icon" />
			<div class="icon-enum" v-text="enumRepresentation" />
		</div>
		<div class="copy copy-hover">
			<div>Click to Copy</div>
		</div>
		<div
			v-if="copySuccess"
			class="success-message"
			v-text="copyIconSuccessMessage"
		/>
	</div>
</template>

<script>
import { TimeConversion } from '@metatypes/units'

export default {
	name: 'YocoPreview',
	props: {
		enum: { required: true, type: String },
		icon: { required: true, type: String },
	},
	data() {
		return {
			copySuccess: false,
		}
	},
	computed: {
		copyIconSuccessMessage() {
			return `Copied icon "${this.icon}"`
		},
		enumRepresentation() {
			return `Yoco.Icon.${this.enum}`
		},
	},
	methods: {
		copyLiga(string) {
			const codeString = `<i class="yoco">${string}</i>`
			this.$copyText(codeString).then(
				() => {
					this.copySuccess = true
					setTimeout(() => {
						this.copySuccess = false
					}, 2 * TimeConversion.MILLISECONDS_PER_SECOND)
				},
				() => {
					alert('failed')
				},
			)
		},
	},
}
</script>

<style lang="scss" scoped>
.copy {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 45px;
	font-size: 0.875em;
	line-height: 2em;
}

.icon-container {
	box-sizing: border-box;
	float: left;
	padding: 24px 0;
	text-align: center;

	.size-1,
	.size-3 {
		opacity: 0;
	}

	.copy-hover {
		display: none;
	}

	.copy-nohover {
		display: block;
	}
}

.icon-container:hover {
	box-sizing: border-box;
	cursor: pointer;
	background: #f8f8f8;
	box-shadow: 0 2px 2px #ddd;

	.size-1,
	.size-3 {
		opacity: 1;
	}

	.copy-hover {
		display: block;
	}

	.copy-nohover {
		display: none;
	}
}

.icon-liga {
	font-weight: bold;
	line-height: 2em;
}

.icon-enum {
	font-size: 0.6em;
	line-height: 2em;
	color: #ccc;
}

.yoco-flex {
	display: flex;
	align-items: center;
	justify-content: center;
}

.yoco-container {
	display: flex;
	align-items: flex-end;
	justify-content: center;
	width: 32px;
	height: 32px;
}

.yoco {
	&.size-1 {
		font-size: 16px !important;
	}

	&.size-2 {
		font-size: 24px !important;
	}

	&.size-3 {
		font-size: 32px !important;
	}
}
</style>
