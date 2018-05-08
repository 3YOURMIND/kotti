<template>
<transition name="drawer" mode="out-in">
	<div class="drawer-mask" @click.self="away">
		<div :class="drawerClass">
			<div class="drawer-header">
				<slot name="drawer-header" />
			</div>
			<div class="drawer-body">
				<slot slot name="drawer-body" />
			</div>
			<div class="drawer-footer">
				<slot name="drawer-footer" />
			</div>
			<div class="drawer-handle" @click="isExpand=!isExpand">
				<i class="yoco" v-if="isExpand">chevron_right</i>
				<i class="yoco" v-else>chevron_left</i>
			</div>
		</div>
	</div>
</transition>
</template>

<script>
export default {
	name: 'KtDrawer',
	props: {
		closeOutside: {
			type: Boolean,
			default: true,
		},
		wide: true,
	},
	data() {
		return {
			isExpand: false,
		};
	},
	computed: {
		drawerClass() {
			return {
				'drawer-container': true,
				'drawer-expand': this.isExpand,
				'drawer-wide': this.wide,
			};
		},
	},
	methods: {
		away() {
			if (this.closeOutside) {
				this.$emit('close');
			}
		},
	},
};
</script>
