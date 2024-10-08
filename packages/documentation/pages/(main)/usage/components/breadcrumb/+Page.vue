<template>
	<ComponentInfo v-bind="{ component }" />

	<h2>Basic</h2>
	Indicate the current page’s location within a navigational hierarchy.

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
		<KtBreadcrumb
			:activeIndex="activeIndex"
			:breadcrumbs="[
				{
					title: "Kotti",
					onClick: () => (activeIndex.value = 0),
					isCompleted: true,
				},
				{
					title: "Usage",
					onClick: () => (activeIndex.value = 1),
					isCompleted: true,
				},
				{
					title: "Components",
					onClick: () => (activeIndex.value = 2),
					isCompleted: true,
				},
				{
					title: "Links",
					onClick: () => (activeIndex.value = 3),
					isCompleted: false,
				},
				{
					title: "Breadcrumbs",
					isDisabled: true,
				}
			]"
		/>`'
		language="vue-html"
	>
		<KtBreadcrumb :activeIndex="activeIndex" :breadcrumbs="links" />
	</CodePreview>

	<h2>Separator Style</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<KtBreadcrumb
				:breadcrumbs="links"
				:separator="{
					style: "text",
					value: "/",
				}"
			/>
			<KtBreadcrumb
				:breadcrumbs="links"
				:separator="{
					style: "icon",
					value: "chevron_right",
				}"
			/>
		`'
		language="vue-html"
	>
		<KtBreadcrumb
			:breadcrumbs="links"
			:separator="{
				style: 'text',
				value: '/',
			}"
		/>
		<KtBreadcrumb
			:breadcrumbs="links"
			:separator="{
				style: 'icon',
				value: 'chevron_right',
			}"
		/>
	</CodePreview>
</template>

<script lang="ts">
import { KtBreadcrumb } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsBreadcrumb',
	components: {
		CodePreview,
		ComponentInfo,
		KtBreadcrumb,
	},
	setup() {
		const activeIndex = ref<number | null>(2)
		return {
			activeIndex,
			component: KtBreadcrumb,
			links: [
				{
					title: 'Kotti',
					onClick: () => {
						activeIndex.value = 0
					},
					isCompleted: true,
				},
				{
					title: 'Usage',
					onClick: () => {
						activeIndex.value = 1
					},
					isCompleted: true,
				},
				{
					title: 'Components',
					onClick: () => {
						activeIndex.value = 2
					},
					isCompleted: true,
				},
				{
					title: 'Links',
					onClick: () => {
						activeIndex.value = 3
					},
					isCompleted: false,
				},
				{
					title: 'Breadcrumbs',
					onClick: () => {
						activeIndex.value = 4
					},
					isDisabled: true,
				},
			],
		}
	},
})
</script>
