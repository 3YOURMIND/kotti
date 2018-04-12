<template>
  <div>
    <h2>Metric</h2>
    <div>
      <p>
        Our metric is based on <code>4px</code>; we call this one unit. The
        unit can be used as a variable in
        <code>SCSS</code>. Table below shows the unit to pixel mapping.
      </p>
    </div>
    <table class="table table-striped table-hover">
      <tr>
        <th>Unit</th>
        <th>Pixel</th>
        <th>SCSS Variable</th>
        <th>in REM</th>
      </tr>
      <LayoutMetricTableRow
        :unit="1"
        :pixel="4"
        :rem="0.2"
      />
      <LayoutMetricTableRow
        :unit="2"
        :pixel="8"
        :rem="0.4"
      />
      <LayoutMetricTableRow
        :unit="4"
        :pixel="16"
        :rem="0.8"
      />
      <LayoutMetricTableRow
        :unit="6"
        :pixel="24"
        :rem="1.2"
      />
      <LayoutMetricTableRow
        :unit="8"
        :pixel="32"
        :rem="1.6"
      />
    </table>
    <h3>Padding and Margin</h3>
    <p>Following 3 types of margin or padding metric are suggested:</p>
    <ol>
      <li>
        <b>Border Margin:</b> the gap between element and window, the width is
        <code>24px</code>.
      </li>
      <li>
        <b>Block Margin:</b> the gap between two elements, the width is
        <code>24px</code>.
      </li>
      <li>
        <b>Element Padding:</b> the padding of elements.
      </li>
    </ol>
    <img src="~/assets/img/layout_metric.png" />
  </div>
</template>

<script>
import LayoutMetricTableRow from './LayoutMetricTableRow'

export default {
  name: 'LayoutMetric',
  components: {
    LayoutMetricTableRow
  }
}
</script>
