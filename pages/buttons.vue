<template>
  <div>
    <h1>Button</h1>
    <div class="example-wrapper white columns">
      <div class="column col-3">
        <button class="yoda-btn primary c-hand">Primary</button>
      </div>
      <div class="column col-3">
      <button class="yoda-btn secondary c-hand">Secondary</button>
      </div>
      <div class="column col-3">
      <button class="yoda-btn danger c-hand">Danger</button>
      </div>
      <div class="column col-3">
      <button class="yoda-btn text c-hand">Text</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.yoda-btn {
  border: 0;
  width: 100%;
  border-radius: .1rem;
  height: 1.6rem;
  padding: 0 .8rem;
  text-transform: uppercase;
}
.primary {
  background: #2C66C4;
  color: #fff;
  &:hover {
    background: #2659AB;
  }
}
.secondary {
  background: #FFFFFF;
  color: #2C66C4;
  font-weight: 600;
  border: 1px solid #2C66C4;
  &:hover {
    color: #2659AB;
    border: 1px solid #2659AB;
    background: #f8f8f8;
  }
}
.danger {
  background: #f8f8f8;
  color: #D91919;
  font-weight: bold;
  &:hover {
    color: #fff;
    background: #D91919;
  }
}
.text {
  font-weight: bold;
  background: transparent;
  color: #2C66C4;
  &:hover {
    color: #2659AB;
    background: #f8f8f8;
  }
}
</style>
