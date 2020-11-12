<template>
	<div>
		<ComponentInfo :meta="meta" title="Modal" />

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
				formKey="closeOutside"
				helpText="Disables closing the modal by clicking outside when set to false. Defaults to true for compatibility reasons"
				isOptional
				label="closeOutside"
				type="switch"
			/>
			<KtFieldToggleGroup
				formKey="usedSlots"
				isOptional
				label="Used Slots"
				:options="[
					{ label: 'modal-header', key: 'header' },
					{ label: 'modal-body', key: 'body' },
					{ label: 'modal-footer', key: 'footer' },
				]"
			/>
		</KtForm>

		<KtButton label="Open Modal" @click="showModal = true" />

		<KtModal
			v-if="showModal"
			:closeOutside="settings.closeOutside"
			:size="settings.size"
			@close="showModal = false"
		>
			<template v-if="settings.usedSlots.header" #modal-header>
				<h2 style="margin: 0;">This the modal title</h2>
			</template>
			<template v-if="settings.usedSlots.body" #modal-body>
				<p style="margin: 0;">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
				<p style="margin: 0;">
					Nunc a sollicitudin libero, consectetur interdum ligula.
				</p>
			</template>
			<template v-if="settings.usedSlots.footer" #modal-footer>
				<KtButton label="Close" @click="showModal = false" />
			</template>
		</KtModal>
	</div>
</template>

<script lang="ts">
import { KtModal, Kotti } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsModal',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			meta: KtModal.meta,
			showModal: ref(false),
			settings: ref<{
				closeOutside: boolean
				size: Kotti.Modal.Size
				usedSlots: {
					body: boolean
					footer: boolean
					header: boolean
				}
			}>({
				closeOutside: true,
				size: Kotti.Modal.Size.MEDIUM,
				usedSlots: {
					body: true,
					footer: true,
					header: true,
				},
			}),
		}
	},
})
</script>
