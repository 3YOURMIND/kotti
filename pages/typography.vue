<template>
<div>
  <h1>Typography</h1>
  <h2>Font</h2>
  <p>Youi use Open Sans as default font for all text, and includes two font-weight: Regular and Bold. 
  You can download fonts at <a href="https://fonts.google.com/specimen/Open+Sans">https://fonts.google.com/specimen/Open+Sans</a></p>
  <h2>Headers</h2>
  <div class="example-wrapper">
    <div class="hint">All header has padding top and bottom: 8px;</div>
    <div class="header page-header">H1 Page Header</div>
    <div class="hint">32px/48px Bold</div>
    <div class="header sub-header">H2 Subpage Header</div>
    <div class="hint">24px/32px Bold</div>
    <div class="header section-header">H3 Section Header</div>
    <div class="hint">16px/24px Bold #2C66C4 border-bottom</div>
  </div>
  <h2>Label text</h2>
  <div class="example-wrapper">
    <div class="label-text">label text</div>
    <div class="hint">12px/16px Bold #8A8A8A uppercase padding: 4px 0</div>
  </div>

  <h2>Paragraphs</h2>
  <div class="example-wrapper">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis enim et libero egestas tempus. Vestibulum eu
      ante vitae nulla mattis dapibus aliquet ac sapien. In consequat, dolor aliquet egestas ultricies, est ligula hendrerit
      sapien, sed suscipit ante tellus volutpat tellus. Morbi pharetra arcu et sodales fermentum. Vestibulum eget eleifend
      nulla, id blandit leo. </p>
    <p>Aenean id nulla eu est vulputate maximus at non nulla. Sed lobortis sodales dapibus. Aliquam pretium leo eu odio hendrerit,
      ac euismod purus malesuada. Suspendisse ultrices pellentesque tortor sit amet mattis. Donec efficitur, sapien at tempus
      semper, risus mauris mollis enim, et ultrices mi tellus quis turpis. Pellentesque in magna cursus, placerat nisl in,
      luctus dui. Sed quis neque at urna ullamcorper auctor pulvinar eget eros. Cras mattis rhoncus nibh sed convallis.</p>
  </div>


</div>
</template>

<style lang="scss" scoped>
.header {
  font-family: 'Open Sans';
  font-weight: 600;
  color: #3d3d3d;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #A8A8A8;
  padding: 8px 0 8px 0;
  background: rgba(255, 9, 9, .1);
}
.hint {
  color: #8a8a8a;
  line-height: 24px;
}
.page-header {
  font-size: 32px;
  line-height: 48px;
}
.sub-header {
  font-size: 24px;
  line-height: 32px;
}
.section-header {
  font-size: 16px;
  line-height: 24px;
  color: #2C66C4;
  border-bottom: 1px solid #2C66C4;
}
.label-text {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  padding: 4px 0;
  color: #8A8A8A;
  background: rgba(255, 9, 9, .2);
  text-transform: uppercase;
}

</style>
