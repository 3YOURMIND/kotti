<script lang="ts">
import copy from 'copy-to-clipboard'
import isEqual from 'lodash/isEqual.js'
import { codeToHtml } from 'shiki'
import type { PropType } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'

import { KtI18nContext } from '@3yourmind/kotti-ui'

import { success } from '~/utilities/toaster'

type Component = {
	name: string
	props?: Record<
		string,
		| {
				default: undefined
				required: true
				type: PropType<unknown>
		  }
		| {
				default: unknown
				required: false | undefined
				type: PropType<unknown>
		  }
	>
}

type PropFormatter = (value: unknown) => string[]

type Slot = {
	content: string[]
	name: string
	scope?: string
}

type RenderedSlot = {
	content: string[]
	name: string
	renderedString: string
	scope?: string
}

const generateCode = ({
	component,
	propFormatters,
	props,
	slots,
}: {
	component: Component
	propFormatters: Record<string, PropFormatter>
	props: Record<string, unknown>
	slots: Slot[]
}): string =>
	[
		`<${component.name}`,
		...Object.entries(props)
			.filter(([key, value]) => {
				const _defaultValue = component.props?.[key]?.default
				const defaultValue =
					typeof _defaultValue === 'function' ? _defaultValue() : _defaultValue

				return !isEqual(value, defaultValue)
			})
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([key, value]) => {
				if (value === true) return `\t${key}`

				if (!(key in propFormatters))
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					return `\t${typeof value === 'string' ? '' : ':'}${key}="${value}"`

				const lines = propFormatters[key](value)

				if (lines.length < 2) return `\t:${key}="${lines.join('\n')}"`

				const firstLine = lines.at(0) as string
				const lastLine = lines.at(-1) as string
				const otherLines = lines.slice(1, -1)

				return [
					`\t:${key}="${firstLine}`,
					...otherLines.map((line) => `\t${line}`),
					`\t${lastLine}"`,
				].join('\n')
			}),
		slots.length === 0 ? '/>' : `>`,
		...slots.flatMap((slot) => {
			if (slot.name === 'default')
				return slot.content.map((line) => `\t${line}`)

			return [
				// eslint-disable-next-line sonarjs/no-nested-template-literals
				`\t<template #${slot.name}${slot.scope ? `="${slot.scope}"` : ''}>`,
				...slot.content.map((line) => `\t\t${line}`),
				'\t</template>',
			]
		}),
		...(slots.length === 0 ? [] : [`</${component.name}>`]),
	].join('\n')

const NOT_SET = Symbol('NOT_SET')

export default defineComponent({
	name: 'ComponentForm',
	components: {
		KtI18nContext,
	},
	props: {
		component: {
			required: true,
			type: Object as PropType<Component>,
		},
		hiddenProps: {
			default: () => ({}),
			type: Object as PropType<Record<string, unknown>>,
		},
		propFormatters: {
			default: () => ({}),
			type: Object as PropType<Record<string, PropFormatter>>,
		},
		props: {
			default: () => ({}),
			type: Object as PropType<Record<string, unknown>>,
		},
		slots: {
			default: () => [],
			type: Array as PropType<Slot[]>,
		},
		value: {
			default: () => NOT_SET as unknown,
			type: [
				Number,
				String,
				Object,
				Array,
				Symbol,
				Boolean,
				null,
				undefined,
			] as PropType<unknown>,
		},
	},
	setup(props, { slots }) {
		const allSlots = computed(() => {
			const result: RenderedSlot[] = props.slots.map((slot) => ({
				...slot,
				renderedString: slot.content.join('\n'),
			}))

			for (const slotName of Object.keys(slots)) {
				if (slotName === 'component-form-settings') continue

				if (props.slots.some((slot) => slot.name === slotName)) continue

				result.push({
					content: [`\t${slotName} content`],
					name: slotName,
					renderedString: `${slotName} content`,
				})
			}

			return result
		})

		// code handling

		const code = computed(() =>
			generateCode({
				component: props.component,
				propFormatters: props.propFormatters,
				props: props.props,
				slots: allSlots.value,
			}),
		)

		const codeHtml = ref<string | null>(null)
		watch(
			code,
			async (newCode) => {
				codeHtml.value = await codeToHtml(newCode, {
					lang: 'vue-html',
					theme: 'kanagawa-wave',
				})
			},
			{ immediate: true },
		)

		// value code handling

		const valueCodeHtml = ref<string | null>(null)
		watch(
			() => props.value,
			async (_code) => {
				if (_code === NOT_SET) {
					valueCodeHtml.value = null
					return
				}

				const codeStringified = JSON.stringify(_code)

				const code =
					// eslint-disable-next-line no-magic-numbers
					codeStringified.length > 70
						? JSON.stringify(_code, null, '\t')
						: codeStringified

				valueCodeHtml.value = await codeToHtml(`${code} // value`, {
					lang: 'js',
					theme: 'kanagawa-wave',
				})
			},
			{ immediate: true },
		)

		return {
			allSlots,
			codeHtml,
			hasValue: computed(() => props.value !== NOT_SET),
			onCopy: () => {
				copy(code.value)
				success({
					// eslint-disable-next-line no-magic-numbers
					text: `copied “${code.value.slice(0, 40)}...” to clipboard`,
				})
			},
			valueCodeHtml,
		}
	},
})
</script>

<template>
	<section :class="$style.wrapper">
		<div :class="$style.preview">
			<component :is="component" v-bind="{ ...props, ...hiddenProps }">
				<template v-for="slot in allSlots" #[slot.name]="bound">
					<component
						:is="$slots[slot.name]"
						v-if="$slots[slot.name]"
						:key="slot.name"
						v-bind="bound"
					/>
					<div v-else :key="`${slot.name}-else`" v-text="slot.renderedString" />
				</template>
			</component>
		</div>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div v-if="hasValue" :class="$style.value" v-html="valueCodeHtml" />
		<div :class="$style.settings">
			<slot name="component-form-settings" />
		</div>
		<div :class="$style.actions">
			<div :class="$style.language" v-text="'vue-html'" />
			<div :class="$style['copy-button']" role="button" @click="onCopy">
				<i class="yoco">copy</i>
			</div>
		</div>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div :class="$style.code" v-html="codeHtml" />
	</section>
</template>

<style lang="scss" module>
@import '@3yourmind/kotti-ui/dist/variables.scss';

.code,
.value {
	> * {
		padding: var(--unit-3) var(--unit-6);
		margin: 0;
		background-color: var(--ui-background) !important;
	}
}

.actions {
	display: flex;
	gap: var(--unit-6);
	align-items: center;
	padding: var(--unit-3) var(--unit-6);
	background-color: var(--ui-background);
}

.wrapper {
	margin-bottom: var(--unit-8);
	overflow: hidden;
	border: 1px solid var(--ui-03);
	border-radius: var(--border-radius);

	> *:not(:last-child) {
		border-bottom: 1px solid var(--ui-03);
	}
}

.preview {
	padding: var(--unit-3) var(--unit-6);
}

.settings {
	display: flex;
	background-color: var(--ui-background);

	> * {
		flex: 1;
		flex-basis: 0;
		padding: var(--unit-3) var(--unit-6);
	}

	@media (width < $size-md) {
		flex-direction: column;

		> *:not(:last-child) {
			border-bottom: 1px solid var(--ui-03);
		}
	}

	@media (width >= $size-md) {
		flex-direction: row;

		> *:not(:last-child) {
			border-right: 1px solid var(--ui-03);
		}
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

.language {
	font-family:
		SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
		monospace;
}
</style>
