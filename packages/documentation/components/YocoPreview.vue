<template>
	<div class="icon-container" @click="copyLiga(icon)">
		<div class="yoco-flex">
			<div class="yoco-container">
				<i class="yoco size-1" v-text="icon" />
			</div>
			<div class="yoco-container">
				<i class="yoco size-2" v-text="icon" />
			</div>
			<div class="yoco-container">
				<i class="yoco size-3" v-text="icon" />
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

<script lang="ts">
import { TimeConversion } from '@metatypes/units'
import copy from 'copy-to-clipboard'
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'

import type { Yoco } from '@3yourmind/yoco'

export default defineComponent({
	name: 'YocoPreview',
	props: {
		enum: { required: true, type: String },
		icon: { required: true, type: String as PropType<Yoco.Icon> },
	},
	setup(props) {
		const copySuccess = ref(false)

		return {
			copyIconSuccessMessage: computed(() => `Copied icon "${props.icon}"`),
			copyLiga: (yocoName: string) => {
				const codeString = `<i class="yoco">${yocoName}</i>`
				const wasSuccessful = copy(codeString)

				if (wasSuccessful) {
					copySuccess.value = true
					window.setTimeout(() => {
						copySuccess.value = false
					}, 2 * TimeConversion.MILLISECONDS_PER_SECOND)
				} else {
					// eslint-disable-next-line no-alert
					window.alert('failed')
				}
			},
			copySuccess,
			enumRepresentation: computed(() => `Yoco.Icon.${props.enum}`),
		}
	},
})
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
