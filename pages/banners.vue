<template>
  <div>
    <h1>Banners</h1>
    <p>
      Banners can be used as an alert at the top of the screen to display
      critical messages or expandable information. It should not include a
      dismiss icon, and should only disappear once the problem is resolved.
    </p>
    <h2>Structure</h2>
    <img src="~/assets/img/banner_alert.png" alt="banner alert" />
    <ol>
      <li>
        <strong>Glyph icon:</strong> Indicates the type of this banner.
      </li>
      <li>
        <strong>Message:</strong> Give a short description of this issue or
        summary of an important message.
      </li>
      <li>
        <strong>Action:</strong> A textual call to action button to resolve this
        issue.
      </li>
    </ol>
    <h2>Banner Types</h2>
    <h3>Message Banner</h3>
    <p>
      Only use this type of banner when this issue will cause a significant error.
    </p>
    <h3>Expand Banner</h3>
    <p>
      It shows the most import message inside the banner but hides other
      information. Use it when you want to create a clear, non-interrupting
      interface.
    </p>
    <img src="~/assets/img/banner_expand.png" alt="expanded banner" />
  </div>
</template>

<script>
export default {
  name: 'Banners'
}
</script>

<style lang="scss" scoped>
</style>
