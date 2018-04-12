<template>
  <tr>
    <td>{{ unit }} Unit</td>
    <td>{{ pixel }}px</td>
    <td>
      <code>$unit-{{ unit }}</code>
    </td>
    <td>
      <code>{{ rem }}rem</code>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'LayoutMetricTableRow',
  props: {
    unit: Number,
    pixel: Number,
    rem: Number
  }
}
</script>

<style lang="scss" scoped>
</style>
