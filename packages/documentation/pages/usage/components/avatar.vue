<template>
	<div>
		<ComponentInfo :component="KtAvatar" />

		<div class="element-example">
			<KtAvatar
				class="mr-16px"
				isHoverable
				name="Jony O'Five"
				src="https://picsum.photos/200/100"
			>
				<template #content>
					<h2 v-text="'This is some custom content'" />
				</template>
			</KtAvatar>
			<KtAvatar class="mr-16px" isHoverable name="Jony O'Five" />
			<KtAvatar class="mr-16px" isHoverable />
		</div>

		<ComponentInfo :component="KtAvatarGroup" />

		<div class="element-example">
			<KtAvatarGroup :count="3" isHoverable :items="avatarData" />
			<br />
			<KtAvatarGroup :count="3" isHoverable isStack :items="avatarData" />
		</div>

		<KtAvatarGroup :count="3" isHoverable isStack :items="avatarData" />

		<div class="element-example">
			<KtAvatarGroup :count="3" isHoverable isStack :items="avatarData" />
		</div>

		<div class="element-example">
			<KtAvatarGroup
				:count="3"
				isHoverable
				isStack
				:items="avatarData"
				:size="Kotti.Avatar.Size.SMALL"
			/>
		</div>

		<div class="element-example">
			<KtAvatarGroup
				:count="3"
				isHoverable
				isStack
				:items="avatarData"
				:size="Kotti.Avatar.Size.MEDIUM"
			/>
		</div>

		<div class="element-example">
			<KtAvatarGroup
				:count="3"
				isHoverable
				isStack
				:items="avatarData"
				:size="Kotti.Avatar.Size.LARGE"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Kotti, KtAvatar, KtAvatarGroup } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAvatar',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			avatarData: [
				{ name: 'Beyoncé', src: 'https://picsum.photos/200' },
				{ name: 'Justin', src: 'https://picsum.photos/100' },
				{ name: 'Britney', src: 'https://picsum.photos/130' },
				{ name: 'Shakira', src: 'https://picsum.photos/140' },
				{ name: 'Rihanna', src: 'https://picsum.photos/150' },
			],
			Kotti,
			KtAvatar,
			KtAvatarGroup,
		}
	},
})
</script>
