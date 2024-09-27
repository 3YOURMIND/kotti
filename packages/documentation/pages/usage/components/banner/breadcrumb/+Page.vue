<template>
	<ComponentInfo v-bind="{ component }" />

	<!-- prettier-ignore -->
	<MarkdownBlock>
		Indicate the current page’s location within a navigational hierarchy.

		## Basic
	</MarkdownBlock>

	<div class="element-example white">
		<KtBreadcrumb :activeIndex="activeIndex" :breadcrumbs="links" />
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ```vue
    <KtBreadcrumb :activeIndex="activeIndex" :breadcrumbs="links" />
    ```

    ```js
    links: [
    	{
    		title: 'Kotti',
    		onClick: () => {
    			activeIndex.value = 0,
    			router.value.push('#')
    		}
    		isCompleted: true,
    	},
    	{
    		title: 'Usage',
    		onClick: () => {
    			activeIndex.value = 1,
    			router.value.push('#'),
    		}
    		isCompleted: true,
    	},
    	{
    		title: 'Components',
    		onClick: () => {
    			activeIndex.value = 2,
    			router.value.push('#')
    		}
    		isCompleted: true,
    	},
    	{
    		title: 'Links',
    		onClick: () => {
    			activeIndex.value = 3
    			router.value.push('#')
    		},
    		isCompleted: false,
    	},
    	{
    		title: 'Breadcrumbs',
    		onClick: () => {
    			activeIndex.value = 4,
    			router.value.push('#')
    		}
    		isDisabled: true,
    	}
    ]
    ```

    ## Separator Style
</MarkdownBlock>

	<div class="element-example white">
		<KtBreadcrumb :breadcrumbs="links" :separator="textSeparator" />
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ```vue
    <KtBreadcrumb :breadcrumbs="links" :separator="textSeparator" />
    ```

    ```js
    // default separator
    iconSeparator: {
    	style: 'icon',
    	value: 'chevron_right'
    },
    textSeparator: {
    	style: 'text',
    	value: '/'
    },
    ```
    </MarkdownBlock>
</template>

<script lang="ts">
import { KtBreadcrumb } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

// TODO: Fix Mock routing
// import { useRouter } from '../../../hooks/use-router'

import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsBreadcrumb',
	components: {
		ComponentInfo,
		KtBreadcrumb,
	},
	setup() {
		// const router = useRouter()
		const activeIndex = ref<number | null>(2)
		return {
			activeIndex,
			component: KtBreadcrumb,
			links: [
				{
					title: 'Kotti',
					onClick: () => {
						activeIndex.value = 0
						// void router.value.push('#')
					},
					isCompleted: true,
				},
				{
					title: 'Usage',
					onClick: () => {
						activeIndex.value = 1
						// void router.value.push('#')
					},
					isCompleted: true,
				},
				{
					title: 'Components',
					onClick: () => {
						activeIndex.value = 2
						// void router.value.push('#')
					},
					isCompleted: true,
				},
				{
					title: 'Links',
					onClick: () => {
						activeIndex.value = 3
						// void router.value.push('#')
					},
					isCompleted: false,
				},
				{
					title: 'Breadcrumbs',
					onClick: () => {
						activeIndex.value = 4
						// void router.value.push('#')
					},
					isDisabled: true,
				},
			],
			textSeparator: {
				style: 'text',
				value: '/',
			},
		}
	},
})
</script>
