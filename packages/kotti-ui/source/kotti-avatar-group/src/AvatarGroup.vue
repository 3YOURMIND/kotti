<template>
	<div :class="avatarGroupClasses">
		<div v-if="avatarRemainders > 0" class="avatar avatar-number">
			<span v-text="`+${avatarRemainders}`" />
		</div>
		<KtAvatar
			v-for="(item, index) in visibleItems"
			:key="index"
			:hoverable="hoverable"
			:name="item.name"
			:selected="item.selected"
			:showTooltip="showTooltip"
			:small="item.small"
			:src="item.src"
		/>
	</div>
</template>

<script>
// FIXME: Should be possible to import the kotti-avatar folder
import KtAvatar from '../../kotti-avatar/src/avatar.vue'

export default {
	name: 'KtAvatarGroup',
	components: {
		KtAvatar,
	},
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		showItems: {
			type: Number,
			default: 2,
		},
		isStack: {
			type: Boolean,
			default: false,
		},
		showTooltip: {
			type: Boolean,
			default: false,
		},
		hoverable: Boolean,
	},
	computed: {
		avatarGroupClasses() {
			return {
				'avatar-group': true,
				stack: this.isStack,
			}
		},
		avatarRemainders() {
			return this.items.length - this.showItems
		},
		reversedItems() {
			return [...this.items].reverse()
		},
		visibleItems() {
			return this.reversedItems.filter((item, index) => index < this.showItems)
		},
	},
}
</script>
