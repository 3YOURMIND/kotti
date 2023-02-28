<template>
	<KtHeading
		v-if="Object.entries(slots).length > 0"
		text="Slots"
		:toggleStatus="showSlots"
		toggleCloseText="Hide"
		toggleText="Show"
		type="toggle"
		@toggle="showSlots = !showSlots"
	>
		<article class="slots-block">
			<section v-for="[name, details] in Object.entries(slots)" :key="name">
				<div class="slots-block__header">
					<div class="slots-block__header__name" v-text="name" />
					<div class="slots-block__header__details">
						<div
							v-if="details.description"
							class="slots-block__header__details__description"
							v-text="details.description"
						/>
						<div
							v-else
							class="slots-block__header__details__empty-description"
							v-text="'No description'"
						/>
						<div
							v-if="details.scope === null"
							class="slots-block__header__details__empty-scope"
							v-text="'(Not Scoped)'"
						/>
					</div>
				</div>
				<div v-if="details.scope !== null" class="slots-block__scope">
					<div
						v-for="[variableName, { description, type }] in Object.entries(
							details.scope,
						)"
						:key="variableName"
						class="slots-block__scope__item"
					>
						<div
							:class="`slots-block__scope__item__type slots-block__scope__item__type--is-${type}`"
							v-text="type"
						/>
						<div class="slots-block__scope__item__name" v-text="variableName" />
						<div
							v-if="description === null"
							class="slots-block__scope__item__description slots-block__scope__item__description--is-empty"
							v-text="'No Description'"
						/>
						<div
							v-else
							class="slots-block__scope__item__description"
							v-text="description"
						/>
					</div>
				</div>
			</section>
		</article>
	</KtHeading>
</template>

<script lang="ts">
import { Kotti } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent<{
	slots: Kotti.Meta['slots']
}>({
	name: 'ComponentInfoSlots',
	props: {
		slots: { required: true, type: Object },
	},
	setup() {
		return {
			showSlots: ref(false),
		}
	},
})
</script>

<style lang="scss" scoped>
$radius: 3px;

.slots-block {
	color: var(--support-info-dark);
	background: var(--support-info-light);

	border: 1px solid var(--support-info-dark);
	border-radius: $radius;

	> * {
		padding: 0.4rem 0.6rem;
	}

	> *:not(:first-child) {
		border-top: 1px solid var(--support-info-dark);
	}

	&__header {
		display: flex;
		flex: 1;
		align-items: center;

		&__details {
			flex: 1;

			&__description {
				flex: 1;
			}

			&__empty-description {
				flex: 1;
				font-style: italic;
			}

			&__empty-scope {
				font-style: italic;
			}
		}

		&__name {
			font-weight: bold;
		}

		> * {
			display: flex;
			align-items: center;
		}

		> *:not(:first-child) {
			margin-left: 0.4rem;
		}
	}

	&__scope {
		margin-left: 1.5rem;

		&__item {
			display: flex;
			align-items: center;

			> *:not(:first-child) {
				margin-left: 0.3rem;
			}

			&__description {
				&--is-empty {
					font-style: italic;
				}
			}

			&__name {
				min-width: 100px;
				font-weight: bold;
			}

			&__type {
				min-width: 60px;

				&--is-function {
					color: var(--orange-50);
				}

				&--is-object {
					color: var(--purple-50);
				}

				&--is-integer {
					color: var(--green-50);
				}
			}
		}
	}
}
</style>
