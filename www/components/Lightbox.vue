<template>
  <div class="lightbox">
    <div class="lightbox__preview c-hand" @click="onLightboxPreviewClick">
      <img :src="imgUrl" />
    </div>
    <transition name="modal">
      <div
        v-if="isLightBoxOpen"
        class="lightbox__bg c-hand"
        @click="onLightboxOpenClick"
      >
        <div class="lightbox__wrapper">
          <div class="lightbox__container">
            <img :src="imgUrl" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LightBox',
  props: {
    imgUrl: String,
    imgUrl2x: String
  },
  data () {
    return {
      isLightBoxOpen: false
    }
  },
  methods: {
    onLightboxPreviewClick() {
      this.isLightBoxOpen = true
    },
    onLightboxOpenClick() {
      this.isLightBoxOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.lightbox img {
  width: 100%;
  padding: 0.2rem;
}

.lightbox__preview {
  height: 100%;
  padding: 0;
  line-height: 0;
  border: 1px solid #dbdbdb;
}

.lightbox__bg {
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
  z-index: 998;
}

.lightbox__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.lightbox__container {
  max-width: 80%;
  margin: 0px auto;
  padding: 0.2rem;
  line-height: 0;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
