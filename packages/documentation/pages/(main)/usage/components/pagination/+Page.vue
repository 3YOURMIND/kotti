<template>
	<ComponentInfo v-bind="{ component }" />

	<h2>Basic Usage</h2>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination :total="50" :pageSize="10" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination v-model:page="page50" :pageSize="10" :total="50" />
	</CodePreview>

	<h2>Default Page</h2>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination :total="50" :pageSize="10" :page="3" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination v-model:page="page50" :pageSize="10" :total="50" />
	</CodePreview>

	<h2>Styles</h2>

	<h4>Expanded</h4>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination pagingStyle="expand" :total="50" :pageSize="10" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination v-model:page="page50" :pageSize="10" pagingStyle="expand" :total="50" />
	</CodePreview>

	<h4>Fraction</h4>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination v-model:page="page50" :pageSize="10" pagingStyle="fraction" :total="50" />
	</CodePreview>

	<h4>Flexible</h4>

	<!-- prettier-ignore -->
	<CodePreview
		code='<KtPagination pagingStyle="flex" :total="50" :pageSize="10" v-model:page="page50" />'
		language="vue-html"
	>
		<KtPagination v-model:page="page50" :pageSize="10" pagingStyle="flex" :total="50" />
	</CodePreview>

	<h4>Extra Options</h4>

	<!-- TODO: make component form -->
	<CodePreview
		code='
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
		'
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

	<KtForm v-model="settings">
		<ComponentForm
			:component="component"
			:hiddenProps="{
				'onUpdate:page': (val: number) => (settings.page = val),
			}"
			:props="settings"
		>
			<template #component-form-settings>
				<div>
					<h4>Settings</h4>
					<KtFieldSingleSelect
						formKey="pagingStyle"
						hideClear
						label="Paging style"
						:options="[
							{ label: 'expand (default)', value: 'expand' },
							{ label: 'flex', value: 'flex' },
							{ label: 'fraction', value: 'fraction' },
						]"
					/>
					<KtFieldToggle
						v-show="settings.pagingStyle === 'flex'"
						formKey="fixedWidth"
						isOptional
						label="Fixed width"
						type="switch"
					>
						<template #helpText>
							<code>fixedWidth</code> only has an effect if
							<code>pagingStyle</code> is set to <code>flex</code>
						</template>
					</KtFieldToggle>
				</div>
				<div>
					<h4>Numbers</h4>
					<KtFieldNumber formKey="page" hideClear label="Page" />
					<KtFieldNumber formKey="pageSize" hideClear label="Page size" />
					<KtFieldNumber formKey="total" hideClear label="Total" />
					<KtFieldNumber
						formKey="adjacentAmount"
						hideClear
						label="Adjacent Pages"
					/>
				</div>
			</template>
		</ComponentForm>
	</KtForm>

	<!-- Scape goat element to redirect eslint's anger -->
	<div />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import type { Kotti } from '@3yourmind/kotti-ui'
import {
	KtFieldNumber,
	KtFieldSingleSelect,
	KtFieldToggle,
	KtForm,
	KtPagination,
} from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentForm from '~/components/component-form/ComponentForm.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsPagination',
	components: {
		CodePreview,
		ComponentForm,
		ComponentInfo,
		KtFieldNumber,
		KtFieldSingleSelect,
		KtFieldToggle,
		KtForm,
		KtPagination,
	},
	setup() {
		return {
			component: KtPagination,
			page50: ref(1),
			page500: ref(1),
			settings: ref<{
				adjacentAmount: Kotti.FieldNumber.Value
				fixedWidth: Kotti.FieldToggle.Value
				page: Kotti.FieldNumber.Value
				pageSize: Kotti.FieldNumber.Value
				pagingStyle: 'expand' | 'flex' | 'fraction'
				total: Kotti.FieldNumber.Value
			}>({
				adjacentAmount: 2,
				fixedWidth: false,
				page: 1,
				pageSize: 10,
				pagingStyle: 'expand',
				total: 100,
			}),
		}
	},
})
</script>
