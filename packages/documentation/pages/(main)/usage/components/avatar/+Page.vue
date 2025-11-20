<template>
	<ComponentInfo :component="KtAvatar" />

	<p>
		The <code>KtAvatar</code> component displays a user's avatar. It supports
		displaying an image from a URL and a hoverable popover with the user's name
		or custom content.
	</p>

	<KtForm v-model="ktAvatarSettings" size="small">
		<ComponentForm
			:component="KtAvatar"
			:props="ktAvatarProps"
			:slots="ktAvatarSettings.hasSlot ? [{ content, name: 'content' }] : []"
		>
			<template #component-form-settings>
				<div>
					<KtFormControllerObject formKey="props">
						<KtFieldToggle
							formKey="isHoverable"
							isOptional
							label="isHoverable"
							type="switch"
						/>
						<KtFieldText formKey="name" isOptional label="name" />
						<KtFieldSingleSelect
							formKey="size"
							isOptional
							label="size"
							:options="sizeOptions"
						/>
						<KtFieldText formKey="src" isOptional label="src" />
					</KtFormControllerObject>
				</div>
				<div>
					<KtFieldToggle
						formKey="hasSlot"
						isOptional
						label="Use Content Slot"
						type="switch"
					/>
				</div>
			</template>
			<template v-if="ktAvatarSettings.hasSlot" #content>
				<div class="user-container">
					<KtAvatar size="lg" :src="ktAvatarSettings.props.src" />
					<div class="user-container__info">
						<h2 v-text="ktAvatarSettings.props.name" />
						<div>
							<span class="yoco" v-text="Yoco.Icon.USER" />
							<span>email@example.com</span>
						</div>
						<div>
							<span class="yoco" v-text="Yoco.Icon.OFFICE" />
							<span>3yourmind GmbH</span>
						</div>
					</div>
				</div>
			</template>
		</ComponentForm>
	</KtForm>

	<ComponentInfo :component="KtAvatarGroup" />

	<p>
		The <code>KtAvatarGroup</code> component displays a group of avatars. Use it
		to represent a collection of users like team mempers or attendees to an
		event.
	</p>

	<KtForm v-model="ktAvatarGroupSettings" size="small">
		<ComponentForm
			:component="KtAvatarGroup"
			:propFormatters="propFormatters"
			:props="ktAvatarGroupProps"
			:slots="
				ktAvatarGroupSettings.hasSlot
					? [{ content: ['...'], scope: '{ item }', name: 'content' }]
					: []
			"
		>
			<template #component-form-settings>
				<div>
					<KtFormControllerObject formKey="props">
						<KtFieldNumber
							formKey="count"
							hideMaximum
							isOptional
							label="count"
							:maximum="ktAvatarGroupProps.items.length"
							:minimum="1"
						/>
						<KtFieldToggle
							formKey="isHoverable"
							isOptional
							label="isHoverable"
							type="switch"
						/>
						<KtFieldToggle
							formKey="isStack"
							isOptional
							label="isStack"
							type="switch"
						/>
						<KtFieldSingleSelect
							formKey="size"
							isOptional
							label="size"
							:options="sizeOptions"
						/>
					</KtFormControllerObject>
				</div>
				<div>
					<KtFieldToggle
						formKey="hasSlot"
						isOptional
						label="Use Content Slot"
						type="switch"
					/>
				</div>
			</template>
			<template v-if="ktAvatarGroupSettings.hasSlot" #content="{ item }">
				<div style="display: flex; gap: var(--unit-1); align-items: center">
					<KtAvatar :src="item.src" />
					<h4 v-text="item.name" />
				</div>
				<div style="display: flex; gap: var(--unit-1); align-items: center">
					<span class="yoco" v-text="Yoco.Icon.LOCATION" />
					<span>Berlin, Germany</span>
				</div>
			</template>
		</ComponentForm>
	</KtForm>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
	Kotti,
	KtAvatar,
	KtAvatarGroup,
	KtFieldNumber,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggle,
	KtForm,
	KtFormControllerObject,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

import ComponentForm from '~/components/component-form/ComponentForm.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'
import { info } from '~/utilities/toaster'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAvatar',
	components: {
		ComponentForm,
		ComponentInfo,
		KtAvatar,
		KtFieldNumber,
		KtFieldSingleSelect,
		KtFieldText,
		KtFieldToggle,
		KtForm,
		KtFormControllerObject,
	},
	setup() {
		const ktAvatarSettings = ref<{
			hasSlot: boolean
			props: Kotti.Avatar.Props
		}>({
			hasSlot: false,
			props: {
				isHoverable: true,
				name: 'Example User',
				size: 'md',
				src: 'https://picsum.photos/100/100',
			},
		})

		const ktAvatarGroupSettings = ref<{
			hasSlot: boolean
			props: Omit<Kotti.AvatarGroup.Props, 'items'>
		}>({
			hasSlot: false,
			props: {
				count: 3,
				isHoverable: true,
				isStack: false,
				size: 'md',
			},
		})

		return {
			content: [
				'<KtAvatar size="lg" :src="ktAvatarSettings.props.src" />',
				'<h2 v-text="ktAvatarSettings.props.name" />',
				'<div>',
				'	<span class="yoco" v-text="Yoco.Icon.USER" />',
				'	<span>email@example.com</span>',
				'</div>',
				'<div>',
				'	<span class="yoco" v-text="Yoco.Icon.OFFICE" />',
				'	<span>3yourmind GmbH</span>',
				'</div>',
			],
			Kotti,
			KtAvatar,
			KtAvatarGroup,
			ktAvatarGroupProps: computed(() => ({
				...ktAvatarGroupSettings.value.props,
				items: [
					{ name: 'Beyoncé', src: 'https://picsum.photos/200/200' },
					{ name: 'Justin', src: 'https://picsum.photos/100/100' },
					{ name: 'Britney', src: 'https://picsum.photos/130/130' },
					{ name: 'Shakira', src: 'https://picsum.photos/140/140' },
					{ name: 'Rihanna', src: 'https://picsum.photos/150/150' },
				],
				size: ktAvatarGroupSettings.value.props.size ?? 'md',
			})),
			ktAvatarGroupSettings,
			ktAvatarProps: computed(() => ({
				...ktAvatarSettings.value.props,
				onClick: () => info({ text: 'Avatar component was clicked' }),
				size: ktAvatarSettings.value.props.size ?? 'md',
			})),
			ktAvatarSettings,
			propFormatters: {
				items: (items: unknown) =>
					JSON.stringify(items, null, '\t').split('\n'),
			},
			sizeOptions: Object.entries(Kotti.Avatar.Size).map(([label, value]) => ({
				label,
				value,
			})),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.user-container {
	display: flex;
	flex-direction: row;
	gap: var(--unit-2);
	align-items: center;
	justify-content: space-between;
	padding: var(--unit-4);

	&__info {
		display: flex;
		flex-direction: column;
		gap: var(--unit-1);
		overflow-wrap: break-word;

		h2 {
			margin: 0;
			font-size: 1rem;
		}

		> * {
			display: flex;
			gap: var(--unit-1);
			align-items: center;
		}
	}
}
</style>
