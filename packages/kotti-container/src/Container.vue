<template>
	<div class="d-flex responsive">
		<slot name="navbar" />
		<acionbar class="actionbar" v-if="hasActionBar">
			<slot name="actionbar"/>
		</acionbar>
		<workspace class="workspace">
			<slot name="workspace" />
		</workspace>
	</div>
</template>

<script>
export default {
	name: 'KtContainer',
	props: {
		hasActionBar: { type: Boolean, default: false },
	},
}
</script>
