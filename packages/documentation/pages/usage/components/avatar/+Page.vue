<template>
	<ComponentInfo :component="KtAvatar" />

	<KtForm v-model:value="ktAvatarSettings" size="small">
		<ComponentForm
			:component="KtAvatar"
			:props="ktAvatarProps"
			:slots="
				ktAvatarSettings.hasSlot ? [{ content: '...', name: 'content' }] : []
			"
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
			<template #content v-if="ktAvatarSettings.hasSlot">
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

	<KtForm v-model:value="ktAvatarGroupSettings" size="small">
		<ComponentForm
			:component="KtAvatarGroup"
			:propFormatters="propFormatters"
			:props="ktAvatarGroupProps"
			:slots="
				ktAvatarGroupSettings.hasSlot
					? [{ content: '...', scope: '{ item }', name: 'content' }]
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
			<template #content="{ item }" v-if="ktAvatarGroupSettings.hasSlot">
				<div style="display: flex; align-items: center; gap: var(--unit-1)">
					<KtAvatar :src="item.src" />
					<h4 v-text="item.name" />
				</div>
				<div style="display: flex; align-items: center; gap: var(--unit-1)">
					<span class="yoco" v-text="Yoco.Icon.LOCATION" />
					<span>Berlin, Germany</span>
				</div>
			</template>
		</ComponentForm>
	</KtForm>
</template>

<script lang="ts">
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
	KtRow,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from 'vue'

import ComponentForm from '~/components/component-form/ComponentForm.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAvatar',
	components: {
		ComponentForm,
		ComponentInfo,
		KtAvatar,
		KtAvatarGroup,
		KtFieldNumber,
		KtFieldSingleSelect,
		KtFieldText,
		KtFieldToggle,
		KtForm,
		KtFormControllerObject,
	},
	setup() {
		const ktAvatarSettings = ref({
			hasSlot: false,
			props: {
				isHoverable: true,
				name: 'Example User',
				size: null,
				src: 'https://picsum.photos/200/100',
			},
		})

		const ktAvatarGroupSettings = ref({
			hasSlot: false,
			props: {
				count: 3,
				isHoverable: true,
				isStack: false,
				size: null,
			},
		})

		return {
			ktAvatarProps: computed(() => ({
				...ktAvatarSettings.value.props,
				size: ktAvatarSettings.value.props.size ?? 'md',
			})),
			ktAvatarGroupProps: computed(() => ({
				...ktAvatarGroupSettings.value.props,
				items: [
					{ name: 'Beyoncé', src: 'https://picsum.photos/200' },
					{ name: 'Justin', src: 'https://picsum.photos/100' },
					{ name: 'Britney', src: 'https://picsum.photos/130' },
					{ name: 'Shakira', src: 'https://picsum.photos/140' },
					{ name: 'Rihanna', src: 'https://picsum.photos/150' },
				],
				size: ktAvatarGroupSettings.value.props.size ?? 'md',
			})),
			propFormatters: {
				items: (items: unknown) =>
					JSON.stringify(items, null, '\t').split('\n'),
			},
			sizeOptions: Object.entries(Kotti.Avatar.Size).map(([label, value]) => ({
				label,
				value,
			})),
			Kotti,
			KtAvatar,
			KtAvatarGroup,
			ktAvatarGroupSettings,
			ktAvatarSettings,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.user-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: var(--unit-4);
	gap: var(--unit-2);

	&__info {
		display: flex;
		flex-direction: column;
		word-wrap: break-word;
		gap: var(--unit-1);

		h2 {
			font-size: 1rem;
			margin: 0;
		}

		> * {
			display: flex;
			align-items: center;
			gap: var(--unit-1);
		}
	}
}
</style>
