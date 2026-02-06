<template>
	<div :class="loadingClasses" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { makeProps } from '../make-props'

import { KottiLoading } from './types'
const DELAY_RANGE = 20

export default defineComponent({
	name: 'KtLoading',
	props: makeProps(KottiLoading.propsSchema),
	setup(props) {
		return {
			loadingClasses: computed(() => {
				const delayType = (Math.random() * DELAY_RANGE).toFixed(0)
				switch (props.type) {
					case 'circle':
					case 'rectangle':
					case 'square':
						return `skeleton ${props.type} delay-${delayType}`
					case 'rectangle-lg':
						return `skeleton rectangle lg delay-${delayType}`
					case 'rectangle-md':
						return `skeleton rectangle md delay-${delayType}`
					case 'rectangle-sm':
						return `skeleton rectangle sm delay-${delayType}`
				}
				return ''
			}),
		}
	},
})
</script>
