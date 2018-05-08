<template>
  <div class="form-group">
  <label class="form-label" v-text="label"/>
  <slot></slot>
  </div>
</template>

<script>
export default {
	name: 'KtRadioGroup',
	props: {
		label: [String, Number],
	},
};
</script>
