<template lang="md">
<ComponentInfo v-bind="{ component }" />

<nuxt-link to="/examples/layouts">
	<button class="primary">Show Layout Example</button>
</nuxt-link>

```html
<KtUserMenu userName="Jony'O Five" userStatus="Invisible">
	<div slot="user-menu-items">
		<div class="user-menu__item">Settings</div>
		<div class="user-menu__item">User Profile</div>
		<div class="user-menu__item">Logout</div>
	</div>
</KtUserMenu>
```

## Usage

| Attribute       | Description           | Type     | Accepted values | Default          |
|:----------------|:----------------------|:---------|:----------------|:-----------------|
| `userAvatarSrc` | user avatar image src | `String` | —               | —                |
| `userName`      | user name text        | `String` | —               | —                |
| `userStatus`    | status of user menu   | `String` | —               | —                |
</template>

<script lang="ts">
import { KtUserMenu } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageLayoutsUserMenu',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtUserMenu,
		}
	},
})
</script>
