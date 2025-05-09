<template>
	<h1>Design tokens</h1>

	<p>
		Design token are abstracting values used for our design system. It allow us
		to use meaningful names and to never use hardcoded values. It also open us
		to a lot of theming features.
	</p>

	<h2>Usage</h2>

	<!-- prettier-ignore -->
	<MarkdownBlock>
		We store the tokens in `packages/kotti-ui/tokens/colors.js`. `packages/kotti-ui/tokens/generate.js` then transforms them into SCSS using CSS Custom Properties. We prefer CSS custom properties over SCSS variables. Here is how we use CSS custom properties:
	</MarkdownBlock>

	<CodePreview
		code="
			/* set a css custom property */
			--text-01: #000;
			--background-01: #f5f5f5;

			.some-class {
				/* use a css custom property */
				color: var(--text-01);
				background-color: var(--background-01);
			}
		"
		language="css"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CodePreview from '~/components/CodePreview.vue'

export default defineComponent({
	name: 'DocumenationPageFoundationsColorsIntroduction',
	components: {
		CodePreview,
	},
})
</script>
