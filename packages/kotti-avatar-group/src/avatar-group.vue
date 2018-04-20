<template>
<div :class="styleObject">
  <KtAvatar
    v-for="(item , index) in items"
    :key="index"
    :name="item.name"
    :src="item.src"
    :selected="item.selected"
    :small="item.small"
    :showTooltip="showTooltip"
    v-if="index < showItems"
  />
  <div class="avatar avatar-number"
   v-if="avatarNumber>0">
    <span v-text="`+${avatarNumber}`"/>
  </div>
</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar';

export default {
	name: 'KtAvatarGroup',
	props: {
		items: Array,
		showItems: {
			type: Number,
			default: 2,
		},
		isStack: false,
		showTooltip: false,
	},
	components: {
		KtAvatar,
	},
	computed: {
		styleObject() {
			return {
				'avatar-group': true,
				stack: this.isStack,
			};
		},
		avatarNumber() {
			let number = this.items.length - this.showItems;
			return number;
		},
	},
};
</script>
