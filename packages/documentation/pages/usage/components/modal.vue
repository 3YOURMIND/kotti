<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtForm v-model="settings">
			<KtFieldText formKey="title" isOptional label="title" />
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
			<KtFieldToggle
				formKey="showCloseButton"
				helpText="Shows a close button in the header when set"
				isOptional
				label="showCloseButton"
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
			:showCloseButton="settings.showCloseButton"
			:size="settings.size"
			:title="settings.title"
			@close="showModal = false"
		>
			<template v-if="settings.usedSlots.header" #header>
				<h2 style="margin: 0">This the modal title (from slot)</h2>
			</template>
			<template v-if="settings.usedSlots.body" #body>
				<p style="margin: 0; text-align: justify">
					Lorem ipsum dolor sit amet consectetur adipiscing, elit tellus
					convallis condimentum ac ornare, mattis duis aliquet eget ante. Cum
					nisi donec aliquam pretium habitasse pharetra natoque molestie
					penatibus nunc sociosqu per praesent, suspendisse dis dui urna integer
					vulputate curae magnis aptent nam volutpat. Cras dignissim fusce
					phasellus posuere dictumst ligula feugiat montes quis, nisl blandit
					vel nulla mus diam odio vitae, inceptos fringilla potenti facilisi
					mauris primis scelerisque vivamus metus, sodales tristique laoreet
					taciti tortor porttitor justo.
				</p>
				<br />
				<p style="margin: 0; text-align: justify">
					Ligula cras arcu sociosqu ornare quam justo gravida pretium, magna
					aenean neque praesent duis suspendisse eros vehicula, id cum primis
					velit et habitant mus. Suscipit curabitur vestibulum maecenas faucibus
					risus platea dapibus facilisis, purus aenean netus placerat auctor
					interdum litora, conubia vehicula habitant iaculis ultrices mi
					cubilia.
				</p>
				<br />
				<p style="margin: 0; text-align: justify">
					Neque in eros laoreet metus vivamus suscipit fringilla tellus dui,
					sociis molestie aptent nisl sodales ac tristique cubilia. Ligula
					platea nulla tortor id mus vehicula, aliquam dictumst pulvinar lacinia
					sollicitudin, conubia auctor per iaculis cursus. Dignissim ridiculus
					rutrum dui volutpat sapien massa interdum ornare proin, curabitur in
					sociis mauris congue potenti hendrerit sollicitudin, fringilla risus
					metus lacinia aenean suscipit felis eu.
				</p>
				<br />
				<p style="margin: 0; text-align: justify">
					Semper ut magnis senectus dictum primis in posuere ridiculus accumsan
					eros, mauris aenean a ligula per nulla odio vestibulum nam lobortis
					tortor, turpis morbi blandit sociis felis curae dignissim euismod
					penatibus. Natoque dui mus etiam felis primis himenaeos pretium diam
					aenean, curabitur aptent arcu ac viverra conubia nam purus. Iaculis
					nam scelerisque fringilla nisi curae aliquam leo ligula, vivamus
					fermentum vitae posuere suspendisse vestibulum class dictumst aliquet,
					tempus at augue volutpat neque massa dis.
				</p>
				<br />
				<p style="margin: 0; text-align: justify">
					A praesent magnis ridiculus iaculis diam facilisis libero cras
					facilisi placerat, neque nostra habitant lacus integer eleifend nisl
					convallis ultrices nec, molestie consequat rhoncus taciti primis dis
					nibh mus non. Hendrerit bibendum blandit eros fringilla class rutrum
					pulvinar, maecenas donec platea convallis a. Nunc netus nascetur erat
					feugiat cursus tristique class, dictum penatibus lobortis venenatis
					vitae leo, gravida duis egestas augue ornare facilisi.
				</p>
				<br />
				<p style="margin: 0; text-align: justify">
					Feugiat curae congue placerat porttitor molestie montes netus cras
					suscipit massa, ad dictum sodales inceptos blandit at mus ante natoque
					pulvinar lacinia, fames quisque arcu dis potenti libero lectus
					facilisi cubilia. Sed morbi mi conubia donec tempor massa justo
					eleifend, fames bibendum libero aptent purus sociis tellus fusce,
					neque vehicula phasellus mauris parturient pellentesque habitasse.
					Himenaeos luctus tristique lectus parturient venenatis eros nam
					gravida aenean, potenti pulvinar arcu ut leo rutrum mi curabitur
					hendrerit velit, urna bibendum enim convallis sagittis inceptos neque
					accumsan.
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
				showCloseButton: boolean
				size: Kotti.Modal.Size
				title: string
				usedSlots: {
					body: boolean
					footer: boolean
					header: boolean
				}
			}>({
				preventCloseOutside: false,
				showCloseButton: false,
				size: Kotti.Modal.Size.MEDIUM,
				title: 'This the modal title (from props)',
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
