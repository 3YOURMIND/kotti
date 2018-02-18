<template>
  <div>
    <h2>Headers</h2>
    <img src="~/assets/img/typography_header.png" />
    <table class="table table-striped table-hover">
      <tr>
        <th class="col-6" />
        <th class="col-3">Basic Properties</th>
        <th class="col-3">UI Properties</th>
      </tr>
      <tr>
        <td>
          <dl>
            <dt>1. H1 Page header</dt>
            <dd>Without actionbar, the page header can be used in the workspace.</dd>
          </dl>
        </td>
        <td>
          <dd>font-size: 32px</dd>
          <dd>font-weight: 600</dd>
          <dd>
            color: <code>darkgrey-500</code>
          </dd>
        </td>
        <td>
          <dd>line-height: 48px</dd>
          <dd>margin-top: 24px</dd>
        </td>
      </tr>
      <tr>
        <td>
          <dl>
            <dt>2. H2 Subpage Header</dt>
            <dd>Used for second level header, or main title in action bar.</dd>
          </dl>
        </td>
        <td>
          <dd>font-size: 24px</dd>
          <dd>font-weight: 600</dd>
          <dd>
            color: <code>darkgrey-500</code>
          </dd>
        </td>
        <td>
          <dd>line-height: 32px</dd>
          <dd>margin-top: 16px</dd>
        </td>
      </tr>
      <tr>
        <td>
          <dl>
            <dt>3. H3 Section header</dt>
            <dd>
              Used to divide each section, can be used as a text button for actions.
            </dd>
          </dl>
        </td>
        <td>
          <dd>font-size: 32px</dd>
          <dd>font-weight: 600</dd>
          <dd>
            color: <code>primary-500</code>
          </dd>
        </td>
        <td>
          <dd>line-height: 24px</dd>
          <dd>margin-top: 16px</dd>
          <dd>padding-bottom: 8px</dd>
          <dd>
            border-bottom: 1px solid <code>lightgrey-400</code>
          </dd>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TypographyHeader'
}
</script>

<style lang="scss" scoped>
</style>
