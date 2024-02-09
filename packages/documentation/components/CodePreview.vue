<template>
	<div class="code-preview">
		<div
			class="code-preview__switcher"
			@click="showCode = !showCode"
			v-text="switcherLabel"
		/>
		<slot v-if="showCode" name="vue" />
		<slot v-else name="style" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'CodePreview',
	props: {
		vueSlotLabel: { default: 'Kotti-UI', type: String },
		styleSlotLabel: { default: 'Kotti-Style', type: String },
	},
	setup(props) {
		const showCode = ref(true)

		return {
			showCode,
			switcherLabel: computed<string>(() =>
				showCode.value ? props.vueSlotLabel : props.styleSlotLabel,
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.code-preview {
	position: relative;
	display: inline-block;
	width: 100%;
	padding-top: var(--unit-2);

	&__switcher {
		width: fit-content;
		padding: var(--unit-1) var(--unit-2);
		margin-bottom: var(--unit-3);
		font-size: 12px;
		color: var(--white);
		background: rgb(0 0 0 / 40%);

		&:hover {
			cursor: pointer;
			background: rgb(44 100 204 / 60%);
		}
	}
}
</style>
