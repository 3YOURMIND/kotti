<template>
	<div class="component-info-container">
		<div
			class="component-info"
			:class="{ 'component-info--is-deprecated': meta.deprecated !== null }"
		>
			<h1 class="component-info__title" v-text="title" />
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
		<article v-if="meta.deprecated !== null" class="danger-block">
			<section>
				This component is deprecated and will be removed in Kotti
				<strong v-text="`v${meta.deprecated.version}`" />
			</section>
			<section>
				<div><strong>Reason</strong>: {{ meta.deprecated.reason }}</div>
				<div>
					<strong
						v-text="
							meta.deprecated.alternatives.length < 2
								? 'Alternative'
								: 'Alternatives'
						"
					/>:
					<code
						v-for="alternative in meta.deprecated.alternatives"
						:key="alternative"
						v-text="alternative"
					/>
					<span
						v-if="meta.deprecated.alternatives.length === 0"
						v-text="Dashes.EmDash"
					/>
				</div>
			</section>
		</article>
		<article v-if="Object.keys(meta.slots).length >= 1">
			<h4>Slots</h4>
			<section class="slots-block">
				<div v-for="[name, details] in Object.entries(meta.slots)" :key="name">
					<div class="slots-block__name" v-text="name" />
					<div class="slots-block__details">
						<div
							v-if="details.description"
							class="slots-block__description"
							v-text="details.description"
						/>
						<i v-else class="slot-description" v-text="'No description'" />
						<div
							class="slots-block__scoped"
							v-text="details.scoped === null ? '(Not Scoped)' : details.scoped"
						/>
					</div>
				</div>
			</section>
		</article>
	</div>
</template>

<script lang="ts">
import { Kotti } from '@3yourmind/kotti-ui'
import { Dashes } from '@metatypes/typography'
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
	props: {
		meta: {
			default: null,
			type: Object,
		},
		title: {
			required: true,
			type: String,
		},
	},
	setup(props: { meta: Kotti.Meta; title: string }) {
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

				if (props.meta) {
					if (props.meta.deprecated !== null)
						result.push({
							backgroundColor: 'var(--red-20)',
							color: 'var(--red-70)',
							left: 'Deprecated for',
							right: `v${props.meta.deprecated.version}`,
						})

					if (props.meta.typeScript)
						result.push({
							backgroundColor: 'var(--primary-20)',
							color: 'var(--primary-70)',
							left: 'TS',
							right: props.meta.typeScript.namespace,
						})

					result.push({
						backgroundColor: 'var(--green-20)',
						color: 'var(--green-70)',
						left: 'Added',
						...(props.meta.addedVersion === null
							? {
									right: 'unknown',
							  }
							: {
									link: `https://github.com/3YOURMIND/kotti/releases/tag/v${props.meta.addedVersion}`,
									right: `v${props.meta.addedVersion}`,
							  }),
					})
				}

				return result
			}),
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

.slots-block {
	color: var(--support-info-dark);
	background: var(--support-info-light);

	border: 1px solid var(--support-info-dark);
	border-radius: $radius;

	> div {
		display: flex;
		align-items: center;
		padding: 0.4rem 0.6rem;

		> *:not(:first-child) {
			margin-left: 0.2rem;
		}
	}

	> div:not(:first-child) {
		border-top: 1px solid var(--support-info-dark);
	}

	&__name {
		font-weight: bold;
	}
}
</style>
