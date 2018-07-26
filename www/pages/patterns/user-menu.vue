<template lang=md>

# User Menu

<a href="/examples/layouts">
	<button class="primary">Check The Example</button>
</a>

```html
<KtUserMenu userName="Jony'O Five" userStatus="Invisiable">
	<div slot="user-menu-items">
		<div class="user-menu__item">Settings</div>
		<div class="user-menu__item">User Profile</div>
		<div class="user-menu__item">Logout</div>
	</div>
</KtUserMenu>
```

## Usage

| Attribute       | Description                  | Type     | Accepted values | Default |
|:----------------|:-----------------------------|:---------|:----------------|:--------|
| `userAvatarSrc` | user avatar image src        | `String` | --              | --      |
| `userName`      | user name text               | `String` | --              | --      |
| `userStatus`    | status of user menu|`String` | --       | --              |         |

### Slots

| Slot Name         | Description |
|:------------------|:------------|
| `user-menu-items` | menu list   |

</template>

<script>
import KtNavbar from '../../../packages/kotti-navbar'

export default {
	name: 'KtNavbarDoc',
	components: {
		KtNavbar,
	},
}
</script>
