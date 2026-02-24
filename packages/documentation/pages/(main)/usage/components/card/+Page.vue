<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<h2>Standard Usage</h2>

		<CodePreview
			code='
			<KtCard imgUrl="https://picsum.photos/400/200">
				<template #card-header>
					<h2>Lorem Ipsum</h2>
				</template>
				<template #card-body>
					Lorem ipsum dolor [...]
				</template>
			</KtCard>

			<KtCard
				imgUrl="https://picsum.photos/400/200"
				primaryActionLabel="Confirm"
				secondaryActionLabel="Cancel"
			>
				<template #card-header>
					<h2>Lorem Ipsum</h2>
				</template>
				<template #card-body>
					Lorem ipsum [...]
				</template>
			</KtCard>
		'
			language="vue-html"
		>
			<div class="card-usage-standard">
				<KtCard v-bind="{ imgPosition }" imgUrl="https://picsum.photos/380/200">
					<template #card-header>
						<h2>Simple display</h2>
					</template>
					<template #card-body>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
							consequat nisl at nisl condimentum vehicula.
						</p>
					</template>
				</KtCard>

				<KtCard
					v-bind="{ imgPosition }"
					imgUrl="https://picsum.photos/390/200"
					primaryActionLabel="Confirm"
					secondaryActionLabel="Cancel"
				>
					<template #card-header>
						<h2>Example with buttons</h2>
					</template>
					<template #card-body>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
							consequat nisl at nisl condimentum vehicula.
						</p>
					</template>
				</KtCard>
			</div>
		</CodePreview>

		<CodePreview
			code='
			<KtCard
				imgUrl="https://picsum.photos/400/200"
				isImgLoading
			>
				<template #card-header>
					<h2>Lorem Ipsum</h2>
				</template>
				<template #card-body>
					Lorem ipsum [...]
				</template>
			</KtCard>

			<KtCard
				component="a"
				href="#"
				imgUrl="https://picsum.photos/400/200"
				isTextLoading
			>
				<template #card-header>
					<h2>Lorem Ipsum</h2>
				</template>
				<template #card-body>
					Lorem ipsum [...]
				</template>
			</KtCard>
		'
			language="vue-html"
		>
			<div class="card-usage-standard">
				<KtCard
					v-bind="{ imgPosition }"
					imgUrl="https://picsum.photos/400/200"
					isImgLoading
				>
					<template #card-header>
						<h2>Lorem Ipsum</h2>
					</template>
					<template #card-body>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
							consequat nisl at nisl condimentum vehicula.
						</p>
					</template>
				</KtCard>

				<KtCard
					component="a"
					href="#"
					v-bind="{ imgPosition }"
					imgUrl="https://picsum.photos/410/200"
					isTextLoading
				>
					<template #card-header>
						<h2>Lorem Ipsum</h2>
					</template>
					<template #card-body>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
							consequat nisl at nisl condimentum vehicula.
						</p>
					</template>
				</KtCard>
			</div>
		</CodePreview>

		<KtRow :gap="8">
			<KtCol :span="12">
				<KtFieldSingleSelect
					v-model="imgPosition"
					hideClear
					label="Image Position"
					:options="imgPositionOptions"
				/>
			</KtCol>
			<KtCol :span="12">
				<KtCard v-bind="{ imgPosition }" imgUrl="https://picsum.photos/420/300">
					<template #card-header>
						<h2>Lorem Ipsum</h2>
					</template>
					<template #card-body>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
							consequat nisl at nisl condimentum vehicula.
						</p>
					</template>
					<template #card-footer>
						<p>This is the end</p>
					</template>
				</KtCard>
			</KtCol>
		</KtRow>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import {
	Kotti,
	KtCard,
	KtCol,
	KtFieldSingleSelect,
	KtRow,
} from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsCards',
	components: {
		CodePreview,
		ComponentInfo,
		KtCard,
		KtCol,
		KtFieldSingleSelect,
		KtRow,
	},
	setup() {
		return {
			component: KtCard,
			imgPosition: ref<Kotti.Card.ImagePosition>(Kotti.Card.ImagePosition.TOP),
			imgPositionOptions: Object.entries(Kotti.Card.ImagePosition).map(
				([label, value]) => ({
					label,
					value,
				}),
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.card-usage-standard {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 30px;
}
</style>
