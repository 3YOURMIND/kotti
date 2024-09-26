<template>
	<ComponentInfo v-bind="{ component }" />

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ## Skeleton Screen

    A skeleton screen gives a visual cue that content is loading one after the other into each UI element area. We suggest using skeleton screen for content densitive pages.


    There are three types of skeleton elements:

    1. **Circle:** Cicular shape which width and height are equal to parents' width, class name `circle`;
    2. **Square:** Width and height are equal to parents' width, class name `square`;
    3. **Rectangle:** Width equals to parents, height can be medium `md` or large `lg`.
    </MarkdownBlock>

	<div class="element-example">
		<div class="columns">
			<div class="column col-2">
				<div class="skeleton circle" />
			</div>
			<div class="column col-2">
				<div class="skeleton square" />
			</div>
			<div class="column col-8 col-with-row-gap">
				<div class="skeleton rectangle md" />
				<div class="skeleton rectangle md" />
				<div class="skeleton rectangle md" />
				<div class="skeleton rectangle md" />
				<div class="skeleton rectangle md" />
			</div>
		</div>
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ```vue
    <div class="skeleton circle" />
    <div class="skeleton square"/>
    <div class="skeleton rectangle"/>
    ```

    Rectangle skeleton with different height.
        </MarkdownBlock>

	<div class="element-example col-with-row-gap">
		<div class="skeleton rectangle" />
		<div class="skeleton rectangle md" />
		<div class="skeleton rectangle md" />
		<div class="skeleton rectangle lg" />
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ```vue
    <div class="col-with-row-gap">
    	<div class="skeleton rectangle"/>
    	<div class="skeleton rectangle md"/>
    	<div class="skeleton rectangle md"/>
    	<div class="skeleton rectangle lg"/>
    </div>
    ```

    ## Spin Loading

    Loading indicator is used for loading and updating. `loading` class is regular size, `lg` is large size.
        </MarkdownBlock>

	<div class="element-example">
		<div class="columns">
			<div class="column col-6">
				<div class="loading" />
			</div>
			<div class="column col-6">
				<div class="loading lg" />
			</div>
		</div>
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ```vue
    <div class="loading"/>
    <div class="loading lg"/>
    ```

    You can also use animated loading indicator inline `inline` with other elements.
        </MarkdownBlock>

	<button>
		<div class="loading inline"></div>
		Uploading
	</button>

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ```vue
    <button>
    	<div class="loading inline"></div>
    		 Uploading
    </button>
    ```

    Using `white` class can change the ring color to white.
        </MarkdownBlock>

	<button class="primary">
		<div class="loading inline white"></div>
		Uploading
	</button>

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ```vue
    <button class="primary">
    	<div class="loading inline white"></div>
    		Uploading
    </button>
    ```

    Using `gray` class can change the ring color to gray.
        </MarkdownBlock>

	<button class="primary">
		<div class="loading inline gray"></div>
		Uploading
	</button>

	<!-- prettier-ignore -->
	<MarkdownBlock>
    ```vue
    <button class="primary">
    	<div class="loading inline gray"></div>
    		Uploading
    </button>
    ```
        </MarkdownBlock>
</template>

<script lang="ts">
import { Kotti } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLoading',
	components: {
		ComponentInfo,
	},
	setup() {
		const component: { meta: Kotti.Meta; name: string } = {
			name: 'Loadings',
			meta: {
				addedVersion: null,
				deprecated: null,
				designs: {
					type: Kotti.MetaDesignType.FIGMA,
					url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=99%3A45',
				},
				slots: {},
				typeScript: null,
			},
		}

		return {
			component,
		}
	},
})
</script>

<style scoped>
.col-with-row-gap {
	display: flex;
	flex-direction: column;
	row-gap: 0.4rem;
}
</style>
