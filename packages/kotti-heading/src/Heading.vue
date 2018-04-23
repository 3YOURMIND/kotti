<template>
<div class="h3-heading">
	<h3>
		<label v-text="text" />
		<span v-if="type==='action'" @click="handleClick">
			<i class="yoco" v-text="icon" /> {{actionText}}
		</span>
		<span v-if="type==='toggle'" @click="handleClick">
			<i class="yoco" v-if="!toggleStatus">plus</i>
			<i class="yoco" v-else>minus</i>
			{{toggleTextRep}}
		</span>
	</h3>
	<div v-if="toggleStatus && type==='toggle'">
		<slot />
	</div>
</div>
</template>


<script>
export default {
	name: 'KtModal',
	props: {
		text: {
			type: String,
			default: 'H3 Heading',
		},
		type: {
			type: String,
			default: 'default',
		},
		actionText: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: '',
		},
		toggleText: {
			type: String,
			default: 'View',
		},
		toggleCloseText: {
			type: String,
			default: 'Close',
		},
	},
	data() {
		return {
			toggleStatus: false,
		};
	},
	computed: {
		toggleTextRep() {
			return this.toggleStatus ? this.toggleCloseText : this.toggleText;
		},
	},
	methods: {
		handleClick(evt) {
			if (this.type === 'action') {
				this.$emit('click', evt);
			}
			this.toggleStatus = !this.toggleStatus;
		},
	},
};
</script>
