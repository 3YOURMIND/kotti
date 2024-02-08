<template>
	<div class="component-info-container">
		<div
			class="component-info"
			:class="{
				'component-info--is-deprecated': component.meta.deprecated !== null,
			}"
		>
			<h1 class="component-info__title" v-text="component.name" />
			<div>
				<div class="component-info__labels">
					<div
						v-for="(label, index) in labels"
						:key="index"
						class="component-info-label"
						:style="`--background-color: ${label.backgroundColor}; --color: ${label.color}`"
					>
						<div class="component-info-label__left" v-text="label.left" />
						<a
							v-if="label.link"
							class="component-info-label__right"
							:href="label.link"
							rel="noreferrer noopener"
							target="_blank"
							v-text="label.right"
						/>
						<div
							v-else
							class="component-info-label__right"
							v-text="label.right"
						/>
					</div>
				</div>
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
			text="Properties"
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
						v-for="[name, prop] in Object.entries(component.props).sort(
							([a], [b]) => a.localeCompare(b),
						)"
						:key="name"
					>
						<td><code v-text="name" /></td>
						<td>
							<code v-text="stringifyType(prop.type)" />
						</td>
						<td>
							<code
								v-if="prop.required"
								style="font-style: italic"
								v-text="'required'"
							/>
							<code
								v-else-if="prop.default === undefined"
								style="font-style: italic"
								v-text="'No default'"
							/>
							<code v-else v-text="stringifyDefault(prop.default, prop.type)" />
						</td>
						<td>
							<div style="display: flex; align-items: center">
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
import castArray from 'lodash/castArray'
import kebabCase from 'lodash/kebabCase'
import { computed, defineComponent, ref, PropType } from 'vue'

import ComponentInfoSlots from './component-info/Slots.vue'

type VuePropType =
	| ArrayConstructor
	| BooleanConstructor
	| FunctionConstructor
	| NumberConstructor
	| StringConstructor

export default defineComponent({
	name: 'ComponentInfo',
	components: {
		ComponentInfoSlots,
	},
	props: {
		component: {
			required: true,
			type: Object as PropType<{
				meta: Kotti.Meta
				name: string
				props?: Record<string, unknown>
			}>,
		},
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

				const {
					meta: {
						addedVersion,
						componentFolder,
						deprecated,
						designs,
						typeScript,
					},
					name,
				} = props.component

				const folderName =
					componentFolder ?? kebabCase(name.replace(/^Kt/, 'Kotti'))

				const componentSourceFolder = props.component.props
					? `https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/${folderName}`
					: null

				if (deprecated !== null)
					result.push({
						backgroundColor: 'var(--red-20)',
						color: 'var(--red-70)',
						left: 'Deprecated for',
						right: `v${deprecated.version}`,
					})

				if (designs !== null) {
					if (Array.isArray(designs))
						result.push(
							...designs.map((design) => ({
								backgroundColor: 'var(--yellow-20)',
								color: 'var(--yellow-70)',
								left: `Design “${design.title}”`,
								link: design.url,
								right: {
									[Kotti.MetaDesignType.FIGMA]: 'Figma',
								}[design.type],
							})),
						)
					else
						result.push({
							backgroundColor: 'var(--yellow-20)',
							color: 'var(--yellow-70)',
							left: 'Design',
							link: designs.url,
							right: {
								[Kotti.MetaDesignType.FIGMA]: 'Figma',
							}[designs.type],
						})
				} else
					result.push({
						backgroundColor: 'var(--orange-20)',
						color: 'var(--orange-70)',
						left: 'Design',
						right: 'MISSING',
					})

				if (typeScript)
					result.push({
						backgroundColor: 'var(--primary-20)',
						color: 'var(--primary-70)',
						left: 'TS',
						link: componentSourceFolder
							? `${componentSourceFolder}/types.ts`
							: undefined,
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

				if (componentSourceFolder)
					result.push({
						backgroundColor: 'var(--purple-20)',
						color: 'var(--purple-70)',
						left: 'Source',
						link: `${componentSourceFolder}/${name}.vue`,
						right: `${name}.vue`,
					})

				return result
			}),
			showProps: ref(false),
			stringifyDefault: (
				defaultValue: (() => unknown) | unknown,
				type: Array<VuePropType> | VuePropType,
			) => {
				if (typeof defaultValue === 'function')
					if (castArray(type).some((t) => t.name === 'Function'))
						return `${defaultValue.toString()} *`
					else return `${JSON.stringify(defaultValue())} *`

				return JSON.stringify(defaultValue)
			},
			stringifyType: (type: Array<VuePropType> | VuePropType) =>
				castArray(type)
					.map((t) => t.name.toLowerCase())
					.join(' | '),
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
	flex-wrap: wrap;
	margin: -5px -10px;

	@media (width >= $size-lg) {
		flex-direction: row;
		align-items: center;
	}

	> * {
		display: flex;
		margin: 5px 10px;
	}

	&__labels {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin: -5px;
	}

	&--is-deprecated {
		.component-info__title {
			text-decoration: underline wavy var(--red-50);
		}
	}
}

.component-info-label {
	display: flex;
	margin: 5px;
	overflow: hidden;
	border: 1px solid var(--color);
	border-radius: $radius;

	&__left,
	&__right {
		padding: 2px 8px;
	}

	a.component-info-label__right {
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
