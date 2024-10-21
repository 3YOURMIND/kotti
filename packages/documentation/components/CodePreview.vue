<template>
	<div :class="[$style.wrapper, $style[`wrapper--is-type-${type}`]]">
		<section v-if="$slots.default" :class="$style.example">
			<slot />
		</section>
		<div v-else style="margin-bottom: -1px" />
		<div v-if="code" :class="$style.actions">
			<div v-if="fileName" :class="$style.fileName" v-text="fileName" />
			<div :class="$style.language" v-text="language" />
			<div
				:class="$style.language"
				v-if="type !== 'default'"
				v-text="`(${type.toUpperCase()})`"
			/>
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
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
	name: 'CodePreview',
	props: {
		code: { default: null, type: String },
		fileName: { default: null, type: String },
		language: { required: true, type: String },
		type: {
			default: 'default',
			type: String as PropType<'default' | 'preview'>,
		},
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
				// success({
				// 	text: `copied “${props.code.substring(0, 40)}...” to clipboard`,
				// })
			},
		}
	},
})
</script>

<style module>
.wrapper {
	border-radius: var(--border-radius);
	border: 1px solid transparent;
	overflow: hidden;

	margin-block: var(--unit-8);
}

.wrapper--is-type-default {
	border-color: var(--gray-20);

	.actions {
		border-top-color: var(--gray-20);
		border-bottom-color: var(--gray-20);
		background-color: var(--gray-10);
	}

	.code {
		> * {
			background-color: var(--gray-10) !important;
		}
	}
}

.wrapper--is-type-preview {
	border-color: var(--orange-20);
	opacity: 0.667;
	border-style: dashed;

	.actions {
		border-style: dashed;
		border-top-color: var(--yellow-50);
		border-bottom-color: var(--orange-20);
		background-color: var(--yellow-20);
	}

	.code {
		> * {
			background-color: var(--yellow-20) !important;
		}
	}
}

.actions,
.code > * {
	padding: var(--unit-3) var(--unit-6);
}

.actions {
	display: flex;
	align-items: center;

	gap: var(--unit-6);

	border: 1px solid transparent;
}

.code {
	> * {
		overflow-x: auto;
		margin: 0;
	}
}

.copyButton {
	display: flex;
	padding: var(--unit-2);
	margin: calc(-1 * var(--unit-2));
	margin-left: auto; /* push to end of flexbox */
	font-size: 1.2rem;
	cursor: pointer;

	&:hover {
		color: var(--interactive-01);
	}
}

.example {
	padding: var(--unit-6);
}

.fileName,
.language {
	font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
		'Courier New', monospace;
}

.fileName {
	font-weight: bold;
}
</style>
