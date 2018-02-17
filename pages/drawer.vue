<template>
  <div>
    <h1 id="drawer">Drawer</h1>

<p>Drawer is another layer of the interface. It adds more information or functionality to the current layout without messing up the elements. </p>

<p>It is best to place secondary functionality or information in the drawer, and only present the most important elements or interaction in the workspace.</p>

<h2 id="structure">Structure</h2>
<img src="~/assets/img/drawer_structure.png" />
<ol>
<li><strong>Drawer:</strong> The size of drawer depends on information density. There are three sizes: <strong>Narrow</strong>, <strong>Wide</strong> and <strong>Full Open</strong>. </li>
<li><strong>Handles:</strong>  By clicking the handles, the drawer can be <strong>Full Open</strong> to display more information. </li>
<li><strong>Background:</strong> The background should be black <code>#000000</code> with 46% opacity.</li>
</ol>

  </div>
</template>

<script>
export default {
  name: 'Drawer'
}
</script>
