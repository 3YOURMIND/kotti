<template lang=md>
  # Grid System
  
  ## Gutter

  <div class="element-example">
    <KtRow :gutter="20">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="12"><div class="grid-content dark" /></KtCol>
    </KtRow>
  </div>

  ## Gap

  <div class="element-example">
    <KtRow :gap="20">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="8"><div class="grid-content dark" /></KtCol>
      <KtCol :span="10"><div class="grid-content light" /></KtCol>
    </KtRow>
    <KtRow :gap="20">
      <KtCol :span="6"><div class="grid-content light" /></KtCol>
      <KtCol :span="6"><div class="grid-content dark" /></KtCol>
      <KtCol :span="12"><div class="grid-content dark" /></KtCol>
    </KtRow>
  </div>

  ## Offset

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

  ## Alignment 

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

  ## Resposive
  
  <div class="element-example">
    <KtRow :gap="10">
      <KtCol :xs="24" :span="2"><div class="grid-content light" /></KtCol>
      <KtCol :sm="24" :span="3"><div class="grid-content dark" /></KtCol>
      <KtCol :md="24" :span="4"><div class="grid-content light" /></KtCol>
      <KtCol :lg="24" :span="5"><div class="grid-content dark" /></KtCol>
      <KtCol :xl="24" :span="6"><div class="grid-content light" /></KtCol>
    </KtRow>
  </div>


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
