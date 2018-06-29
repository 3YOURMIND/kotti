<template lang="md">
## Label text

![Laber Text Element](~/assets/img/typography_label_text.png)

| Element                                                                   | Basic Properties                                                       | UI Properties        |
|:--------------------------------------------------------------------------|:-----------------------------------------------------------------------|:---------------------|
| **Label Text**<br/>Secondary text to explain the default text.            | font-size: `12px`;<br/>font-weight: `600`;<br/>color: `$darkgray-300`; | line-height: `16px`; |
| **Default Text**<br/>Text style for default text.                         | font-size: `14px`;<br/>color: `$darkgray-500`;                         | line-height: `24px`; |
| **Key Text**<br/>Conveys information which is important for users.        | font-size: `24px`;<br/>font-weight: `600`;<br/>color: `$darkgray-500`; | line-height: `32px`; |
| **Addition information**<br/>Besides default text, adds visual hierarchy. | font-size: `16px`;<br/>font-weight: `600`;<br/>color: `$darkgray-500`; | line-height: `24px`; |
| **Action Button**<br/>Icon for actions.                                   | font-size: `16px`;<br/>color: `$primary-500`;                          | —                    |

<div class="element-example">
	<div class="label-value">
		<label>Label</label>
		<div class="default">Default Value</div>
	</div>
	<div class="label-value">
		<label>Label</label>
		<div class="key">Key Value</div>
	</div>
	<div class="label-value">
		<label>Label</label>
		<div class="addition">Ben Jackson</div>
		<div class="default">Bismarckstr. 10-12, Berlin</div>
	</div>
	<div class="label-value">
		<label>Label</label>
		<div class="addition">Ben Jackson</div>
		<div class="default">Bismarckstr. 10-12, Berlin</div>
		<div class="action"><i class="yoco">edit</i></div>
	</div>
</div>

```html
<div class="label-value">
	<label>Label</label>
	<div class="default">Default Value</div>
</div>
<div class="label-value">
	<label>Label</label>
	<div class="key">Key Value</div>
</div>
<div class="label-value">
	<label>Label</label>
	<div class="addition">Ben Jackson</div>
	<div class="default">Bismarckstr. 10-12, Berlin</div>
</div>
<div class="label-value">
	<label>Label</label>
	<div class="addition">Ben Jackson</div>
	<div class="default">Bismarckstr. 10-12, Berlin</div>
	<div class="action"><i class="yoco">edit</i></div>
</div>
```

</template>

<script>
export default {
	name: 'TypographyLabel',
}
</script>
