<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Step Status

<div class="element-example">
	<KtStep title="Finished" description="Your order has been accepted"/>
	<KtStep title="Process" description="Your items are Printing" status="process"/>
	<KtStep title="Wait" status="wait" :indexNumber="3" description="with index number"/>
	<KtStep title="Error" status="error" hideLine icon="cloud" description="Customized icons"/>
</div>

`KtStep` includes 4 statuses that can be controlled via the `status` prop:

1. Finished: The step is finished (default)
2. Process: The step is procssing
3. Wait: The step is waiting for last step to be finished
4. Error: The step is finished with an error

```html
<KtStep
	title="Process"
	description="Your items are Printing"
	status="process"
/>
```

## Step Structure

Each `KtStep` has four elements:

1. Indicator: The icon on the left, can be changed with the `icon` prop
2. Line: The line under the icon, if the step is last in the group, you may want to use `hideLine` to disable the line
3. Title: The bold text on the right side, given via `title` props.
4. Description: The gray text under title, given via `description` props.

## Steps

`KtSteps` provides easier use of `KtStep`, since `KtStep` normally used as a group.

<div class="element-example">
	<KtRow>
		<KtCol :span="12" :xs="24">
			<KtSteps :current="current" status="process">
				<KtStep title="Pending" description="Your items have been ordered"/>
				<KtStep title="Print" description="Your items are printing"/>
				<KtStep title="Shipped" description="Your items have been shipped"/>
			</KtSteps>
		</KtCol>
		<KtCol :span="12" :xs="24">
			<KtSteps :current="current" status="process" showIcon>
				<KtStep title="Pending" description="Your items have been ordered"/>
				<KtStep title="Print" description="Your items are printing"/>
				<KtStep title="Shipped" description="Your items have been shipped"/>
			</KtSteps>
		</KtCol>
	</KtRow>
	<KtRow class="mt-16px">
		<KtButton label="Reset" @click="current = 0"/>
		<KtButton :label="labelText" @click="current++" />
	</KtRow>
</div>

```html
<KtSteps :current="1" status="process">
	<KtStep title="Pending" description="Your items have been ordered" />
	<KtStep title="Print" description="Your items are printing" />
	<KtStep title="Shipped" description="Your items has been shipped" />
</KtSteps>
<!-- Show as icons -->
<KtSteps :current="1" status="process" showIcon> ... </KtSteps>
```

`current` props controls which step is current step. `status` specifies the status of current step. By default `KtSteps` uses numberic indicator, if you want to use icons, set `showIcon` to `true`

## Usage

### Steps Attributes

| Attribute  | Description             | Type      | Accepted Values                           | Default   |
| :--------- | :---------------------- | :-------- | :---------------------------------------- | :-------- |
| `current`  | index of current step   | `Number`  | —                                         | `0`       |
| `showIcon` | show indicator as icons | `Boolean` | —                                         | `false`   |
| `status`   | status of the step      | `String`  | `process`, `finished`, `error` and `wait` | `process` |

### Step Attributes

| Attribute     | Description                      | Type      | Accepted Values                           | Default   |
| :------------ | :------------------------------- | :-------- | :---------------------------------------- | :-------- |
| `description` | description text of the step     | `String`  | —                                         | `null`    |
| `hideLine`    | should be used for the last step | `Boolean` | `true`, `false`                           | `false`   |
| `icon`        | icon of the step                 | `String`  | yoco icon string                          | `check`   |
| `status`      | status of the step               | `String`  | `process`, `finished`, `error` and `wait` | `process` |
| `title`       | title text of the step           | `String`  | —                                         | `null`    |

### Theme

| Attribute    | Description                             |
| :----------- | :-------------------------------------- |
| `brandColor` | Changes the color of indicator and line |
</template>

<script lang="ts">
import { KtSteps } from '@3yourmind/kotti-ui'
import { computed, defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsSteps',
	components: {
		ComponentInfo,
	},
	setup() {
		const current = ref(1)

		return {
			component: KtSteps,
			current,
			labelText: computed(() =>
				current.value > 2 ? 'Finished' : 'Next Status',
			),
			status: ref('error'),
		}
	},
})
</script>
