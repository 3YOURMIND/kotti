<template>
	<div class="kt-line">
		<div class="kt-line__line" />
		<div v-if="text" class="kt-line__text" v-text="text" />
		<div v-if="text" class="kt-line__line" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { propValidator } from '../props'

import { KottiLine } from './types'

export default defineComponent<KottiLine.PropsInternal>({
	name: 'KtLine',
	props: {
		text: {
			default: null,
			type: String,
			validator: propValidator(KottiLine.propsInternalSchema, 'text'),
		},
	},
})
</script>

<style lang="scss" scoped>
.kt-line {
	display: flex;
	align-items: center;
	height: 0.8rem;
	margin: 0.2rem 0;

	&__line {
		flex: 1 1 auto;
		width: 100%;
		height: 1px;
		background: var(--gray-30);
	}

	&__text {
		flex: 1 0 auto;
		padding: 0 0.4rem;
		font-size: 0.6rem;
		color: var(--gray-30);
		text-align: center;
	}
}
</style>
