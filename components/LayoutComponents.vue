<template>
  <div>
    <h2>Components</h2>
    <img src="~/assets/img/layout_overview.png" />
    <h3>Navbar</h3>
    <div>
      <p>
        The Navbar is the top-level navigation for the user. The width is fixed:
        <code>280px</code> or <code>14rem</code>. The background is
        <code>Primary-600 (#2659AB)</code>.
      </p>
    </div>
    <h3>Actionbar</h3>
    <div>
      <p>
        The actionbar is always located between the Navbar and Workspace, which can be
        omitted if necessary. The actionbar is considered to be an attachment to the Workspace.
        It represents addtional and important information for the Workspace.
      </p>
      <p>
        The width of Actionbar is also fixed: <code>320px</code> or
        <code>16rem</code>. The background color is
        <code>#F8F8F8</code>.
      </p>
      <p>
        The elements suggested on the Actionbar are: <b>primary action button</b>,
        Secondary action buttton, information which doesn't require complex interaction,
        and <b>sub-menu for the Workspace</b>.
      </p>
    </div>
    <h3>Workspace</h3>
    <div>
      <p>
        The workspace is designed as a space for related tasks, most interactions
        should be inside this area.
      </p>
      <p>
        The width of the Workspace is responsive: <code>90%</code> of the screen
        width. The background is
        <code>#FFFFFF</code>, with dropshadow: <code>1px 0 1px #DBDBDB</code>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutComponents'
}
</script>
