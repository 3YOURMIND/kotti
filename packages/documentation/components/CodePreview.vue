<template>
	<div :class="$style.wrapper">
		<section :class="$style.example">
			<slot />
		</section>
		<div v-if="code" :class="$style.actions">
			<div :class="$style.language" v-text="language" />

			<div :class="$style.copyButton" role="button" @click="onCopy">
				<i class="yoco">copy</i>
			</div>
		</div>
		<div v-if="code" :class="$style.code" v-html="codeHtml" />
	</div>
</template>

<script lang="ts">
import copy from 'copy-to-clipboard'
import dedent from 'dedent'
import { codeToHtml } from 'shiki'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
	name: 'CodePreview',
	props: {
		code: { default: null, type: String },
		language: { required: true, type: String },
	},
	setup(props) {
		const codeHtml = ref<string | null>(null)

		watch(
			() => props.code,
			async (code) => {
				if (code === null) return
				codeHtml.value = await codeToHtml(dedent(code), {
					lang: props.language,
					theme: 'vitesse-light',
				})
			},
			{ immediate: true },
		)

		return {
			codeHtml,
			onCopy: () => {
				copy(props.code)
			},
		}
	},
})
</script>

<style module>
.wrapper {
	border-radius: var(--border-radius);
	border: 1px solid var(--gray-20);
	overflow: hidden;

	margin-bottom: var(--unit-8);
}

.actions,
.code > * {
	padding: var(--unit-3) var(--unit-6);
}

.actions {
	display: flex;
	align-items: center;
	justify-content: space-between;

	border: 1px solid transparent;
	border-top-color: var(--gray-20);
	border-bottom-color: var(--gray-20);

	background-color: var(--gray-10);
}

.code {
	> * {
		background-color: var(--gray-10) !important;
		margin: 0;
	}
}

.copyButton {
	display: flex;
	padding: var(--unit-2);
	margin: calc(-1 * var(--unit-2));
	font-size: 1.2rem;
	cursor: pointer;

	&:hover {
		color: var(--interactive-01);
	}
}

.example {
	padding: var(--unit-6);
}

.language {
	font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
		'Courier New', monospace;
}
</style>
