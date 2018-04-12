<template>
  <div :class="bannerClass">
  <div class="collapse">
    <div class="glyph">
      <slot name="glyph">
        <i class="yoco">announce</i>
      </slot>
    </div>
    <div class="message" v-text="message" />
    <div class="action" v-if="!expandable">
      <slot name="customAction"><button class="text">Action</button></slot>
    </div>
    <div class="action" v-else @click="isExpand=!isExpand">
        <button class="text" v-text="actionText" v-if="!isExpand" />
        <button class="text" v-text="actionTextSwitch" v-else/>
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
    }
  },
  props: {
    isGrey: false,
    expandable: false,
    message: String,
    actionText: {
      type: String,
      default: 'View'
    },
    actionTextSwitch: {
      type: String,
      default: 'Close'
    }
  },
  computed: {
    bannerClass() {
      return {
        'banner': true,
        'banner-grey': this.isGrey
      }
    }
  }
}
</script>
