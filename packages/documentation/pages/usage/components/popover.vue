<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<p>
			Use popovers to provide extra information or actions. Compared to
			<code>tooltip</code>, <code>popovers</code> can carry more information.
			<code>KtPopover</code> <strong>supports</strong> escaping the
			<a
				href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context"
			>
				CSS Stacking Context
			</a>
		</p>

		<h2>Interactive Example</h2>

		<KtForm v-model="values">
			<KtFieldSingleSelect
				formKey="usageMode"
				hideClear
				isOptional
				label="usage"
				:options="usageOptions"
			>
				<template #helpText>
					Passing <code>options</code> turns <code>KtPopover</code> into a
					pre-made dropdown button menu.
					<dl>
						<dt>TypeScript</dt>
						<dd><code>Kotti.Popover.Props['options']</code></dd>
					</dl>
					<pre
						v-text="JSON.stringify(exampleOptions, replacer, ' '.repeat(3))"
					/>
				</template>
			</KtFieldSingleSelect>
			<KtFieldSingleSelect
				formKey="size"
				hideClear
				isOptional
				label="size"
				:options="sizeOptions"
			/>
			<KtFieldSingleSelect
				formKey="placement"
				hideClear
				isOptional
				label="placement"
				:options="placementOptions"
			>
				<template #helpText>
					There are 4 different positions for popovers:
					<code>right</code>, <code>left</code>, <code>top</code>, and
					<code>bottom</code>, or <code>auto</code>. All of which can be
					appended with <code>-start</code> and <code>-end</code> to define
					placement.
					<br />
					<a href="https://atomiks.github.io/tippyjs/v6/all-props/#placement">
						See Placement Options here
					</a>
					<br />
					By default, it flips if there's more space in the mirror placement.
				</template>
			</KtFieldSingleSelect>
			<KtFieldSingleSelect
				formKey="trigger"
				hideClear
				label="trigger"
				:options="triggerOptions"
			>
				<template #helpText>
					Assigning a <code>ref</code> exposes <code>open()</code> and
					<code>close()</code> (Typed via <code>Kotti.Popover.Ref</code>)
				</template>
			</KtFieldSingleSelect>
			<KtPopover
				ref="interactiveExampleRef"
				:areOptionsSelectable="
					values.usageMode === UsageMode.SELECTABLE_OPTIONS
				"
				:options="exampleOptions"
				:placement="values.placement"
				:size="values.size"
				:trigger="values.trigger"
				@update:isSelected="handleUpdateIsSelected"
			>
				<KtButton label="KtPopover Button" />
				<template v-if="values.usageMode === UsageMode.SLOT" #content>
					<div style="max-width: 500px">
						<pre>
							<code v-text="'<template #content>Slot</template>'" />
						</pre>
						<strong>We also support sub-dropdowns</strong> like
						<code>KtFieldSingleSelect</code>, however it’s recommended to use
						<code>trigger="click"</code> when utilizing this.
						<br />
						<KtFieldDateTime formKey="valueDateTime" isOptional label="Label" />
						<KtFieldDateTimeRange
							formKey="valueDateTimeRange"
							isOptional
							label="Label"
						/>
						<KtFieldSingleSelect
							formKey="valueSingleSelect"
							helpText="Some helpText"
							isOptional
							label="Test with dropdown"
							:options="[{ label: 'Click me', value: 'test_click' }]"
						/>
					</div>
				</template>
			</KtPopover>
			<br /><br />

			<h3 v-text="'Methods'" />
			<KtButton
				label="interactiveExampleRef.open()"
				@click="() => interactiveExampleRef.open()"
			/>
			<KtButton
				label="interactiveExampleRef.close()"
				@click="() => interactiveExampleRef.close()"
			/>
			<br /><br />
		</KtForm>

		<h2 v-text="'Scoped Slot'" />
		<span>
			Besides the default slot, KtPopover exposes <code>content</code> slot,
			which exposes a <code>close</code> function on the slot-scope, which, when
			called, closes the popper.
		</span>
		<div class="element-example">
			<KtPopover class="mt-4 ml-4" trigger="hover">
				<template #default="{ showPopover }">
					<KtButton
						:label="
							showPopover ? 'Close with Cancel Button' : 'Hover to open Popover'
						"
					/>
				</template>
				<template #content="slotProps">
					<p>Save your message</p>
					<KtButton type="text" @click="slotProps.close"> Cancel </KtButton>
					<KtButton type="primary"> Save </KtButton>
				</template>
			</KtPopover>
		</div>
		<!-- prettier-ignore -->
		<pre>
			&lt;KtPopover trigger="hover"&gt;
				&lt;KtButton label="Close with Cancel Button" /&gt;
				&lt;template #content="{ close }"&gt;
					&lt;p&gt;Save your message&lt;/p&gt;
					&lt;KtButton label="Cancel" type="text" @click="close" /&gt;
					&lt;KtButton label="Save" type="primary" /&gt;
				&lt;/template&gt;
			&lt;/KtPopover&gt;
		</pre>

		<h2 v-text="'Disabling'" />
		<span>
			If passing <code> isDisabled </code> as <code> true </code> clicking the
			trigger element will not have any effect
		</span>
		<div class="element-example element-example--flex">
			<KtPopover
				class="mt-4 ml-4"
				:isDisabled="isPopoverDisabled"
				trigger="hover"
			>
				<a v-text="'Hover Me'" />
				<template #content>
					<p>Switch the toggle to disable this popover</p>
				</template>
			</KtPopover>

			<br />
			<br />

			<KtFieldToggle v-model="isPopoverDisabled" isOptional>
				Is Popover disabled
			</KtFieldToggle>
		</div>
	</div>
