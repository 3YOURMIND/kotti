<template>
	<div :class="avatarGroupClasses">
		<KtAvatar
			v-if="index < showItems"
			v-for="(item , index) in items"
			:key="index"
			:name="item.name"
			:src="item.src"
			:selected="item.selected"
			:small="item.small"
			:showTooltip="showTooltip"
		/>
		<div v-if="avatarRemainders > 0" class="avatar avatar-number">
			<span v-text="`+${avatarRemainders}`" />
		</div>
	</div>
</template>

<script>
import KtAvatar from '@3yourmind/kotti-avatar';

export default {
	name: 'KtAvatarGroup',
	components: {
		KtAvatar,
	},
	props: {
		items: Array,
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
	},
	computed: {
		avatarGroupClasses() {
			return {
				'avatar-group': true,
				stack: this.isStack,
			};
		},
		avatarRemainders() {
			return this.items.length - this.showItems;
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
