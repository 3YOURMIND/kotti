<template>
  <div>
    <h1>Layout</h1>
    <layout-components/>
    <layout-metric />
  </div>
</template>

<script>
import LayoutComponents from '~/components/LayoutComponents.vue'
import LayoutMetric from '~/components/LayoutMetric.vue'

export default {
  name: 'layout',
  components: {
    LayoutComponents, LayoutMetric
  }
}
</script>
