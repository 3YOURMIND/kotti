<template>
  <div class="color-palette">
    <div class="color-palette__title" v-text="colorName"/>
    <div class="color-palette__block"
      v-for="color in colors"
      :style="{background: color.code}"
      :key="color.name">
      <div class="color-palette__name" v-text="color.name"/>
      <div class="color-palette__code" v-text="color.code"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'color-palette',
  props: {
    colorName: String,
    colors: Array
  }
}
</script>


<style lang="scss" scoped>
.color-palette {
  margin: 1rem 0;
}
.color-palette__title {
  font-size: 1em;
  color: #8f8f8f;
  line-height: 1.55em;
}
.color-palette__block {
  box-sizing: border-box;
  height: 2.4rem;
  font-size: 0.875em;
  padding: 0 .8rem;
  color: #fff;
  margin: .1rem 0;
  display: block;
  &:hover {
    .color-palette__code {
      display: inline;
    }
  }

}
.color-palette__name {
  line-height: 2.4rem;
  float: left;
}
.color-palette__code {
  text-align: right;
  line-height: 2.4rem;
  width: 50%;
  float: right;
  display: none;
}
</style>
