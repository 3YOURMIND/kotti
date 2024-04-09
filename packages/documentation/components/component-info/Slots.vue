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
				<div class="header">
					<div class="header__name" v-text="name" />
					<div class="header__details">
						<div
							v-if="details.description"
							class="header__description"
							v-text="details.description"
						/>
						<div
							v-else
							class="header__empty-description"
							v-text="'No description'"
						/>
						<div
							v-if="details.scope === null"
							class="header__empty-scope"
							v-text="'(Not Scoped)'"
						/>
					</div>
				</div>
				<div v-if="details.scope !== null" class="scope">
					<div
						v-for="[variableName, { description, type }] in Object.entries(
							details.scope,
						)"
						:key="variableName"
						class="scope__item"
					>
						<div :class="`scope__type scope__type--is-${type}`" v-text="type" />
						<div class="scope__name" v-text="variableName" />
						<div
							v-if="description === null"
							class="scope__description scope__description--is-empty"
							v-text="'No Description'"
						/>
						<div v-else class="scope__description" v-text="description" />
					</div>
				</div>
			</section>
		</article>
	</KtHeading>
</template>

<script lang="ts">
import type { Kotti } from '@3yourmind/kotti-ui'
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'ComponentInfoSlots',
	props: {
		slots: { required: true, type: Object as PropType<Kotti.Meta['slots']> },
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
}

.header {
	display: flex;
	flex: 1;
	align-items: center;

	&__details {
		flex: 1;
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

.scope {
	margin-left: 1.5rem;

	&__item {
		display: flex;
		align-items: center;

		> *:not(:first-child) {
			margin-left: 0.3rem;
		}
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
</style>
