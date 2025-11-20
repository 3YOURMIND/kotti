<template>
	<div :class="[$style.wrapper, $style[`wrapper--is-type-${type}`]]">
		<section v-if="$slots.default" :class="$style.example">
			<slot />
		</section>
		<div v-else style="margin-bottom: -1px" />
		<div v-if="code" :class="$style.actions">
			<div v-if="fileName" :class="$style['file-name']" v-text="fileName" />
			<div :class="$style.language" v-text="language" />
			<div
				v-if="type !== 'default'"
				:class="$style.language"
				v-text="`(${type.toUpperCase()})`"
			/>
			<div :class="$style['copy-button']" role="button" @click="onCopy">
				<i class="yoco">copy</i>
			</div>
		</div>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div v-if="code" :class="$style.code" v-html="codeHtml" />
	</div>
</template>

<script lang="ts">
import copy from 'copy-to-clipboard'
import dedent from 'dedent'
import { codeToHtml } from 'shiki'
import { defineComponent, type PropType, ref, watch } from 'vue'

import { success } from '~/utilities/toaster'

export default defineComponent({
	name: 'CodePreview',
	props: {
		code: { default: null, type: String as PropType<string | null> },
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
				if (props.code === null) return

				copy(props.code)
				success({
					// eslint-disable-next-line no-magic-numbers
					text: `copied “${props.code.slice(0, 40)}...” to clipboard`,
				})
			},
		}
	},
})
</script>

<style module>
.wrapper {
	margin-block: var(--unit-8);
	overflow: hidden;
	border: 1px solid transparent;
	border-radius: var(--border-radius);
}

.wrapper--is-type-default {
	border-color: var(--ui-02);

	.actions {
		background-color: var(--ui-01);
		border-top-color: var(--ui-02);
		border-bottom-color: var(--ui-02);
	}

	.code {
		> * {
			background-color: var(--ui-01) !important;
		}
	}
}

.wrapper--is-type-preview {
	border-color: var(--orange-20);
	border-style: dashed;
	opacity: 0.667;

	.actions {
		background-color: var(--yellow-20);
		border-style: dashed;
		border-top-color: var(--yellow-50);
		border-bottom-color: var(--orange-20);
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
	gap: var(--unit-6);
	align-items: center;
	border: 1px solid transparent;
}

.code {
	> * {
		margin: 0;
		overflow-x: auto;
	}
}

.copy-button {
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

.file-name,
.language {
	font-family:
		SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
		monospace;
}

.file-name {
	font-weight: bold;
}
</style>
