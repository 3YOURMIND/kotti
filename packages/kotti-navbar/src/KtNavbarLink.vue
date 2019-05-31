<template>
	<div class="navbar-link">
		<a
			v-if="isExternal"
			@click="$emit('menuLinkClick', link)"
			v-bind="$attrs"
			:href="link"
		>
			<slot />
		</a>
		<router-link
			v-else
			@click="$emit('menuLinkClick', link)"
			v-bind="$attrs"
			:to="link"
		>
			<slot />
		</router-link>
	</div>
</template>
<script>
export default {
	props: {
		link: { type: [Object, String], required: true },
		isExternal: { type: Boolean, default: false },
	},
}
</script>
