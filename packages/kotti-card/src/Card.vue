<template>
	<div class="card">
		<div v-if="displayImagePostion('top')" class="card-image">
			<img :src="imgUrl" class="img-responsive" />
		</div>
		<div class="card-header">
			<slot name="card-header" />
		</div>
		<div v-if="displayImagePostion('middle')" class="card-image">
			<img :src="imgUrl" class="img-responsive" />
		</div>
		<div class="card-body">
			<slot name="card-body" />
		</div>
		<div v-if="$slots['card-footer']" class="card-footer">
			<slot name="card-footer" />
		</div>
		<div v-if="displayImagePostion('bottom')" class="card-image">
			<img :src="imgUrl" class="img-responsive" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtCard',
	props: {
		imgUrl: { default: '', type: String },
		imgPosition: { default: 'top', type: String },
	},
	methods: {
		displayImagePostion(position) {
			return this.imgUrl && this.imgPosition === position
		},
	},
}
</script>
