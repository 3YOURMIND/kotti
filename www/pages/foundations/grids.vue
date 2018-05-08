<template lang=md>
  # Grid System
  
  Kotti uses 24 columns `span` grid system. With `row` and `col` it can create dynamic layout. 
  Grid can be also easily customized.

  <div class="element-example">
    <KtRow>
      <KtCol :span="2"><div class="grid-content light" /></KtCol>
      <KtCol :span="4"><div class="grid-content dark" /></KtCol>
      <KtCol :span="8"><div class="grid-content light" /></KtCol>
      <KtCol :span="10"><div class="grid-content light" /></KtCol>
    </KtRow>  
  </div>

  ```html
  <KtRow>
    <KtCol :span="2"><div class="grid-content light" /></KtCol>
    <KtCol :span="4"><div class="grid-content dark" /></KtCol>
    <KtCol :span="8"><div class="grid-content light" /></KtCol>
    <KtCol :span="10"><div class="grid-content light" /></KtCol>
  </KtRow>  
  ```

  ## Gutter

  The gutter in Kotti is `16px` (`8px` on each side of a column). 
  You can change the gutter size by `gutter`.

  <div class="element-example">
    <KtRow :gutter="20">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="12"><div class="grid-content dark" /></KtCol>
    </KtRow>
  </div>

  ```html
  <KtRow :gutter="20">
    <KtCol :span="6"><div class="grid-content light" /></KtCol>
    <KtCol :span="6"><div class="grid-content dark" /></KtCol>
    <KtCol :span="12"><div class="grid-content dark" /></KtCol>
  </KtRow>
  ```

  ## Gap

  By default there is no gap between two rows, and `gap` attribute 
  specifies the number of pixes between two rows. 

  <div class="element-example">
    <KtRow :gap="20" :gutter="0">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="8"><div class="grid-content dark" /></KtCol>
      <KtCol :span="10"><div class="grid-content light" /></KtCol>
    </KtRow>
    <KtRow :gap="20" :gutter="0">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="12"><div class="grid-content dark" /></KtCol>
    </KtRow>
  </div>

  ```html
  <KtRow :gap="20" :gutter="0">
    <KtCol :span="6"><div class="grid-content light" /></KtCol>
    <KtCol :span="8"><div class="grid-content dark" /></KtCol>
    <KtCol :span="10"><div class="grid-content light" /></KtCol>
  </KtRow>
  <KtRow :gap="20" :gutter="0">
    <KtCol :span="6"><div class="grid-content light" /></KtCol>
    <KtCol :span="6"><div class="grid-content dark" /></KtCol>
    <KtCol :span="12"><div class="grid-content dark" /></KtCol>
  </KtRow>
  ```

  ## Offset

  `offset` attribute specifies the number of column offset from left.

  <div class="element-example">
    <KtRow :gutter="20" :gap="20">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6" :offset="6"><div class="grid-content dark" /></KtCol>
    </KtRow>
    <KtRow :gutter="20" :gap="20">
      <KtCol :span="6" :offset="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
    </KtRow>
  </div>

  ```html
  <KtRow :gutter="20" :gap="20">
    <KtCol :span="6"><div class="grid-content light" /></KtCol>
    <KtCol :span="6" :offset="6"><div class="grid-content dark" /></KtCol>
  </KtRow>
  <KtRow :gutter="20" :gap="20">
    <KtCol :span="6" :offset="6"><div class="grid-content light" /></KtCol>
    <KtCol :span="6"><div class="grid-content dark" /></KtCol>
  </KtRow>
  ```

  ## Alignment 

  You can change the justify of columns in one row by set `justify` attribute in `row`.

  <div class="element-example">
    <KtRow :gutter="20" :gap="20">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
    </KtRow>
    <KtRow :gutter="20" :gap="20" justify="center">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
    </KtRow>
    <KtRow :gutter="20" :gap="20" justify="end">
      <KtCol :span="10"><div class="grid-content light" /></KtCol>
      <KtCol :span="10"><div class="grid-content dark" /></KtCol>
    </KtRow>
  </div>

  ```html
  <KtRow :gutter="20" :gap="20" justify="center">
    <KtCol :span="6"><div class="grid-content light" /></KtCol>
    <KtCol :span="6"><div class="grid-content dark" /></KtCol>
    <KtCol :span="6"><div class="grid-content light" /></KtCol>
  </KtRow>
  <KtRow :gutter="20" :gap="20" justify="end">
    <KtCol :span="10"><div class="grid-content light" /></KtCol>
    <KtCol :span="10"><div class="grid-content dark" /></KtCol>
  </KtRow>
  ```

  When columns has different height, `align` attribute specifies the columns alignment.

  <div class="element-example">
    <KtRow :gutter="20" :gap="20">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="12"><div class="grid-content tall light" /></KtCol>
    </KtRow>
    <KtRow :gutter="20" :gap="20" align="center">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="12"><div class="grid-content tall light" /></KtCol>
    </KtRow>
    <KtRow :gutter="20" :gap="20" align="bottom">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="12"><div class="grid-content tall light" /></KtCol>
    </KtRow>
  </div>

  ```html
  <KtRow :gutter="20" :gap="20" align="center">
    <KtCol :span="6"><div class="grid-content light" /></KtCol>
    <KtCol :span="6"><div class="grid-content dark" /></KtCol>
    <KtCol :span="12"><div class="grid-content tall light" /></KtCol>
  </KtRow>
  <KtRow :gutter="20" :gap="20" align="bottom">
    <KtCol :span="6"><div class="grid-content light" /></KtCol>
    <KtCol :span="6"><div class="grid-content dark" /></KtCol>
    <KtCol :span="12"><div class="grid-content tall light" /></KtCol>
  </KtRow>
  ```

  ## Resposive
  
  There are five media query breakpoints: `xs: 480px`, `sm: 600px`, `md: 840px` , `lg: 960px` and `xl: 1280px`.
  Breakpoint attribute accept `Number` as `span`. 

  <div class="element-example">
    <KtRow :gap="10">
      <KtCol :xs="24" :span="2"><div class="grid-content light" /></KtCol>
      <KtCol :sm="24" :span="3"><div class="grid-content dark" /></KtCol>
      <KtCol :md="24" :span="4"><div class="grid-content light" /></KtCol>
      <KtCol :lg="24" :span="5"><div class="grid-content dark" /></KtCol>
      <KtCol :xl="24" :span="6"><div class="grid-content light" /></KtCol>
    </KtRow>
  </div>

  ```html
  <KtRow :gap="10">
    <KtCol :xs="24" :span="2"><div class="grid-content light" /></KtCol>
    <KtCol :sm="24" :span="3"><div class="grid-content dark" /></KtCol>
    <KtCol :md="24" :span="4"><div class="grid-content light" /></KtCol>
    <KtCol :lg="24" :span="5"><div class="grid-content dark" /></KtCol>
    <KtCol :xl="24" :span="6"><div class="grid-content light" /></KtCol>
  </KtRow>
  ```

</template>

<script>
import KtRow from '../../../packages/kotti-row';
import KtCol from '../../../packages/kotti-col';

export default {
	name: 'KtGridDoc',
	components: {
		KtRow,
		KtCol,
	},
};
</script>

<style lang="scss">
.grid-content {
	height: 40px;
	border-radius: 4px;
	opacity: 0.46;
	&.light {
		background: #3173de;
	}
	&.dark {
		background: #afc5e8;
	}
	&.tall {
		height: 80px;
	}
}
</style>
