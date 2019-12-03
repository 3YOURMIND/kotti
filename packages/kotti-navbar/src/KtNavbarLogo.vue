<template>
	<div>
		<div v-if="isNarrow" :class="objectClass" @click="$emit('logoClick')">
			<i
				:class="iconClass"
				v-text="iconText"
				@click.stop="$KtNavbar.toggle()"
			/>
		</div>
		<div v-else :class="objectClass" @click="$emit('logoClick')">
			<div class="navbar-logo--logo">
				<slot />
			</div>
			<i
				:class="iconClass"
				v-text="iconText"
				@click.stop="$KtNavbar.toggle()"
			/>
		</div>
		<div class="navbar-logo--mobile">
			<div class="navbar-logo--logo">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarLogo',
	props: {
		labelText: { type: String, default: null },
	},
	methods: {
		handleToggleNarrowClicked() {
			this.$emit('toggleNarrowBar')
		},
	},
	computed: {
		iconClass() {
			return this.isNarrow ? 'yoco' : 'yoco expanded'
		},
		iconText() {
			return this.isNarrow ? 'burger' : 'hide_menu'
		},
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
		objectClass() {
			return {
				'navbar-logo': true,
				'navbar-logo--narrow': this.isNarrow,
			}
		},
	},
}
</script>
