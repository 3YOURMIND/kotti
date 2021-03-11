<template lang="md">
	<ComponentInfo v-bind="{ component }" />

	## Label

	<div class="element-example">
		<KtInput
			v-model="v1"
			label="Name"
			labelFor="Name"
			placeholder="Add your name"
		/>
		<KtInput placeholder="Add your name"/>
	</div>

	`label` props accept `String` and show on the top of `input`.

	`labelFor` define the `for` attributes in `label`.

	```html
	<KtInput v-model="v1" label="Name" labelFor="Name" placeholder="Add your name"/>
	<KtInput placeholder="Add your name"/>
	```

	## Icon
	<div class="element-example">
		<KtInput
			v-model="v3"
			placeholder="Add your name"
			icon="user"
		/>
		<KtInput
			v-model="v3"
			iconPosition="right"
			placeholder="Add your name"
			icon="user"
		/>

	</div>

	`icon` accepts any `String` from yoco, the default location of icon is `left`,
	to change the location, set `iconPosition="right"`

	```html
	<KtInput v-model="v3" placeholder="Add your name" icon="user"/>
	<KtInput v-model="v2" placeholder="Serach your name" iconPosition="right" icon="search"/>
	```

	## Icon Dialog

	<div class="element-example">
		<KtInput
			v-model="v3"
			placeholder="Serach your name"
			icon="circle_question"
			iconPosition="right"
			dialog="Available"
			/>
		<KtInput
			v-model="v3"
			placeholder="Serach your name"
			icon="check"
			iconPosition="right"
			>
			<div slot="dialog">
				<h4>Availabe</h4>
				<span>This user name is availabe</span>
			</div>
		</KtInput>
	</div>

	If you want show addition information of the input field, `dialog` accepts `String` text or `dialog` slot for HTML template.

	```html
	<KtInput
			v-model="v3"
			placeholder="Serach your name"
			icon="circle_question"
			iconPosition="right"
			dialog="Available"
			/>
	<KtInput
		v-model="v3"
		placeholder="Serach your name"
		icon="check"
		iconPosition="right"
		>
		<div slot="dialog">
			<h4>Availabe</h4>
			<span>This user name is availabe</span>
		</div>
	</KtInput>
	```

	## Addon Text

	<div class="element-example">
		<KtInput
			v-model="v3"
			label="Name"
			placeholder="Add your name"
			addonText="User Name"
		/>
	</div>

	When an value needs a fixed prefix or suffix,
	in order to make sure user doesn't put it in input field,
	use an `addonText` to indicate that system has already pre-input this value.

	```html
	<KtInput v-model="v3" label="Name" placeholder="Add your name" addonText="User Name"/>
	```

	## Type
	<div class="element-example">
		<KtInput
			v-model="v4"
			type="number"
			label="Number"
			step="0.1"
			placeholder="Add your name"
		/>
		<KtInput
			v-model="v5"
			type="email"
			label="Email"
		/>
	</div>

	For input field it accept types `Number`, `text` and `email`.
	Using `step` to define the precision.
	If you want to use `radio` type, using KtRadio`.

	```html
	<KtInput v-model="v4" type="number" label="Number" step="0.1"/>
	<KtInput v-model="v5" type="email" label="Email" />
	```

	## Disabled
	<div class="element-example white">
		<KtInput
			label="Disabled Input"
			:placeholder="v5"
			disabled
		/>
	</div>

	Add `disabled` to `KtInput` to make input not editable.

	```html
	<KtInput label="Disabled Input" :placeholder="v5" disabled />
	```

	## Validate

	<div class="element-example">
		<KtInput
			label="Success Input"
			:placeholder="v5"
			validate="success"
			validateText="Your user name is availabe"
		/>
		<KtInput
			label="Error Input"
			:placeholder="v5"
			validate="error"
			validateText="Your input is invalid"
		/>
		<KtInput
			label="Warning Input"
			:placeholder="v5"
			validate="warning"
			validateText="Your input is wrong"
		/>
	</div>

	`validate` props accepts three validation: `success`, `error`, and `warning`

	```html
	<KtInput label="Success Input" :placeholder="v5" validate="success" />
	<KtInput label="Error Input" :placeholder="v5" validate="error" />
	<KtInput label="Warning Input" :placeholder="v5" validate="warning" validateText="Your input is wrong"/>
	```

	## Required

	<div class="element-example">
		<KtInput
			:placeholder="v5"
			label="Required Input"
			required
		/>
	</div>

	`required` marks a field as non-optional. Browsers will also refuse sending the form until the field is filled.

	```html
	<KtInput placeholder="email@example.com" label="Required Input" required/>
	```

	## Compact

	In order to save vertical space on the page when many inputs need, and icon only input can not deliver clear information,
	you can choose compact input style.

	Note that **`isCompact` is incompatible with `addonText`**, and won’t be applied if both are passed.

	<div class="element-example">
		<KtInput label="Full Name" placeholder="Your first name and last name" isCompact/>
		<KtInput label="Address" isCompact/>
		<KtInput label="Company" isCompact/>
	</div>

	Using `isCompact` to enable compact style.

	```html
	<KtInput label="Full Name" placeholder="Your first name and last name" isCompact/>
	<KtInput label="Address" isCompact/>
	<KtInput label="Company" isCompact/>
	```

</template>

<script lang="ts">
import { KtInput } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsInputs',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtInput,
			v1: ref('Jony One O'),
			v2: ref(''),
			v3: ref('Jony Three O'),
			// eslint-disable-next-line no-magic-numbers
			v4: ref(4),
			v5: ref('email@example.com'),
		}
	},
})
</script>
