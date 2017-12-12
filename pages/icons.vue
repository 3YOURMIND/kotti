<template>
  <div>
    <h1>Icons</h1>
    <h2>Yoco</h2>
    <div>
      <p>Youi uses designed icons -- <a href="https://3yourmind.github.io/yoco">Yoco</a></p>
    </div>
    <div class="columns">
      <yoco-preview class="column col-2 col-md-6"
      :icon="liga"
      v-for="liga in iconLigas"
      @click="copyLiga(liga)"
      :key="liga"/>
    </div>
    <h2>Design</h2>
  </div>
</template>

<script>
import YocoPreview from '~/components/YocoPreview.vue'
import YocoLiga from '~/assets/json/yocoString.json'

export default {
  name: 'icons',
  components: {
    YocoPreview
  },
  data () {
    return {
      iconLigas: YocoLiga.data,
      copySuccess: false
    }
  }
}
</script>
