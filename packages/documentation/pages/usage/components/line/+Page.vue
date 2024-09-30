<template>
	<ComponentInfo v-bind="{ component }" />

	<p>
		Use a horizontal line as a separator between rows, to create a better
		information structure.
	</p>

	<p>
		You can add <code>text</code> to <code>KtLine</code> to display the text in
		the middle.
	</p>

	<p>Full Line</p>
	<CodePreview code="<KtLine />" language="vue-html">
		<KtLine class="line-description" />
	</CodePreview>

	<p>Title in center position</p>
	<CodePreview code='<KtLine text="Title Center" />' language="vue-html">
		<KtLine class="line-description" text="Title Center" />
	</CodePreview>

	<p>Title in left position</p>
	<CodePreview
		code='<KtLine position="left" text="Title Left" />'
		language="vue-html"
	>
		<KtLine class="line-description" position="left" text="Title Left" />
	</CodePreview>

	<p>Title in right position</p>
	<CodePreview
		code='<KtLine position="right" text="Title Right" />'
		language="vue-html"
	>
		<KtLine class="line-description" position="right" text="Title Right" />
	</CodePreview>

	<p>Interactive title in center position</p>
	<CodePreview
		code='<KtLine isInteractive text="Action Center" @click="handleClick" />'
		language="vue-html"
	>
		<KtLine
			class="line-description"
			isInteractive
			text="Action Center"
			@click="handleClick('clicked center title')"
		/>
	</CodePreview>

	<p>Interactive title in left position</p>
	<CodePreview
		code='<KtLine isInteractive text="Action Left" @click="handleClick" />'
		language="vue-html"
	>
		<KtLine
			class="line-description"
			isInteractive
			position="left"
			text="Action Left"
			@click="handleClick('clicked left title')"
		/>
	</CodePreview>

	<p>Interactive title in right position</p>
	<CodePreview
		code='<KtLine isInteractive text="Action Right" @click="handleClick" />'
		language="vue-html"
	>
		<KtLine
			class="line-description"
			isInteractive
			position="right"
			text="Action Right"
			@click="handleClick('clicked right title')"
		/>
	</CodePreview>
</template>

<script lang="ts">
import { KtLine } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'
import CodePreview from '~/components/CodePreview.vue'

import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLine',
	components: {
		CodePreview,
		ComponentInfo,
		KtLine,
	},
	setup() {
		return {
			component: KtLine,
			handleClick: (text: string) => {
				// eslint-disable-next-line no-alert
				window.alert(text)
			},
		}
	},
})
</script>

<style scoped>
.line-description {
	margin: 1rem 0;
}
</style>