</template>

<script lang="ts">
import { KtPopover, Kotti } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from 'vue'

import ComponentInfo from '~/components/ComponentInfo.vue'

enum UsageMode {
	OPTIONS = 'OPTIONS',
	SELECTABLE_OPTIONS = 'SELECTABLE_OPTIONS',
	SLOT = 'SLOT',
}

export default defineComponent({
	name: 'DocumentationPageUsageComponentsPopever',
	components: {
		ComponentInfo,
	},
	setup() {
		const interactiveExampleRef = ref<HTMLElement | null>(null)

		const exampleOptions = ref<
			Exclude<Kotti.Popover.Props['options'], undefined>
		>([
			{
				isDisabled: false,
				isOptional: true,
				dataTest: 'data-test',
				label: 'User',
				isSelected: false,
				icon: Yoco.Icon.USER,
			},
			/**
			 * `onClick` is not defined, therefore, the UI will make it not look clickable
			 * - even if it's not disabled.
			 * */
			{
				isDisabled: false,
				isOptional: true,
				label: 'Attachment',
				icon: Yoco.Icon.ATTACHMENT,
			},
			{
				isDisabled: true,
				isOptional: true,
				label: 'Disabled Option',
				icon: Yoco.Icon.SHIPPING,
			},
		])

		return {
			component: KtPopover,
			exampleOptions,
			handleUpdateIsSelected: (val: Kotti.Popover.Events.UpdateIsSelected) => {
				exampleOptions.value = exampleOptions.value.map((option, index) =>
					index === val.index
						? { ...option, isSelected: val.value ?? undefined }
						: option,
				)
			},
			interactiveExampleRef,
			isPopoverDisabled: ref(false),
			placementOptions: computed((): Kotti.FieldSingleSelect.Props['options'] =>
				Object.entries(Kotti.Popover.Placement).map(([key, value]) => ({
					label: `Kotti.Popover.Placement.${key} ('${value}')`,
					value,
				})),
			),
			replacer: (_key: string, value: unknown) => {
				if (typeof value === 'function') return '() => {}'
				return value
			},
			sizeOptions: computed((): Kotti.FieldSingleSelect.Props['options'] =>
				Object.entries(Kotti.Popover.Size).map(([key, value]) => ({
					label: `Kotti.Popover.Size.${key} (${value})`,
					value,
				})),
			),
			triggerOptions: computed((): Kotti.FieldSingleSelect.Props['options'] =>
				Object.entries(Kotti.Popover.Trigger).map(([key, value]) => ({
					label: `Kotti.Popover.Trigger.${key} (${value})`,
					value,
				})),
			),
			usageOptions: computed<Kotti.FieldSingleSelect.Props['options']>(() => [
				{ label: 'Use Slot', value: UsageMode.SLOT },
				{ label: 'Use Options', value: UsageMode.OPTIONS },
				{
					label: 'Use Selectable Options',
					value: UsageMode.SELECTABLE_OPTIONS,
				},
			]),
			UsageMode,
			values: ref<
				{
					usageMode: UsageMode
					valueDateTime: Kotti.FieldDateTime.Value
					valueDateTimeRange: Kotti.FieldDateTimeRange.Value
					valueSingleSelect: Kotti.FieldSingleSelect.Value
				} & Pick<Kotti.Popover.PropsInternal, 'size' | 'trigger' | 'placement'>
			>({
				placement: Kotti.Popover.Placement.AUTO,
				size: Kotti.Popover.Size.AUTO,
				trigger: Kotti.Popover.Trigger.CLICK,
				usageMode: UsageMode.SLOT,
				valueDateTime: null,
				valueDateTimeRange: [null, null],
				valueSingleSelect: null,
			}),
		}
	},
})
</script>
