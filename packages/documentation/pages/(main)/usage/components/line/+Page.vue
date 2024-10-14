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

	<h2>Basic usage with or without title</h2>
	<CodePreview
		code='
			<p>Without title</p>
			<KtLine />
			<p>Center position</p>
			<KtLine text="Title Center" />
			<p>Left position</p>
			<KtLine position="left" text="Title Left" />
			<p>Right position</p>
			<KtLine position="right" text="Title Right" />
		'
		language="vue-html"
	>
		<div class="line-preview">
			<p>Without title</p>
			<KtLine class="line-description" />
			<p>Center position</p>
			<KtLine class="line-description" text="Title Center" />
			<p>Left position</p>
			<KtLine class="line-description" position="left" text="Title Left" />
			<p>Right position</p>
			<KtLine class="line-description" position="right" text="Title Right" />
		</div>
	</CodePreview>

	<h2>Interactive Title</h2>
	<CodePreview
		code='
			<p>Center position</p>
			<KtLine isInteractive text="Action Center" @click="handleClick" />
			<p>Left position</p>
			<KtLine isInteractive position="left" text="Action Center" @click="handleClick" />
			<p>Right position</p>
			<KtLine isInteractive position="right text="Action Center" @click="handleClick" />
				'
		language="vue-html"
	>
		<div class="line-preview">
			<p>Center position</p>
			<KtLine
				class="line-description"
				isInteractive
				text="Action Center"
				@click="handleClick('clicked center title')"
			/>
			<p>Left position</p>
			<KtLine
				class="line-description"
				isInteractive
				position="left"
				text="Action Left"
				@click="handleClick('clicked left title')"
			/>
			<p>Right position</p>
			<KtLine
				class="line-description"
				isInteractive
				position="right"
				text="Action Right"
				@click="handleClick('clicked right title')"
			/>
		</div>
	</CodePreview>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtLine } from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'
import { success } from '~/utilities/toaster'

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
				success({ text })
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.line-preview {
	.line-description {
		margin: 1rem 0;

		&:not(:last-child) {
			margin-bottom: 2rem;
		}
	}
}
</style>
