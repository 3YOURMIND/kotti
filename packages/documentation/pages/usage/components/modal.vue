<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtForm v-model="settings">
			<KtFieldSingleSelect
				formKey="size"
				isOptional
				label="size"
				:options="[
					{ label: 'sm', value: 'sm' },
					{ label: 'md (default)', value: 'md' },
					{ label: 'lg', value: 'lg' },
					{ label: 'xl', value: 'xl' },
				]"
			/>
			<KtFieldToggle
				formKey="preventCloseOutside"
				helpText="Disables closing the modal by clicking outside when set"
				isOptional
				label="preventCloseOutside"
				type="switch"
			/>
			<KtFieldToggleGroup
				formKey="usedSlots"
				isOptional
				label="Used Slots"
				:options="[
					{ label: 'header', key: 'header' },
					{ label: 'body', key: 'body' },
					{ label: 'footer', key: 'footer' },
				]"
			/>
		</KtForm>

		<KtModal :isOpen="showAnnouncement" @close="showAnnouncement = false">
			<template #body>
				<span> I am an announcement. I open by default </span>
			</template>
			<template #footer>
				<KtButton label="close" @click="showAnnouncement = false" />
			</template>
		</KtModal>

		<KtButton label="Open Modal" @click="showModal = true" />

		<KtModal
			:isOpen="showModal"
			:preventCloseOutside="settings.preventCloseOutside"
			:size="settings.size"
			@close="showModal = false"
		>
			<template v-if="settings.usedSlots.header" #header>
				<h2 style="margin: 0">This the modal title</h2>
			</template>
			<template v-if="settings.usedSlots.body" #body>
				<p style="margin: 0">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
				<p style="margin: 0">
					Nunc a sollicitudin libero, consectetur interdum ligula.
				</p>
			</template>
			<template v-if="settings.usedSlots.footer" #footer>
				<KtButton label="Close" @click="showModal = false" />
			</template>
		</KtModal>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import {
	Kotti,
	KtButton,
	KtFieldSingleSelect,
	KtFieldToggle,
	KtFieldToggleGroup,
	KtForm,
	KtModal,
} from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsModal',
	components: {
		ComponentInfo,
		KtButton,
		KtFieldSingleSelect,
		KtFieldToggle,
		KtFieldToggleGroup,
		KtForm,
		KtModal,
	},
	setup() {
		return {
			component: KtModal,
			settings: ref<{
				preventCloseOutside: boolean
				size: Kotti.Modal.Size
				usedSlots: {
					body: boolean
					footer: boolean
					header: boolean
				}
			}>({
				preventCloseOutside: false,
				size: Kotti.Modal.Size.MEDIUM,
				usedSlots: {
					body: true,
					footer: true,
					header: true,
				},
			}),
			showAnnouncement: ref(true),
			showModal: ref(false),
		}
	},
})
</script>
