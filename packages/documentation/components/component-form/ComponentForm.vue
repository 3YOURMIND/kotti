<script lang="ts">
import copy from 'copy-to-clipboard'
import { codeToHtml } from 'shiki'
import isEqual from 'lodash/isEqual.js'
import type { PropType } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { KtI18nContext } from '@3yourmind/kotti-ui'

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
				default: unknown | (() => unknown)
				required: undefined | false
				type: PropType<unknown>
		  }
	>
}

type PropFormatter = (value: unknown) => string[]

type Slot = {
	content: string
	name: string
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
					return `\t${typeof value === 'string' ? '' : ':'}${key}="${value}"`

				const lines = propFormatters[key](value)

				if (lines.length < 2) return `\t:${key}="${lines.join('\n')}"`

				const firstLine = lines.at(0)
				const lastLine = lines.at(-1)
				const otherLines = lines.slice(1, -1)

				return [
					`\t:${key}="${firstLine}`,
					...otherLines.map((line) => `\t${line}`),
					`\t${lastLine}"`,
				].join('\n')
			}),
		`>`,
		...slots.flatMap((slot) => {
			if (slot.name === 'default') return [`\t${slot.content}`]

			return [
				`\t<template #${slot.name}>`,
				`\t\t${slot.content}`,
				'\t</template>',
			]
		}),
		`</${component.name}>`,
	].join('\n')

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
	},
	setup(props, { slots }) {
		const allSlots = computed(() => {
			const result: Slot[] = [...props.slots]

			for (const slotName of Object.keys(slots)) {
				if (slotName === 'component-form-settings') continue

				if (props.slots.some((slot) => slot.name === slotName)) continue

				result.push({ name: slotName, content: `${slotName} content` })
			}

			return result
		})

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
					theme: 'vitesse-light',
				})
			},
			{ immediate: true },
		)

		return {
			allSlots,
			codeHtml,
			onCopy: () => {
				copy(code.value)
			},
		}
	},
})
</script>

<template>
	<section :class="$style.wrapper">
		<div :class="$style.preview">
			<component :is="component" v-bind="{ ...props, ...hiddenProps }">
				<template v-for="slot in allSlots" #[slot.name] :key="slot.name">
					<component :is="$slots[slot.name]" v-if="$slots[slot.name]" />
					<div v-else v-text="slot.content" />
				</template>
			</component>
		</div>
		<div :class="$style.settings">
			<slot name="component-form-settings" />
		</div>
		<div :class="$style.actions">
			<div :class="$style.language" v-text="'vue-html'" />
			<div :class="$style.copyButton" role="button" @click="onCopy">
				<i class="yoco">copy</i>
			</div>
		</div>
		<div :class="$style.code" v-html="codeHtml" />
	</section>
</template>

<style lang="scss" module>
.code {
	> * {
		padding: var(--unit-3) var(--unit-6);
		margin: 0;

		background-color: var(--gray-10) !important;
	}
}

.actions {
	display: flex;
	align-items: center;

	gap: var(--unit-6);

	border: 1px solid transparent;
	border-bottom-color: var(--gray-20);
	background-color: var(--gray-10);
	padding: var(--unit-3) var(--unit-6);
}

.wrapper {
	border-radius: var(--border-radius);
	border: 1px solid transparent;
	overflow: hidden;

	margin-bottom: var(--unit-8);

	border-color: var(--gray-20);
}

.preview {
	padding: var(--unit-3) var(--unit-6);
	border-bottom: 1px solid var(--gray-20);
	/* background-color: var(--gray-10); */
}

.settings {
	display: flex;
	border-bottom: 1px solid var(--gray-20);
	background-color: #fcfcfc;

	> div {
		padding: var(--unit-3) var(--unit-6);
		flex: 1;
		flex-basis: 0;

		&:not(:last-child) {
			border-right: 1px solid var(--gray-20);
		}
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

.language {
	font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
		'Courier New', monospace;
}
</style>
