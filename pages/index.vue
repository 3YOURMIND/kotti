<template lang="md">

# Kotti Design System

## Overview

This design system helps to unify our design language and provides the documentation for further product design decisions. 
The Kotti design system has two main parts: foundation and components.

The foundation is higher level and works as a guideline for the whole system, which defines the layout, color, icons, typography and writing style. 
It also creates styles and characteristics which are different from other design systems.

Components are more concrete elements. They are pre-defined and cannot be changed in most cases. 
These components include banners, buttons, drawers and more.

## Design Principles

Design Principles are a set of considerations that helps teams with decision making. We named our design system based
on the design principles we use.

**Keen:** The design should encourage users to be willing to engage with the product.

**Okay:** It's okay to not follow the foundation, but there should be a strong reason. It's okay to break
the design principles but only when it's the only way to solve the requirement.

**Transparent:** By making design cues easy to perceive and detect, the user can process information smoothly without being aware of 
their presence.

**Timely:** The design needs to respond quickly and help the user finish their task in a timely matter.

**Intuitive:** The design should be intuitive and easy to understand, and decrease the learning curve.

## Update Logs

* **2018-03-05**
  * Updated `colors`;
  * Added implmentation examples for `typography`, `buttons`, `inputs` and `tables`;
  * Using `kotti-style` packages;
  * Add new component `loadings`.
* **2018-01-04** First document published

</template>


<script>
import Sidebar from '~/components/Sidebar.vue'

export default {
  name: 'Index',
  components: {
    Sidebar
  }
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  display: flex;
}

</style>
