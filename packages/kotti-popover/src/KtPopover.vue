<template>
	<transition name="popover">
		<div :class="`popover popover-${direction}`">
			<slot name="button"/>
			<div class="popover-container">
				<div class="card">
					<div v-if="title" class="card-header">
						<h2 v-text="title"/>
					</div>
					<div class="card-body">
						<slot name="body"/>
					</div>
					<div v-if="!minimal" class="card-footer">
						<slot name="footer">
							<button
								class="danger"
								v-t="'buttons.delete'"
							/>
							<button
								class="text"
								v-t="'buttons.cancel'"
							/>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'KtPopover',
	props: {
		direction: { default: 'bottom', type: String },
		minimal: { default: false, type: Boolean },
		title: { required: false, type: String },
	},
}
</script>
