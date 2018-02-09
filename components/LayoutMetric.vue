<template>
  <div>
    <h2>Metric</h2>
    <div>
      <p>Our metric based on <code>4px</code> and we call it is one unit. The unit can be used as variable in
      <code>SCSS</code>. Table below shows the unit to pixel mapping.</p>
    </div>
    <table class="table table-striped table-hover">
      <tr>
        <th>Unit</th>
        <th>Pixel</th>
        <th>SCSS Variable</th>
        <th>in REM</th>
      </tr>
      <tr>
        <td>1 Unit</td>
        <td>4px</td>
        <td><code>$unit-1</code></td>
        <td><code>.2rem</code></td>
      </tr>
      <tr>
        <td>2 Unit</td>
        <td>8px</td>
        <td><code>$unit-2</code></td>
        <td><code>.4rem</code></td>
      </tr>
      <tr>
        <td>4 Unit</td>
        <td>16px</td>
        <td><code>$unit-4</code></td>
        <td><code>.8rem</code></td>
      </tr>
      <tr>
        <td>6 Unit</td>
        <td>24px</td>
        <td><code>$unit-6</code></td>
        <td><code>1.2rem</code></td>
      </tr>
      <tr>
        <td>8 Unit</td>
        <td>32px</td>
        <td><code>$unit-8</code></td>
        <td><code>1.6rem</code></td>
      </tr>
    </table>
    <h3>Padding and Margin</h3>
    <p>Following 3 types of margin or padding metric are suggested:</p>
    <ol>
      <li><b>Border Margin:</b> tha gap between element and window, the width is <code>24px</code>.</li>
      <li><b>Block Margin:</b> tha gap between two elements, the width is <code>24px</code>.</li>
      <li><b>Element Padding:</b> the padding of elements.</li>
    </ol><img src="~/assets/img/layout_metric.png">
  </div>
</template>

<script>
export default {
  name: 'LayoutMetric'
}
</script>
