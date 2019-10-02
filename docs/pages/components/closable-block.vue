<template lang="md">

# Closable block



``` html
<KtClosableBlock title="Closable block">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtClosableBlock>
```

<KtClosableBlock title="Closable block">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtClosableBlock>

## Properties

| Attribute | Description                  | Type      | Accepted values | Default |
|:----------|:-----------------------------|:----------|:----------------|:--------|
| `label`   | label input field            | `String`  | —               | —       |
| `name`    | name attribute for the field | `String`  | —               | —       |
| `value`   | value                        | `Boolean` | —               | —       |

</template>
<script>
export default {
	name: 'KtClosableBlockDocs',
	data() {
		return {
			value1: true,
			value2: false,
		}
	},
}
</script>
