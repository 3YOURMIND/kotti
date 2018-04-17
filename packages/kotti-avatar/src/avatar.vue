<template>
	<div :class="styleObject" :data-tooltip="name"
  @click="handleClick"
  >
		<img :src="src" v-if="imgFallBack(src)" />
		<div class="avatar-fallback" v-else>
			<div class="head" />
			<div class="body" />
		</div>
	</div>
</template>

<script>
export default {
  name: 'Kt-Avatar',
  props: {
    name: '',
    src: '',
    selected: false,
    small: false,
    showTooltip: false,
  },
  computed: {
    styleObject() {
      return {
        avatar: true,
        'avatar--selected': this.selected,
        'avatar--sm': this.small,
        'tooltip tooltip-bottom': this.showTooltip,
      };
    },
  },
  methods: {
    imgFallBack(imgSrc) {
      if (imgSrc !== '' || imgSrc) {
        return true;
      }
      return false;
    },
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>
