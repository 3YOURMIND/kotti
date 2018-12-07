<template lang="md">

# Steps

## Step Status

<div class="element-example">
	<KtStep title="Finished" description="Your order has been accepted"/>
	<KtStep title="Process" description="Your items are Printing" status="process"/>
	<KtStep title="Wait" status="wait" :indexNumber="3" description="with index number"/>
	<KtStep title="Error" status="error" :showLine="false" icon="cloud" description="Customized icons"/>
</div>

`KtStep` includes 4 status and can be controled via `status` props:

1. Finished: The step is finished, also the default status.
2. Process: The step is procssing.
3. Wait: The step is waiting for last step to be finished.
4. Error: The step is finished with error.

```html
<KtStep title="Process" description="Your items are Printing" status="process" />
```

## Step Structure

Each `KtStep` has four elements:

1. Indicator: The icon on the left, you can change the icon via `icon` props.
2. Line: The line under the icon, if the step is last in the group, you may want to use `showLine="false"` to disable the line.
3. Title: The bold text on the right side, given via `title` props.
4. Description: The grey text under tilte, given via `description` props.

## Steps

`KtSteps` provides easier use of `KtStep`, since `KtStep` normally used as a group.

<div class="element-example">
	<KtRow>
		<KtCol :span="12" :xs="24">
			<KtSteps :current="current" status="process">
				<KtStep title="Pending" description="Your items have been ordered"/>
				<KtStep title="Print" description="Your items are printing"/>
				<KtStep title="Shppied" description="Your items has been shipped"/>
			</KtSteps>
		</KtCol>
		<KtCol :span="12" :xs="24">
			<KtSteps :current="current" status="process" showIcon>
				<KtStep title="Pending" description="Your items have been ordered"/>
				<KtStep title="Print" description="Your items are printing"/>
				<KtStep title="Shppied" description="Your items has been shipped"/>
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
	<KtStep title="Pending" description="Your items have been ordered"/>
	<KtStep title="Print" description="Your items are printing"/>
	<KtStep title="Shppied" description="Your items has been shipped"/>
</KtSteps>
<!-- Show as icons -->
<KtSteps :current="1" status="process" showIcon>
	...
</KtSteps>
```

`current` props controls which step is current step. `status` specifies the status of current step. By default `KtSteps` uses numberic indicator, if you want to use icons, set `showIcon` to `true`

## Usage

### Steps Attributes

| Attribute  | Description             | Type      | Accepted Values                           | Default   |
|:-----------|:------------------------|:----------|:------------------------------------------|:----------|
| `status`   | status of the step      | `String`  | `process`, `finished`, `error` and `wait` | `process` |
| `current`  | index of current step   | `Number`  |                                           | `0`       |
| `showIcon` | show indicator as icons | `Boolean` | -                                         | `false`   |

### Step Attributes

| Attribute     | Description                  | Type     | Accepted Values                           | Default   |
|:--------------|:-----------------------------|:---------|:------------------------------------------|:----------|
| `icon`        | icon of the step             | `String` | yoco icon string                          | `check`   |
| `title`       | title text of the step       | `String` |                                           | `null`    |
| `description` | description text of the step | `String` |                                           | `null`    |
| `status`      | status of the step           | `String` | `process`, `finished`, `error` and `wait` | `process` |

### Theme

| Attribute    | Description                            |
|:-------------|:---------------------------------------|
| `brandColor` | Change the color of indicator and line |


</template>

<script>
export default {
	name: 'StepsDocs',
	data() {
		return {
			current: 1,
			status: 'error',
		}
	},
	computed: {
		labelText() {
			return this.current > 2 ? 'Finished' : 'Next Status'
		},
	},
}
</script>
