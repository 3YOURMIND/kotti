<template>
  <div :class="bannerClass">
  <div class="collapse">
    <div class="glyph">
      <span v-if="icon">
      <i class="yoco" v-text="icon"/>
      </span>
      <span v-else>
      <slot name="glyph" >
        <i class="yoco">announce</i>
      </slot>
      </span>
    </div>
    <div class="message" v-text="message" />
    <div class="action" v-if="!expandable" @click="handleClick">
      <button class="text" v-text="actionText"/>
    </div>
    <div class="action" v-else @click="isExpand=!isExpand">
        <button class="text" v-text="switchText" v-if="!isExpand" />
        <button class="text" v-text="switchCloseText" v-else/>
    </div>
  </div>
  <div class="expand" v-if="isExpand">
    <slot name="expand"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'Kt-Banner',
  data() {
    return {
      isExpand: false,
    };
  },
  props: {
    isGrey: {
      type: Boolean,
      default: false
    },
    message: String,
    icon: {
      type: String,
      default: 'announce'
    },
    actionText: {
      type: String,
      default: ''
    },
    switchText: {
      type: String,
      default: 'View',
    },
    switchCloseText: {
      type: String,
      default: 'Close',
    },
  },
  computed: {
    bannerClass() {
      return {
        banner: true,
        'banner-grey': this.isGrey,
      };
    },
    expandable() {
      return this.$slots.expand
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>
