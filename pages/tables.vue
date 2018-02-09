<template>
  <div>
    <h1 id="tables">Tables</h1>
    <h2 id="elements">Elements</h2>
    <img src="~/assets/img/tables_overview.png" />
    <ol>
      <li>
        <strong>Table Heading:</strong> The table heading uses the same style as
        <code>label text</code>. The label of heading should be expressive the content of each column.</li>
      <li>
        <strong>Table row:</strong> The row content uses
        <code>default text</code> style.</li>
      <li>
        <strong>Table Hover Action Button:</strong> Some of the table row can have further action when its hovered.</li>
    </ol>
    <h2 id="width">Width</h2>
    <p>In most case the width of the table its parent&#39;s width.</p>
    <h2 id="content-alignment">Content alignment</h2>
    <p>Content should be left aligned except some common alignment style, such as price, currency. </p>
    <h2 id="responsive">Responsive</h2>
    <p>When display space is limited, some columns should be hide depends on the importance of the content. </p>
    <p>When content should not be hide, using horizontal scroll is better alternative.</p>

  </div>
</template>

<script>
export default {
  name: 'Tables'
}
</script>
