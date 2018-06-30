<template>
	<transition name="drawer" mode="out-in">
		<div class="drawer-mask" @click.self="onOutsideDrawerClick">
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
				<div class="drawer-handle" @click="onDrawerHandleClick">
					<i v-if="isExpanded" class="yoco">
						chevron_right
					</i>
					<i v-else class="yoco">
						chevron_left
					</i>
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
		wide: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			isExpanded: false,
		}
	},
	computed: {
		drawerClass() {
			return {
				'drawer-container': true,
				'drawer-expand': this.isExpanded,
				'drawer-wide': this.wide,
			}
		},
	},
	methods: {
		onDrawerHandleClick() {
			this.isExpanded = !this.isExpanded
		},
		onOutsideDrawerClick() {
			if (this.closeOutside) {
				this.$emit('close')
			}
		},
	},
}
</script>
