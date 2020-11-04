<template lang="md">
<ComponentInfo title="Forms" :meta="meta" />

## Input Types

### Text

<div class="form-group">
	<label class="form-label" for="input-example-1">Name</label>
	<input type="text" class="form-input" placeholder="Add your name" />
</div>

```html
<div class="form-group">
	<label class="form-label" for="input-example-1">Name</label>
	<input type="text" class="form-input" placeholder="Add your name" />
</div>
```

### Select

<div class="form-group">
	<label class="form-label">options</label>
	<select class="form-select">
		<option>Default options</option>
		<option>Second options</option>
	</select>
</div>

```html
<div class="form-group">
	<label class="form-label">options</label>
	<select class="form-select">
		<option>Default options</option>
		<option>Second options</option>
	</select>
</div>
```


### Radio

<div class="form-group">
	<label class="form-label">Gender</label>
	<label class="form-radio">
		<input type="radio" name="gender" checked />
		<i class="form-icon" /> Male
	</label>
	<label class="form-radio">
		<input type="radio" name="gender" />
		<i class="form-icon" /> Female
	</label>
</div>

```html
<div class="form-group">
	<label class="form-label">Gender</label>
	<label class="form-radio">
		<input type="radio" name="gender" checked />
		<i class="form-icon" /> Male
	</label>
	<label class="form-radio">
		<input type="radio" name="gender" />
		<i class="form-icon" /> Female
	</label>
</div>
```

### Switch


<div class="form-group">
	<label class="form-switch">
		<input type="checkbox" />
		<i class="form-icon" /> Send me emails with news and tips
	</label>
</div>

<div class="form-group">
	<label class="form-switch form-switch-right w-100">
		<input type="checkbox" />
		<i class="form-icon" /> Switch is on the right side
	</label>
</div>

```html
<div class="form-group">
	<label class="form-switch">
		<input type="checkbox" />
		<i class="form-icon" /> Send me emails with news and tips
	</label>
</div>

<div class="form-group">
	<label class="form-switch form-switch-right w-100">
		<input type="checkbox" />
		<i class="form-icon" /> Switch is on the right side
	</label>
</div>
```

### Checkbox

<div class="form-group">
	<label class="form-checkbox">
		<input type="checkbox" />
		<i class="form-icon" /> Remember me
	</label>
</div>

```html
<div class="form-group">
	<label class="form-checkbox">
		<input type="checkbox" />
		<i class="form-icon" /> Remember me
	</label>
</div>
```

## Input Group

When an value needs a fixed prefix or suffix, in order to make sure user doesn't put it in input field,
use an add-on input to indicate that system has already pre-input this value.

<div class="form-group">
	<label class="form-label" for="input-example-1">Price</label>
	<div class="input-group">
		<span class="input-group-addon">$</span>
		<input type="text" class="form-input" placeholder="..." />
	</div>
</div>

```html
<div class="form-group">
	<label class="form-label" for="input-example-1">Price</label>
	<div class="input-group">
		<span class="input-group-addon">$</span>
		<input type="text" class="form-input" placeholder="..." />
	</div>
</div>
```

## Form Validation

There are three types of validation: `is-error`, `is-success` and `is-warning`.

<div class="form-group is-error">
	<label class="form-label">Name</label>
	<input class="form-input" type="text" placeholder="Search 3D Project" />
</div>

<div class="form-group">
	<label class="form-label">Email</label>
	<input class="form-input" type="email" placeholder="Non email text will be invalid" value="Change to email address" />
</div>

<div class="form-group is-success">
	<label class="form-label">Select options</label>
	<select class="form-select">
		<option>Default options</option>
		<option>Second options</option>
	</select>
</div>

<div class="form-group is-warning">
	<label class="form-label">Gender</label>
	<label class="form-radio">
		<input type="radio" name="gender" checked />
		<i class="form-icon" /> Male
	</label>
	<label class="form-radio">
		<input type="radio" name="gender" />
		<i class="form-icon" /> Female
	</label>
</div>

```html
<div class="form-group is-error">
	<label class="form-label">Name</label>
	<input class="form-input" type="text" placeholder="Search 3D Project" />
</div>
<div class="form-group is-success">
	...
</div>
<div class="form-group is-warning">
	...
</div>
```

## Form Icons

You can add icon to `input` and `select` elements by adding `has-icon-left` or `has-icon-right`.

<div class="element-example">
	<div class="columns">
	<div class="column col-6">
		<div class="form-group">
			<div class="has-icon-right">
				<input class="form-input" type="text" placeholder="Search 3D Project" />
				<i class="form-icon yoco">search</i>
			</div>
		</div>
	</div>
	<div class="column col-6">
		<div class="form-group">
			<div class="has-icon-left">
			<select class="form-select">
				<option>Default options</option>
				<option>Second options</option>
			</select>
			<i class="yoco form-icon">cloud</i>
			</div>
		</div>
	</div>
	</div>
</div>

```html
<div class="form-group">
	<div class="has-icon-right">
		<input class="form-input" type="text" placeholder="Search 3D Project" />
		<i class="form-icon yoco">search</i>
	</div>
</div>
```

## From Disabled

Add the `disabled` attribute to the element or `<fieldset />` for a disabled form components style.

<fieldset disabled>
	<div class="form-group">
		<label class="form-label" for="input-example-1">Name</label>
		<input type="text" class="form-input" placeholder="Add your name" />
	</div>
	<div class="form-group">
		<label class="form-label">options</label>
		<select class="form-select disabled">
			<option>Default options</option>
			<option>Second options</option>
		</select>
	</div>
	<div class="form-group">
		<label class="form-checkbox disabled">
			<input type="checkbox" />
			<i class="form-icon" /> Remember me
		</label>
	</div>
	<div class="form-group">
		<label class="form-label">Gender</label>
		<label class="form-radio disabled">
			<input type="radio" name="gender" disabled checked />
			<i class="form-icon" /> Male
		</label>
		<label class="form-radio disabled">
			<input type="radio" name="gender" />
			<i class="form-icon" /> Female
		</label>
	</div>
	<div class="form-group">
		<label class="form-switch disabled">
			<input type="checkbox" />
			<i class="form-icon" /> Send me emails with news and tips
		</label>
	</div>
</fieldset>

```html
<div class="form-group">
	<label class="form-label">options</label>
	<select class="form-select disabled">
		<option>Default options</option>
		<option>Second options</option>
	</select>
</div>
```

</template>

<script lang="ts">
import { Kotti } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPagePatternsForms',
	components: {
		ComponentInfo,
	},
	setup() {
		const meta: Kotti.Meta = {
			addedVersion: null,
			deprecated: {
				alternatives: ['KtForm', 'KtField*'],
				reason: 'Replaced by Kotti v2.0.0 Forms',
				version: '3.0.0',
			},
			slots: {},
			typeScript: null,
		}

		return {
			meta,
		}
	},
})
</script>
