<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<div class="element-example">
			<KtCard>
				<div slot="card-header">
					<h2>Lorem Ipsum</h2>
					<b>consectetur adipiscing elit</b>
				</div>
				<div slot="card-body">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
						consequat nisl at nisl condimentum vehicula.
					</p>
				</div>
				<div slot="card-footer">
					<KtButton label="Button" />
				</div>
			</KtCard>
		</div>

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
				<KtCard v-bind="{ imgPosition }" imgUrl="https://picsum.photos/900/300">
					<h2 slot="card-header">Lorem Ipsum</h2>
					<p slot="card-body">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
						consequat nisl at nisl condimentum vehicula.
					</p>
					<p slot="card-footer">This is the end</p>
				</KtCard>
			</KtCol>
		</KtRow>
	</div>
</template>

<script lang="ts">
import { Kotti, KtCard } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsCards',
	components: {
		ComponentInfo,
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
