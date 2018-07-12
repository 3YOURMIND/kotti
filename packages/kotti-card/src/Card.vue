<template>
	<div class="card">
		<div class="card-image" v-if="displayImagePostion('top')">
			<img :src="imgUrl" class="img-responsive">
		</div>
		<div class="card-header">
			<slot name="card-header"/>
		</div>
		<div class="card-image" v-if="displayImagePostion('middle')">
			<img :src="imgUrl" class="img-responsive">
		</div>
		<div class="card-body">
			<slot name="card-body"/>
		</div>
		<div class="card-footer" v-if="$slots['card-footer']">
			<slot name="card-footer"/>
		</div>
		<div class="card-image" v-if="displayImagePostion('bottom')">
			<img :src="imgUrl" class="img-responsive">
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
