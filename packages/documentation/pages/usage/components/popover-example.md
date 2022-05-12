```html
<KtPopover trigger="hover">
	<KtButton label="Close with Cancel Button" />
	<template #content="{ close }">
		<p>Save your message</p>
		<KtButton label="Cancel" type="text" @click="close" />
		<KtButton label="Save" type="primary" />
	</template>
</KtPopover>
```
