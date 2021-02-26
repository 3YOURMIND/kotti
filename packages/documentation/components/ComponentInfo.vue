<template>
	<div class="component-info-container">
		<div
			class="component-info"
			:class="{
				'component-info--is-deprecated': component.meta.deprecated !== null,
			}"
		>
			<h1 class="component-info__title" v-text="component.name" />
			<div
				v-for="(label, index) in labels"
				:key="index"
				class="component-info__label"
				:style="`--background-color: ${label.backgroundColor}; --color: ${label.color}`"
			>
				<div class="component-info__label__left" v-text="label.left" />
				<a
					v-if="label.link"
					class="component-info__label__right"
					:href="label.link"
					v-text="label.right"
				/>
				<div v-else class="component-info__label__right" v-text="label.right" />
			</div>
		</div>
		<article v-if="component.meta.deprecated !== null" class="danger-block">
			<section>
				This component is deprecated and will be removed in Kotti
				<strong v-text="`v${component.meta.deprecated.version}`" />
			</section>
			<section>
				<div>
					<strong>Reason</strong>: {{ component.meta.deprecated.reason }}
				</div>
				<div>
					<strong
						v-text="
							component.meta.deprecated.alternatives.length < 2
								? 'Alternative'
								: 'Alternatives'
						"
					/>:
					<code
						v-for="alternative in component.meta.deprecated.alternatives"
						:key="alternative"
						v-text="alternative"
					/>
					<span
						v-if="component.meta.deprecated.alternatives.length === 0"
						v-text="Dashes.EmDash"
					/>
				</div>
			</section>
		</article>
		<ComponentInfoSlots :slots="component.meta.slots" />
		<KtHeading
			v-if="component.props"
			text="Properties (Beta)"
			:toggleStatus="showProps"
			toggleCloseText="Hide"
			toggleText="Show"
			type="toggle"
			@toggle="showProps = !showProps"
		>
			<table>
				<thead>
					<th>Name</th>
					<th>Type</th>
					<th>Default</th>
					<th>Validator</th>
				</thead>
				<tbody>
					<tr
						v-for="[name, prop] in Object.entries(
							component.props,
						).sort(([a], [b]) => a.localeCompare(b))"
						:key="name"
					>
						<td><code v-text="name" /></td>
						<td>
							<code v-text="stringifyType(prop.type)" />
						</td>
						<td>
							<code
								v-if="prop.required"
								style="font-style: italic;"
								v-text="'required'"
							/>
							<code
								v-else-if="prop.default === undefined"
								style="font-style: italic;"
								v-text="'No default'"
							/>
							<code v-else v-text="stringifyDefault(prop.default)" />
						</td>
						<td>
							<div style="display: flex; align-items: center;">
								<i
									class="yoco"
									:style="{
										color: prop.validator ? 'var(--green-50)' : 'var(--red-50)',
									}"
									:title="
										prop.validator ? prop.validator.toString() : undefined
									"
									v-text="prop.validator ? Yoco.Icon.CHECK : Yoco.Icon.CLOSE"
								/>
								<div v-if="prop.validator" v-text="prop.validator.name" />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</KtHeading>
	</div>
</template>

<script lang="ts">
import { Kotti } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { Dashes } from '@metatypes/typography'
import { computed, defineComponent, ref } from '@vue/composition-api'

import ComponentInfoSlots from './component-info/Slots.vue'

type VuePropType =
	| ArrayConstructor
	| BooleanConstructor
	| FunctionConstructor
	| NumberConstructor
	| StringConstructor

export default defineComponent<{
	component: { meta: Kotti.Meta; name: string }
}>({
	props: {
		component: { required: true, type: Object },
	},
	components: {
		ComponentInfoSlots,
	},
	setup(props) {
		return {
			Dashes,
			labels: computed(() => {
				const result: Array<{
					backgroundColor: string
					color: string
					left: string
					link?: string
					right: string
				}> = []

				const { addedVersion, deprecated, typeScript } = props.component.meta

				if (deprecated !== null)
					result.push({
						backgroundColor: 'var(--red-20)',
						color: 'var(--red-70)',
						left: 'Deprecated for',
						right: `v${deprecated.version}`,
					})

				if (typeScript)
					result.push({
						backgroundColor: 'var(--primary-20)',
						color: 'var(--primary-70)',
						left: 'TS',
						right: typeScript.namespace,
					})

				result.push({
					backgroundColor: 'var(--green-20)',
					color: 'var(--green-70)',
					left: 'Added',
					...(addedVersion === null
						? {
								right: 'unknown',
						  }
						: {
								link: `https://github.com/3YOURMIND/kotti/releases/tag/v${addedVersion}`,
								right: `v${addedVersion}`,
						  }),
				})

				return result
			}),
			showProps: ref(false),
			stringifyDefault: (defaultValue: Function | unknown) =>
				typeof defaultValue === 'function'
					? `${JSON.stringify(defaultValue())} *`
					: JSON.stringify(defaultValue),
			stringifyType: (type: Array<VuePropType> | VuePropType) =>
				Array.isArray(type)
					? type.map((t) => t.name.toLowerCase()).join(' | ')
					: type.name.toLowerCase(),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '@3yourmind/kotti-ui/dist/variables.scss';

$radius: 3px;

.component-info {
	display: flex;

	@media (max-width: #{$size-lg - 1px}) {
		flex-direction: column;
		align-items: flex-start;

		> *:not(:first-child) {
			margin-top: 5px;
		}
	}

	@media (min-width: $size-lg) {
		flex-direction: row;
		align-items: center;

		> *:not(:first-child) {
			margin-left: 20px;
		}
	}

	> * {
		display: flex;
		margin: 0;
	}

	&__label {
		overflow: hidden;
		border: 1px solid var(--color);
		border-radius: $radius;

		&__left,
		&__right {
			padding: 2px 8px;
		}

		a.component-info__label__right {
			&:hover {
				text-decoration: underline;
			}
		}

		&__left {
			font-weight: bold;
			color: var(--color);
			background-color: var(--background-color);
			border-right: 1px solid var(--color);
		}
	}

	&--is-deprecated {
		.component-info__title {
			text-decoration: underline wavy var(--red-50);
		}
	}
}

.component-info-container {
	margin-bottom: 32px;

	> *:not(:first-child) {
		margin-top: 16px;
	}
}

.danger-block {
	color: var(--red-70);
	background: var(--support-error-light);

	border: 1px solid var(--support-error-dark);
	border-radius: $radius;

	a {
		color: inherit;
		text-decoration: underline;
	}

	code + code {
		margin-left: 8px;
	}

	> section {
		padding: 0.4rem 0.6rem;
	}

	> section:not(:first-child) {
		border-top: 1px solid var(--support-error-dark);
	}
}
</style>
