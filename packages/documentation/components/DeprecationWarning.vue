<template>
	<article class="danger-block">
		This component is deprecated and will be removed in Kotti
		{{ version }}.<br />
		Please use <a :href="link" v-text="componentName" /> instead.
	</article>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'DeprecationWarning',
	props: {
		componentName: { required: true, type: String },
		link: { required: true, type: String },
		version: { required: true, type: String },
	},
})
</script>

<style lang="scss">
.danger-block {
	padding: 1.2rem;
	margin-bottom: 0.6rem;
	color: var(--red-70);
	background: var(--support-error-light);
	border-radius: 5px;

	a {
		color: inherit;
		text-decoration: underline;
	}
}
</style>
