<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<p>
			The <code>KtBanner</code> component is a versatile alert box used for
			communicating important application-level or contextual information, such
			as errors, warnings, or success messages.
		</p>

		<!-- eslint-disable vue/no-useless-v-bind -->
		<!-- prettier-ignore -->
		<CodePreview
			:code='`
				<div style="display: flex; gap: var(--unit-4); flex-direction: column;">
					<KtBanner text="I present you this error" type="error" />
					<KtBanner text="I present you this info" type="info" />
					<KtBanner text="I present you this success" type="success" />
					<KtBanner text="I present you this warning" type="warning" />
				</div>
			`'
			language="vue-html"
		>
			<div style="display: flex; flex-direction: column; gap: var(--unit-4);">
				<KtBanner text="I present you this error" type="error" />
				<KtBanner text="I present you this info" type="info" />
				<KtBanner text="I present you this success" type="success" />
				<KtBanner text="I present you this warning" type="warning" />
			</div>
		</CodePreview>

		<h2>With Action</h2>

		<!-- prettier-ignore -->
		<CodePreview
			:code='`
				<KtBanner
					action="Action"
					isCloseable
					text="..."
					:type="type"
					@action="onAction"
					@close="onClose"
				/>
			`'
			language="vue-html"
		>
			<KtBanner
				v-if="!closed"
				action="Action"
				isCloseable
				text="You can close this banner. We do not know why you would do that but you can. You can close this banner. We do not know why you would do that but you can. You can close this banner. We do not know why you would do that but you can."
				type="info"
				@action="onAction"
				@close="onClose"
			/>
			<KtButton v-else label="May I please try again?" @click="onClose" />
		</CodePreview>

		<h2>With Header</h2>

		<!-- prettier-ignore -->
		<CodePreview
			:code='`
				<KtBanner
					header="Important Announcement"
					text="You can’t close this banner. We do not know why you would do that but you can’t."
					type="success"
				/>
			`'
			language="vue-html"
		>
			<KtBanner
				header="Important Announcement"
				text="You can’t close this banner. We do not know why you would do that but you can’t. You can’t close this banner. We do not know why you would do that but you can’t. You can’t close this banner. We do not know why you would do that but you can’t."
				type="success"
			/>
		</CodePreview>

		<h2>Close</h2>

		<!-- prettier-ignore -->
		<CodePreview
			:code='`
				<KtBanner
					isCloseable
					text="You can close this banner. We do not know why you would do that but you can."
					@close="onClose"
				/>
			`'
			language="vue-html"
		>
			<KtBanner
				v-if="!closed"
				isCloseable
				text="You can close this banner. We do not know why you would do that but you can. You can close this banner. We do not know why you would do that but you can. You can close this banner. We do not know why you would do that but you can."
				@close="onClose"
			/>
			<KtButton v-else label="May I please try again?" @click="onClose" />
		</CodePreview>

		<h2>Custom Style</h2>

		<!-- prettier-ignore -->
		<CodePreview
			:code='`
				<KtBanner
					isCloseable
					text="As everyone knows, stonks only go up."
					:type="{
						icon: Yoco.Icon.CHARTS,
						backgroundColor: \x27var(--gray-10)\x27,
						darkColor: \x27var(--gray-70)\x27,
						lightColor: \x27var(--gray-20)\x27,
					}"
					@close="onClose"
				/>
			`'
			language="vue-html"
		>
			<KtBanner
				v-if="!closed"
				isCloseable
				text="As everyone knows, stonks only go up."
				:type="{
					icon: Yoco.Icon.CHARTS,
					backgroundColor: 'var(--gray-10)',
					darkColor: 'var(--gray-70)',
					lightColor: 'var(--gray-20)'
				}"
				@close="onClose"
			/>
			<KtButton v-else label="May I please try again?" @click="onClose" />
		</CodePreview>
		<!-- eslint-enable vue/no-useless-v-bind -->
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { KtBanner, KtButton } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'
import { info } from '~/utilities/toaster'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsBanner',
	components: {
		CodePreview,
		ComponentInfo,
		KtBanner,
		KtButton,
	},
	setup() {
		const closed = ref(false)

		return {
			closed,
			component: KtBanner,
			onAction: () => {
				info({ text: 'Banner action was clicked' })
			},
			onClose: () => {
				closed.value = !closed.value
			},
			Yoco,
		}
	},
})
</script>
