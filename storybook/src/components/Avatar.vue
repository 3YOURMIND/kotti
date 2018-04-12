<template>
  <Avatar :class="{'avatar-group': avatarGroup}">
      <div :class="styleObject" v-for="item in data" :key="item.name"
        :data-tooltip="item.name"
      >
      <img :src="item.src" v-if="item.src"/>
      <div class="avatar-fallback" v-else>
        <div class="head" />
        <div class="body" />
      </div>
    </div>
  </Avatar>
</template>

<script>
export default {
  name: 'Kotti-Avatar',
  props: {
    data: Array,
    selected: false,
    small: false,
    avatarGroup: true,
    showTooltip: false,
  },
  computed: {
    styleObject() {
      return {
        'avatar': true,
        'avatar--selected': this.selected,
        'avatar--sm': this.small,
        'tooltip tooltip-bottom': this.showTooltip
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.avatar-group {
  display: flex;
  flex-direction: row;
  .avatar:not(:first-of-type) {
    margin-left: -.8rem;
  }
}
.avatar {
  @for $i from 1 through 10 {
   &:nth-child(#{$i}) {
     z-index: #{10 - $i};
   }
  }
  background: #fff;
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  position: relative;
  border-radius: 100%;
  padding: .1rem;
  img {
    object-fit: cover;
    border-radius: 100%;
  }
}
.avatar--sm {
  width: 1.6rem;
  height: 1.6rem;
}
.avatar--selected {
  background: #2c64cc;
}

.avatar-fallback {
  .head {
    top: .5rem;
    left: .8rem;
    width: 0.7rem;
    height: 0.7rem;
    position: absolute;
    background: #fff;
    border-radius: 100%;
  }
  .body {
    top: 1.3rem;
    left: .6rem;
    position: absolute;
    width: 1.2rem;
    height: .6rem;
    background: #fff;
    border-radius: 50% 50% 0 0;
  }
}
</style>
