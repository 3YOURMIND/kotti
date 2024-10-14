<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<h2>Standard Usage</h2>

		<CodePreview
			code='
			<KtCard imgUrl="https://picsum.photos/900/300">
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
		'
			language="vue-html"
		>
			<KtCard v-bind="{ imgPosition }" imgUrl="https://picsum.photos/900/300">
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
		</CodePreview>
		<br />

		<CodePreview
			code='
				<KtCard
					imgUrl="https://picsum.photos/900/300"
					primaryActionLabel="Confirm"
					secondaryActionLabel="Cancel"
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
			'
			language="vue-html"
		>
			<KtCard
				v-bind="{ imgPosition }"
				imgUrl="https://picsum.photos/900/300"
				primaryActionLabel="Confirm"
				secondaryActionLabel="Cancel"
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
		</CodePreview>
		<br />

		<div class="card-view-example-skeleton">
			<KtCard
				v-bind="{ imgPosition }"
				imgUrl="https://picsum.photos/900/300"
				:isImgLoading="true"
				:isTextLoading="true"
				primaryActionLabel="Confirm"
				secondaryActionLabel="Cancel"
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
		<br />
		<CodePreview language="vue-html">
			<KtCard>
				<template #card-header>
					<div>
						<h2>Lorem Ipsum</h2>
						<b>consectetur adipiscing elit</b>
					</div>
				</template>
				<template #card-body>
					<div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
							consequat nisl at nisl condimentum vehicula.
						</p>
					</div>
				</template>
				<template #card-footer>
					<div>
						<KtButton label="Button" />
					</div>
				</template>
			</KtCard>
		</CodePreview>

		<KtRow :gap="8">
			<KtCol :span="12">
				<KtFieldSingleSelect
					v-model:value="imgPosition"
					hideClear
					label="Image Position"
					:options="imgPositionOptions"
				/>
			</KtCol>
			<KtCol :span="12">
				<KtCard v-bind="{ imgPosition }" imgUrl="https://picsum.photos/900/300">
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
	KtButton,
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
		KtButton,
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
