<template>
  <div class="color-palette">
    <div class="color-palette__title" v-text="colorName"/>
    <div class="color-palette__block c-hand"
      v-for="color in colors"
      @click="copyColor(color.code)"
      :style="{background: color.code}"
      :key="color.name">
      <div class="color-palette__name" v-text="color.name" />
      <div class="color-palette__code" v-text="color.code"/>
    </div>
     <div class="success-message" v-if="copySuccess">Copy Successed</div>
  </div>
</template>

<script>
export default {
  name: 'color-palette',
  props: {
    colorName: String,
    colors: Array,
    copySuccess: false
  },
  methods: {
    copyColor (string) {
      let vm = this
      let codeString = `${string}`
      this.$copyText(codeString).then(function (e) {
        console.log('success')
        vm.copySuccess = true
        setTimeout(() => {
          vm.copySuccess = false
        }, 2000)
      }, function (e) {
        alert('failed')
      })
    }
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
