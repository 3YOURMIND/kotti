<template>
	<actionbar class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header">
				<slot name="actionbar-header">
					<h1>Header</h1>
				</slot>
			</div>
			<div class="actionbar-body">
				<slot name="actionbar-body">
					<p>Body</p>
				</slot>
			</div>
			<div class="actionbar-footer">
				<slot name="actionbar-body">
					<footer>Footer</footer>
				</slot>
			</div>
		</div>
	</actionbar>
</template>
<script>
export default {
	name: 'KtActionBar',
}
</script>
