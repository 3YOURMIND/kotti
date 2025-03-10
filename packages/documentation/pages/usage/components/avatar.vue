<template>
	<div>
		<ComponentInfo :component="KtAvatar" />
		<KtAvatar v-bind="{ ...avatarSettings }">
			<template v-if="avatarSettings.showContentSlot" #content>
				<div class="user-container">
					<KtAvatar size="lg" :src="avatarSettings.src" />
					<div class="user-container__info">
						<h3 v-text="avatarSettings.name" />
						<div>
							<span class="yoco" v-text="Yoco.Icon.USER" />
							<span> email@example.com </span>
						</div>
						<div>
							<span class="yoco" v-text="Yoco.Icon.OFFICE" />
							<span>3yourmind GmbH</span>
						</div>
					</div>
				</div>
			</template>
		</KtAvatar>
		<div class="wrapper">
			<KtForm v-model="avatarSettings" size="small">
				<KtFieldSingleSelect
					formKey="size"
					hideClear
					isOptional
					label="size"
					:options="sizeOptions"
				/>
				<KtFieldToggle
					formKey="showContentSlot"
					isOptional
					label="show content slot"
					type="switch"
				/>
				<KtFieldToggle
					formKey="isHoverable"
					isOptional
					label="isHoverable"
					type="switch"
				/>
			</KtForm>
		</div>
		<ComponentInfo :component="KtAvatarGroup" />
		<KtAvatarGroup v-bind="{ ...avatarGroupSettings }">
			<template v-if="avatarGroupSettings.showContentSlot" #content="{ item }">
				<KtRow>
					<KtAvatar :src="item.src" />
					<h4 v-text="item.name" />
				</KtRow>
				<KtRow>
					<span class="yoco" v-text="Yoco.Icon.LOCATION" />
					<p>Berlin, Germany</p>
				</KtRow>
			</template>
		</KtAvatarGroup>
		<div class="wrapper">
			<KtForm v-model="avatarGroupSettings" size="small">
				<KtFieldSingleSelect
					formKey="size"
					hideClear
					isOptional
					label="size"
					:options="sizeOptions"
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
				<KtFieldNumber
					formKey="count"
					hideMaximum
					isOptional
					label="count"
					:maximum="avatarGroupSettings.items.length"
					:minimum="1"
				/>
				<KtFieldToggle
					formKey="showContentSlot"
					isOptional
					label="show content slot"
					type="switch"
				/>
			</KtForm>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Kotti, KtAvatar, KtAvatarGroup } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAvatar',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			avatarGroupSettings: ref<
				Kotti.AvatarGroup.Props & { showContentSlot: boolean }
			>({
				count: 1,
				isHoverable: false,
				isStack: false,
				items: [
					{ name: 'Beyoncé', src: 'https://picsum.photos/200' },
					{ name: 'Justin', src: 'https://picsum.photos/100' },
					{ name: 'Britney', src: 'https://picsum.photos/130' },
					{ name: 'Shakira', src: 'https://picsum.photos/140' },
					{ name: 'Rihanna', src: 'https://picsum.photos/150' },
				],
				showContentSlot: false,
				size: Kotti.Avatar.Size.MEDIUM,
			}),
			avatarSettings: ref<Kotti.Avatar.Props & { showContentSlot: boolean }>({
				isHoverable: false,
				name: "Jony O'Five",
				showContentSlot: false,
				size: Kotti.Avatar.Size.MEDIUM,
				src: 'https://picsum.photos/200/100',
			}),
			Kotti,
			KtAvatar,
			KtAvatarGroup,
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
@import '../../../styles/form-fields.scss';

.user-container {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	padding: var(--unit-4);

	&__info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-left: var(--unit-2);
		word-wrap: break-word;
	}
}
</style>
