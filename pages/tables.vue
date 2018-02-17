<template>
  <div>
    <h1 id="tables">Tables</h1>
    <h2 id="elements">Elements</h2>
    <img src="~/assets/img/tables_overview.png" />
    <ol>
      <li>
        <strong>Table Heading:</strong> The table heading uses the same style as the
        <code>label text</code>. The heading should express the content of each column.</li>
      <li>
        <strong>Table row:</strong> The row content uses
        <code>default text</code> style.</li>
      <li>
        <strong>Table Hover Action Button:</strong> The table rows can imply further functionality when they are hovered over.</li>
    </ol>
    <h2 id="width">Width</h2>
    <p>In most cases the table is the same width as its parent.</p>
    <h2 id="content-alignment">Content alignment</h2>
    <p>Content should be left aligned except some common alignment style, such as price, currency. </p>
    <h2 id="responsive">Responsive</h2>
    <p>When display space is limited, some columns should be hidden depending on the importance of the content. </p>
    <p>When content should not be hidden, using horizontal scrolling is a better alternative.</p>

  </div>
</template>

<script>
export default {
  name: 'Tables'
}
</script>
