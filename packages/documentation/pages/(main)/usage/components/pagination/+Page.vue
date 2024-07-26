<template>
	<ComponentInfo v-bind="{ component }" />

	<h2>Basic Usage</h2>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination :total="50" :pageSize="10" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination :total="50" :pageSize="10" v-model:page="page50" />
	</CodePreview>

	<h2>Default Page</h2>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination :total="50" :pageSize="10" :page="3" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination :total="50" :pageSize="10" v-model:page="page50" />
	</CodePreview>

	<h2>Styles</h2>

	<h4>Expanded</h4>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination pagingStyle="expand" :total="50" :pageSize="10" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination pagingStyle="expand" :total="50" :pageSize="10" v-model:page="page50" />
	</CodePreview>

	<h4>Fraction</h4>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" v-model:page="page50" />
	</CodePreview>

	<h4>Flexible</h4>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination pagingStyle="flex" :total="50" :pageSize="10" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination pagingStyle="flex" :total="50" :pageSize="10" v-model:page="page50" />
	</CodePreview>

	<h4>Extra Options</h4>

	<!-- TODO: make component form -->
	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<KtPagination
				v-model:page="page500"
				:adjacentAmount="1"
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>
			<KtPagination
				v-model:page="page500"
				:adjacentAmount="2"
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>
			<KtPagination
				v-model:page="page500"
				:adjacentAmount="3"
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>

			<!-- Separate fixed width example -->
			<KtPagination
				v-model:page="page500"
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>
			<KtPagination
				v-model:page="page500"
				fixedWidth
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>
	   	`'
		language="vue-html"
	>
		<KtPagination
			v-model:page="page500"
			:adjacentAmount="1"
			:pageSize="10"
			pagingStyle="flex"
			:total="500"
		/>
		<KtPagination
			v-model:page="page500"
			:adjacentAmount="2"
			:pageSize="10"
			pagingStyle="flex"
			:total="500"
		/>
		<KtPagination
			v-model:page="page500"
			:adjacentAmount="3"
			:pageSize="10"
			pagingStyle="flex"
			:total="500"
		/>

		<!-- Separate fixed width example -->
		<KtPagination
			v-model:page="page500"
			:pageSize="10"
			pagingStyle="flex"
			:total="500"
		/>
		<KtPagination
			v-model:page="page500"
			fixedWidth
			:pageSize="10"
			pagingStyle="flex"
			:total="500"
		/>
	</CodePreview>
</template>

<script lang="ts">
import { KtPagination } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

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
			page50: ref(1),
			page500: ref(1),
		}
	},
})
</script>
