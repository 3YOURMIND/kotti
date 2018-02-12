<template>
  <div>
    <h2>Paragraphs</h2>
    <img src="~/assets/img/typography_paragraph.png" />
    <table class="table table-striped table-hover">
      <tr>
        <th class="col-6"> </th>
        <th class="col-3">Basic Properties</th>
        <th class="col-3">UI Properties</th>
      </tr>
      <tr>
        <td>
          <dl>
            <dt>1. Paragraph Text</dt>
            <dd>Used for long form text.</dd>
          </dl>
        </td>
        <td>
          <dd>font-size: 14px</dd>
          <dd>
            color: <code>darkgrey-500</code>
          </dd>
        </td>
        <td>
          <dd>line-height: 21</dd>
        </td>
      </tr>
      <tr>
        <td>
          <dl>
            <dt>2. Pargraph Margin</dt>
            <dd>Maring bettween two paragraphs</dd>
          </dl>
        </td>
        <td>--</td>
        <td>
          <dd>margin-bottom: 16px</dd>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TypographyParagraphs'
}
</script>

<style lang="scss" scoped>
</style>

