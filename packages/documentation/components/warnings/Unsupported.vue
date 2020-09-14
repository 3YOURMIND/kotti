<template>
	<article class="warning-block">
		This component <strong>does not support</strong> the following
		props/directives:
		<ul>
			<li v-for="[prop, reason] in Object.entries(props)" :key="prop">
				<code v-text="prop" /> ({{ reason }})
			</li>
		</ul>
	</article>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'WarningUnsupported',
	props: {
		props: {
			default: () => ({
				'v-text': 'Messes with Rendering Children',
				'v-t': 'Messes with Rendering Children',
			}),
			type: Object,
		},
	},
})
</script>

<style lang="scss" scoped>
.warning-block {
	padding: 1.2rem;
	margin-bottom: 0.6rem;
	color: var(--support-warning-dark);
	background: var(--support-warning-light);
	border-radius: 5px;

	a {
		color: inherit;
		text-decoration: underline;
	}
}
</style>
