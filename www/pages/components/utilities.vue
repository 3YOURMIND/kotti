<template lang="md">
	# Utilities

	## Text

	Text utility helps text format text.

	<div class="element-example white">
		<h4>Text Color</h4>
		<div class="text-primary">Text Primary</div>
		<div class="text-grey ">Text Grey</div>
		<div class="text-success">Text Succes</div>
		<div class="text-error">Text Error</div>
		<div class="text-warning">Text Warning</div>
	</div>

	```html
	<div class="text-primary">Text Primary</div>
	<div class="text-grey ">Text Grey</div>
	<div class="text-success">Text Succes</div>
	<div class="text-error">Text Error</div>
	<div class="text-warning">Text Warning</div>
	```

	<div class="element-example">
		<h4>Text Truncate</h4>
		<div class="text-truncate" style="width: 100px">Text Truncate - Long text string</div>
	</div>

	```html
	<div class="text-truncate" style="width: 100px">Text Truncate - Long text string</div>
	```

	<div class="element-example white">
		<h4>Text Alignment</h4>
		<div class="text-left">Text Left</div>
		<div class="text-center">Text Center</div>
		<div class="text-right">Text Warning</div>
		<div class="text-justify">
			Text Justify
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus eu lacus id volutpat.
			Nam finibus eu lacus id volutpat.
			Aenean eu viverra sem. In dapibus molestie nibh in aliquam.
		</div>
	</div>

	```html
	<div class="text-left">Text Left</div>
	<div class="text-center">Text Center</div>
	<div class="text-right">Text Warning</div>
	<div class="text-justify">Text Justify ...</div>
	```


	## Cursors

	Cursors utility specifies which mouse cursor to display when the mouse pointer is over an element.

	<div class="element-example">
	<span class="c-hand">Pointer cursor</span>
	<span class="c-move ">Move cursor</span>
	<span class="c-zoom-in">Zoom-in cursor</span>
	<span class="c-zoom-out">Zoom-out cursor</span>
	<span class="c-not-allowed">Not-allowed cursor</span>
	<span class="c-auto">Auto Cursor</span>
	</div>

	```html
	<div class="c-hand">Pointer cursor</div>
	<!-- Or Clickable -->
	<div class="clickable">Pointer cursor</div>
	<div class="c-move">Move cursor</div>
	<!-- Or Moveable -->
	<div class="movable">Move cursor</div>
	<div class="c-zoom-in">Zoom-in cursor</div>
	<div class="c-zoom-out">Zoom-out cursor</div>
	<div class="c-not-allowed">Not-allowed cursor</div>
	<div class="c-auto">Cursor based on the context.</div>
	```

	## Display

	Display utility helps to specifie which type of rendering box used for an element.

	```html
	<div class="d-inline">Inline</div>
	<div class="d-block">Block</div>
	<div class="d-inline-block">Inline Block</div>
	<div class="d-none">Display None</div>
	<div class="d-flex">Flex box</div>
	<div class="d-flex-row">Flex box from the left to the right</div>
	<div class="d-flex-column">Flex box from the up to the bottom</div>
	```

	## Position

	Position utility class to help you to layout and position element.
	The classes name follow `abbreviation-length` pattern. For example, `mt-1` means margin top with 1 unit size (or 4px).
	Since `8px` and `16px` used a lot for postion, there are also `mt-16px` and `mt-8px` for using.
	`element` and `block` is also included in margin class.

	```html
	<!-- Margin Class -->
	<div class="mt-0">Margin top 0px</div>
	<div class="mt-1">Margin top 4px</div>
	<div class="mr-2">Margin right 8px</div>
	<div class="mb-3">Margin bottom 12px</div>
	<div class="ml-4">Margin left 16px</div>
	<div class="mt-5">Margin top 20px</div>
	<div class="mb-6">Margin top 24px</div>

	<div class="mb-8px">Margin bottom 8px</div>
	<div class="ml-16px">Margin left 16px</div>

	<div class="mb-element">Margin bottom 16px</div>
	<div class="ml-block">Margin left 24px</div>

	<!-- Padding Class -->
	<div class="pt-0">Padding top 0px</div>
	<div class="pt-1">Padding top 4px</div>
	<div class="pr-2">Padding right 8px</div>
	<div class="pb-3">Padding bottom 12px</div>
	<div class="pl-4">Padding left 16px</div>
	<div class="pt-5">Padding top 20px</div>
	<div class="pb-6">Padding top 24px</div>

	<div class="pb-8px">Padding bottom 8px</div>
	<div class="pl-16px">Padding left 16px</div>
	<div class="pl-element">Padding left 16px</div>

	<!-- Float Class -->
	<div class="float-left">Float left</div>
	<div class="float-right">Float right</div>
	```

</template>

<style scoped>
.element-example span {
	margin-right: 8px;
	background: #fff;
	padding: 8px;
	line-height: 48px;
}
</style>
