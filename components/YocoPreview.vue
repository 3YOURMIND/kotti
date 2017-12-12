<template>
  <div class="icon-container" @click="copyLiga(icon)">
    <div>
      <i class="yoco" ref="liga">{{icon}}</i>
    </div>
    <div class="icon-liga">{{icon}}</div>
    <div class="success-message" v-if="copySuccess">Copied icon "{{icon}}"</div>
  </div>
</template>


<script>
export default {
  name: 'yoco-preview',
  props: {
    icon: String,
    copySuccess: false
  },
  methods: {
    copyLiga (string) {
      let vm = this
      let codeString = `<i class="yoco">${string}</i>`
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
.icon-container {
  float: left;
  text-align: center;
  padding: 24px;
  box-sizing: border-box;
}
.icon-container:hover {
  background: #f8f8f8;
  cursor: pointer;
  box-shadow: border-box;
  box-shadow: 0 2px 2px #ddd;
}
.icon-liga {
  font-size: 0.875em;
  line-height: 2em;
}
.icon-container .yoco {
  font-size: 32px!important;
}
</style>
