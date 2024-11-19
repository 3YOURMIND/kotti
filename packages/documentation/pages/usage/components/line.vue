<template lang="md">
    <ComponentInfo v-bind="{ component }" />

    Use a horizontal line as a separator between rows, to create a better information structure.

    You can add `text` to `KtLine` to display the text in the middle.

    <div class="element-example white">
    	<div v-text="'Full Line'" class="line-description" />
    	<KtLine />
    	<div v-text="'Title in center position'" class="line-description" />
    	<KtLine text="Title Center" />
    	<div v-text="'Title in left position'" class="line-description" />
    	<KtLine position="left" text="Title Left" />
    	<div v-text="'Title in right position'" class="line-description" />
    	<KtLine position="right" text="Title Right" />
    	<div v-text="'Interactive title in center position'" class="line-description" />
    	<KtLine
    		isInteractive
    		text="Action Center"
    		@click="handleClick('clicked center title')"
    	/>
    	<div v-text="'Interactive title in left position'" class="line-description" />
    	<KtLine
    		isInteractive
    		position="left"
    		text="Action Left"
    		@click="handleClick('clicked left title')"
    	/>
    	<div v-text="'Interactive title in right position'" class="line-description" />
    	<KtLine
    		isInteractive
    		position="right"
    		text="Action Right"
    		@click="handleClick('clicked right title')"
    	/>
    </div>

    ```html
    	<KtLine/>
    	<KtLine text="Title Center" />
    	<KtLine position="left" text="Title Left" />
    	<KtLine position="right" text="Title Right" />
    	<KtLine
    		isInteractive
    		text="Action Center"
    		@click="handleClick('clicked center title')"
    	/>
    	<KtLine
    		isInteractive
    		position="left"
    		text="Action Left"
    		@click="handleClick('clicked left title')"
    	/>
    	<KtLine
    		isInteractive
    		position="right"
    		text="Action Right"
    		@click="handleClick('clicked right title')"
    	/>
    ```
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtLine } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'
import { info } from '~/utilities/toaster'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLine',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtLine,
			handleClick: (text: string) => {
				info({ text })
			},
		}
	},
})
</script>

<style scoped>
.line-description {
	margin: 1.5rem 0 0.5rem;
}
</style>
