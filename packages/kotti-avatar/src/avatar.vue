<template>
	<div
		:class="avatarClass"
		:data-tooltip="name"
  	@click="handleClick"
  >
		<div v-if="this.src !='' && avatarFallback">
			<img :src="src" @error="imgFallBack()"/>
		</div>
		<div v-else
			:class="['avatar-fallback', {'avatar-fallback--small': small}]">
			<div class="avatar-fallback__head" />
			<div class="avatar-fallback__body" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Kt-Avatar',
	props: {
		name: '',
		src: {
			type: String,
			default: '',
		},
		selected: false,
		small: false,
		showTooltip: false,
	},
	data() {
		return {
			avatarFallback: true,
		};
	},
	computed: {
		avatarClass() {
			return {
				avatar: true,
				'avatar--selected': this.selected,
				'avatar--sm': this.small,
				'tooltip tooltip-bottom': this.showTooltip,
			};
		},
	},
	methods: {
		imgFallBack() {
			this.avatarFallback = false;
		},
		handleClick(evt) {
			this.$emit('click', evt);
		},
	},
};
</script>
