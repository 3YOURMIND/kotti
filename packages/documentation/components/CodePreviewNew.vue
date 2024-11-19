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
				v-if="type !== 'default'"
				:class="$style.language"
				v-text="`(${type.toUpperCase()})`"
			/>
			<div :class="$style.copyButton" role="button" @click="onCopy">
				<i class="yoco">copy</i>
			</div>
		</div>
		<div v-if="code" :class="$style.code">
			<pre v-text="dedentedCode" />
		</div>
	</div>
</template>

<script lang="ts">
import copy from 'copy-to-clipboard'
import dedent from 'ts-dedent'
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'

import { error, success } from '~/utilities/toaster'

/**
 * Port of an equivalent component from 'vue3/upgrade'. Used to document the new kt-toaster
 * TODO: remove in vue3
 */
export default defineComponent({
	name: 'CodePreviewNew',
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
		const dedentedCode = computed(() =>
			dedent(props.code ?? '')
				.split('\n')
				.map((line) => line.replace('//--', ''))
				.join('\n'),
		)
		return {
			dedentedCode,
			onCopy: () => {
				const wasSuccessful = copy(dedentedCode.value)

				if (wasSuccessful)
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore nuxt typescript does not like this for some reason
					success({
						// eslint-disable-next-line no-magic-numbers
						text: `copied “${dedentedCode.value.slice(0, 40)}...” to clipboard`,
					})
				else
					error({
						text: 'There was a failure when copying to clipboard',
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
	border-color: var(--gray-20);

	.actions {
		background-color: var(--gray-10);
		border-top-color: var(--gray-20);
		border-bottom-color: var(--gray-20);
	}

	.code > * {
		background-color: var(--gray-10) !important;
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

	.code > * {
		background-color: var(--yellow-20) !important;
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
	pre {
		tab-size: 3;
	}

	> * {
		margin: 0;
		overflow-x: auto;
	}
}

/* stylelint-disable selector-class-pattern */
.copyButton {
	display: flex;
	padding: var(--unit-2);
	margin: calc(-1 * var(--unit-2));
	margin-left: auto; /* push to end of flexbox */
	font-size: 1.2rem;
	user-select: none;

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
/* stylelint-enable selector-class-pattern */
</style>
