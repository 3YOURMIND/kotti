<template lang="md">
# Icons

<icon-font />

<h2>
  Preview
  <span class="tooltip c-hand" data-tooltip="Click icon to copy">
  <i class="yoco">circle_question</i>
  </span>
</h2>

Youi uses designed icons -- [Yoco](https://www.github.com/3yourmind/yoco)

<div class="columns">
  <yoco-preview class="column col-2 col-md-6"
  :icon="liga"
  v-for="liga in iconLigas"
  @click="copyLiga(liga)"
  :key="liga"/>
</div>

</template>

<script>
import IconFont from '~/components/IconFont.vue'
import YocoPreview from '~/components/YocoPreview.vue'
import YocoLiga from '~/assets/json/yocoString.json'

export default {
  name: 'Icons',
  components: {
    YocoPreview, IconFont
  },
  data () {
    return {
      iconLigas: YocoLiga.data,
      copySuccess: false
    }
  }
}
</script>
