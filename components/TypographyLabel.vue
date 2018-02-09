<template>
<div>
  <h2>Label text</h2>
  <img src="~/assets/img/typography_label_text.png" />
  <table class="table table-striped table-hover">
  <tr>
    <th class="col-6"></th>
    <th class="col-3">Basic Properties</th>
    <th class="col-3">UI Properties</th>
  </tr>
  <tr>
    <td>
      <dl>
        <dt>1. Label Text</dt>
        <dd>Secondary text to explain the default text.</dd>
      </dl>
    </td>
    <td>
      <dd>font-size: 12px</dd>
      <dd>font-weight: 600</dd>
      <dd>color: <code>darkgrey-300</code></dd>
    </td>
    <td>
      <dd>line-height: 16px</dd>
    </td>
  </tr>
  <tr>
    <td>
      <dl>
        <dt>2. Default Text</dt>
        <dd>Text style in most case.</dd>
      </dl>
    </td>
    <td>
      <dd>font-size: 14px</dd>
      <dd>color: <code>darkgrey-500</code></dd>
    </td>
    <td>
      <dd>line-height: 24px</dd>
    </td>
  </tr>
  <tr>
    <td>
      <dl>
        <dt>3. Key Text</dt>
        <dd>Convey information which is rather important to users.</dd>
      </dl>
    </td>
    <td>
      <dd>font-size: 24px</dd>
      <dd>font-weight: 600</dd>
      <dd>color: <code>darkgrey-500</code></dd>
    </td>
    <td>
      <dd>line-height: 32px</dd>
    </td>
  </tr>
    <tr>
    <td>
      <dl>
        <dt>4. Addition information</dt>
        <dd>Besides default text, add visual hierarchy.</dd>
      </dl>
    </td>
    <td>
      <dd>font-size: 16px</dd>
      <dd>font-weight: 600</dd>
      <dd>color: <code>darkgrey-500</code></dd>
    </td>
    <td>
      <dd>line-height: 24px</dd>
    </td>
  </tr>
      <tr>
    <td>
      <dl>
        <dt>5. Text button icon</dt>
        <dd>Indicator for actions.</dd>
      </dl>
    </td>
    <td>
      <dd>font-size: 24px</dd>
      <dd>color: <code>primary-500</code></dd>
    </td>
    <td>
      <dd>line-height: 40px</dd>
    </td>
  </tr>
</table>
  </div>
</template>

<script>
export default {
  name: 'TypographyLabel'
}
</script>
