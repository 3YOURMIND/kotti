<template>
	<ComponentInfo v-bind="{ component }" />

	<h2>Basic Usage</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`<KtPagination :total="50" :pageSize="10" />`'
		language="vue-html"
	>
		<KtPagination :total="50" :pageSize="10" />
	</CodePreview>

	<h2>Default Page</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`<KtPagination :total="50" :pageSize="10" :page="3" />`'
		language="vue-html"
	>
		<KtPagination :total="50" :pageSize="10" :page="3" />
	</CodePreview>

	<h2>Styles</h2>

	<h4>Expanded</h4>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`<KtPagination pagingStyle="expand" :total="50" :pageSize="10" />`'
		language="vue-html"
	>
		<KtPagination pagingStyle="expand" :total="50" :pageSize="10" />
	</CodePreview>

	<h4>Fraction</h4>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" />`'
		language="vue-html"
	>
		<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" />
	</CodePreview>

	<h4>Flexible</h4>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`<KtPagination pagingStyle="flex" :total="50" :pageSize="10" />`'
		language="vue-html"
	>
		<KtPagination pagingStyle="flex" :total="50" :pageSize="10" />
	</CodePreview>

	<h4>Extra Options</h4>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
            <KtPagination
             	pagingStyle="flex"
             	:total="500"
             	:pageSize="10"
             	:page="25"
             	:adjacentAmount="1"
            />
            <KtPagination
             	pagingStyle="flex"
             	:total="500"
             	:pageSize="10"
             	:page="25"
             	:adjacentAmount="2"
            />
            <KtPagination
             	pagingStyle="flex"
             	:total="500"
             	:pageSize="10"
             	:page="25"
             	:adjacentAmount="3"
            />

            <KtPagination pagingStyle="flex" :total="500" :pageSize="10" />
            <KtPagination pagingStyle="flex" :total="500" :pageSize="10" fixedWidth />
       	`'
		language="vue-html"
	>
		<KtPagination
			pagingStyle="flex"
			:total="500"
			:pageSize="10"
			:page="25"
			:adjacentAmount="1"
		/>
		<KtPagination
			pagingStyle="flex"
			:total="500"
			:pageSize="10"
			:page="25"
			:adjacentAmount="2"
		/>
		<KtPagination
			pagingStyle="flex"
			:total="500"
			:pageSize="10"
			:page="25"
			:adjacentAmount="3"
		/>

		<KtPagination pagingStyle="flex" :total="500" :pageSize="10" />
		<KtPagination pagingStyle="flex" :total="500" :pageSize="10" fixedWidth />
	</CodePreview>

	<!-- prettier-ignore -->
	<MarkdownBlock>
## Usage

#### Events

| Event Name            | Description                               | Parameters                             |
| :-------------------- | :---------------------------------------- | :------------------------------------- |
| `currentPageChange`   | trigger when number clicked               | `(event: Event, payload: currentPage)` |
| `nextPageClicked`     | trigger when next page button clicked     | `(event: Event, payload: currentPage)` |
| `previousPageClicked` | trigger when previous page button clicked | `(event: Event, payload: currentPage)` |
</MarkdownBlock>
</template>

<script lang="ts">
import { KtPagination } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsPagination',
	components: {
		CodePreview,
		ComponentInfo,
		KtPagination,
	},
	setup() {
		return {
			component: KtPagination,
		}
	},
})
</script>
