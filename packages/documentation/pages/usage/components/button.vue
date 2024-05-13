<template>
	<div>
		<ComponentInfo v-bind="{ component: ktButtonComponent }" />

		<p>
			Use buttons to lead a call to action or guide a user to their next steps.
		</p>

		<h2>Labels</h2>

		<p>
			The label text explains the purpose of the button, which should be clear,
			self-explanatory and short.
		</p>

		<img alt="Button labels" src="~/assets/img/button_label.png" />

		<p>
			<code>Yes/No</code> buttons are not self-explanatory, the user needs to
			read the context to understand the action. Using
			<code>Cancel/Replace</code> buttons let the user respond quickly without
			thinking.
		</p>

		<h2>Types</h2>

		<div class="element-example white">
			<KtButton class="mt-4 mr-4" type="primary" @click="alert('primary')"
				>Primary Button</KtButton
			>
			<KtButton class="mt-4 mr-4" type="secondary" @click="alert('secondary')"
				>Secondary Button</KtButton
			>
			<KtButton class="mt-4 mr-4" type="danger" @click="alert('danger')"
				>Danger Button</KtButton
			>
			<KtButton class="mt-4 mr-4" @click="alert('default')"
				>Default Button</KtButton
			>
			<KtButton class="mt-4 mr-4" type="text" @click="alert('text')"
				>Text Button</KtButton
			>
		</div>

		<h4>Primary button</h4>

		<p>
			Use the primary button to lead a main call to action, such as changing the
			status of an order, or submitting a form. We suggest only using one
			primary button on each page (not including the primary button on a
			different layer). If there is another strong action needed, compare their
			priority and choose the most important one.
		</p>

		<h4>Secondary Button</h4>

		<p>
			Use a secondary button only when there is a main call to action in the
			page.
		</p>

		<h4>Danger Button</h4>

		<p>
			The danger button should be used only for actions which can't be undone.
			For example, canceling an order or deleting a material. Like the primary
			button, it should also limited to once per page.
		</p>

		<h4>Default button</h4>

		<p>This button can be used in most cases.</p>

		<h4>Text button</h4>

		<p>
			A text button can be used for sub-menus and page navigation. It also can
			pair with a primary button for destructive actions such as
			<code>Cancel</code>.
		</p>

		<h2>Label</h2>

		<div class="element-example">
			<KtButton icon="edit" label="Edit Button" type="primary" />
		</div>

		<p>
			Instead of using the default slot, you can also provide text via the
			<code>label</code> property. Note that <code>v-text</code> and
			<code>v-t</code> are <strong>NOT SUPPORTED</strong>.
		</p>

		<pre><code data-lang="html">
&lt;KtButton type=&quot;primary&quot; icon=&quot;edit&quot; label=&quot;Edit Button&quot; /&gt;
        </code></pre>

		<h2>Icon</h2>

		<div class="element-example">
			<KtButton class="mr-4" type="primary">Edit button</KtButton>
			<KtButton class="mr-4" icon="edit" label="Edit Button" type="primary" />
			<KtButton
				icon="edit"
				iconPosition="right"
				label="Right Icon Button"
				type="primary"
			/>
			<KtButton helpText="This is an icon button" icon="edit" type="primary" />
		</div>

		<ul>
			<li><strong>Label only:</strong> Used in most cases.</li>
			<li>
				<strong>Icon and label:</strong> Use when you need to catch the user's
				attention.
			</li>
			<li>
				<strong>Icon only:</strong> Use when you have limited space, such as
				when the page needs to fit on a mobile device, and a single icon is
				enough to convey the meaning,
			</li>
			<li>
				<strong>iconPosition</strong> prop can be used to place icon to the
				right of the label. Is left by default.
			</li>
			<li>
				<strong>helpText</strong> prop can be passed to
				<strong>Icon only</strong> buttons that is displayed on button hover.
			</li>
		</ul>

		<pre><code data-lang="html">
&lt;KtButton type=&quot;primary&quot;&gt;Edit button&lt;/KtButton&gt;
&lt;KtButton type=&quot;primary&quot; icon=&quot;edit&quot; label=&quot;Edit Button&quot; /&gt;
&lt;KtButton type=&quot;primary&quot; icon=&quot;edit&quot; helpText=&quot;This is an icon button&quot; /&gt;
&lt;KtButton type=&quot;primary&quot; icon=&quot;edit&quot; label=&quot;Right Icon Button&quot; iconPosition=&quot;right&quot; /&gt;
        </code></pre>

		<h2><code>toggleStatus</code></h2>

		<ul>
			<li>
				For buttons that are <strong>toggleable</strong>, and can have two
				different status: "ON" or "OFF"
			</li>
			<li>
				This prop is only valid for buttons of type
				<strong>"default"</strong> or type <strong>"text"</strong>.
			</li>
		</ul>

		<div class="element-example white">
			<KtButton
				class="mr-4"
				:icon="toggleDefaultIcon"
				:toggleStatus="toggleDefaultStatus"
				type="default"
				@update:toggleStatus="(event) => onToggleDefaultClick(event)"
				>{{ toggleDefaultLabel }}</KtButton
			>
			<KtButton
				class="mr-4"
				:icon="toggleTextIcon"
				:label="toggleTextLabel"
				:toggleStatus="toggleTextStatus"
				type="text"
				@update:toggleStatus="(event) => onToggleTextClick(event)"
			/>
		</div>

		<h2><code>isMultiline</code>/<code>isBlock</code></h2>

		<p>
			For handling long text, we can use the <code>isMultiline</code> and
			<code>isBlock</code> properties.
		</p>

		<pre><code data-lang="html">
&lt;KtButton&gt;Purchase&lt;/KtButton&gt;
&lt;KtButton isMultiline&gt;Purchase this product without the 5 year garantee and proceed with the 2 year only garantee&lt;/KtButton&gt;
        </code></pre>

		<div class="element-example">
			<div style="width: 200px">
				<KtButton block type="primary">Purchase</KtButton><br />
				<KtButton icon="save" isBlock isMultiline
					>Purchase this product without the 5 year garantee</KtButton
				><br />
				<KtButton isBlock isMultiline
					>Purchase this product without the 5 year garantee and proceed with
					the 2 year only garantee</KtButton
				>
			</div>
			<br />
			<br />
			<KtButton isMultiline
				>Multiline works on one line if the parent does not constraint the
				width</KtButton
			><br />
			<KtButton isMultiline
				>(But the height is less reliable as it uses
				<code>line-height</code>)</KtButton
			>
		</div>

		<h2>Loading</h2>

		<div class="element-example">
			<KtButton class="mr-16px" icon="edit" isLoading>Loading button</KtButton>
			<KtButton
				class="mr-16px"
				icon="edit"
				iconPosition="right"
				isLoading
				type="primary"
				>Loading button</KtButton
			>
			<KtButton class="mr-16px" isLoading type="secondary">Loading</KtButton>
			<KtButton class="mr-16px" isLoading type="danger">Loading</KtButton>
		</div>

		<pre><code data-lang="html">
&lt;KtButton isLoading&gt;Loading button&lt;/KtButton&gt;
&lt;KtButton type=&quot;primary&quot; isLoading&gt;Loading button&lt;/KtButton&gt;
&lt;KtButton type=&quot;secondary&quot; isLoading /&gt;
&lt;KtButton type=&quot;danger&quot; isLoading /&gt;
        </code></pre>

		<h2>Button Group</h2>

		<div class="element-example">
			<KtButtonGroup>
				<KtButton icon="edit" type="primary">Edit</KtButton>
				<KtButton icon="trash" type="secondary">Delete</KtButton>
			</KtButtonGroup>
		</div>

		<pre><code data-lang="html">
&lt;KtButtonGroup&gt;
    &lt;KtButton type=&quot;primary&quot; icon=&quot;edit&quot;&gt;Edit&lt;/KtButton&gt;
    &lt;KtButton type=&quot;secondary&quot; icon=&quot;trash&quot;&gt;Delete&lt;/KtButton&gt;
&lt;/KtButtonGroup&gt;
        </code></pre>

		<h2>Size</h2>

		<div class="element-example">
			<KtButton class="mr-16px" icon="edit" size="small" type="primary"
				>Small</KtButton
			>
			<KtButton class="mr-16px" isLoading size="medium"
				>Medium (Default)</KtButton
			>
			<KtButton icon="edit" size="large">Large</KtButton>
		</div>

		<p>
			<code>KtButton</code> has 3 size: <code>small</code>,
			<code>medium</code> and <code>large</code>.
		</p>

		<pre><code data-lang="html">
&lt;KtButton type=&quot;primary&quot; size=&quot;small&quot; icon=&quot;edit&quot;&gt;Small&lt;/KtButton&gt;
&lt;KtButton isLoading size=&quot;medium&quot;&gt;Medium (Default)&lt;/KtButton&gt;
&lt;KtButton size=&quot;large&quot; icon=&quot;edit&quot;&gt;&gt;Large&lt;/KtButton&gt;
        </code></pre>

		<h2><code>isSubmit</code></h2>

		<p>
			If you want the button to trigger the native <code>form</code>
			<code>submit</code> event, you need to opt-in via
			<code>&lt;KtButton isSubmit /&gt;</code>
		</p>

		<br />

		<ComponentInfo v-bind="{ component: ktSplitButtonComponent }" />

		<p>
			A split button lets someone take one of several related actions. The
			dominant action is the left button, while additional actions are tucked
			away in a popover menu that is triggered by clicking on the dropdown
			button.
		</p>

		<div class="element-example">
			<KtSplitButton
				v-bind="splitButtonProps"
				:actions="[
					{
						icon: 'calendar',
						label: 'Action 1',
						onClick: () => alert('Action 1'),
						dataTest: 'action-1',
					},
					{
						icon: 'landline',
						label: 'Action 2',
						onClick: () => alert('Action 2'),
						dataTest: 'action-2',
					},
					{
						icon: 'location',
						label: 'Action 3',
						onClick: () => alert('Action 3'),
						dataTest: 'action-3',
						isDisabled: true,
					},
				]"
				class="mr-4"
				@click="alert(splitButtonProps.label)"
			/>
			<KtSplitButton
				v-bind="splitButtonProps"
				:actions="[
					{
						label: 'Action 4',
						onClick: () => alert('Action 4'),
						dataTest: 'action-4',
					},
					{
						label: 'Action 5',
						onClick: () => alert('Action 5'),
						dataTest: 'action-5',
						isDisabled: true,
					},
					{
						label: 'Action 6',
						onClick: () => alert('Action 6'),
						dataTest: 'action-6',
					},
				]"
				@click="alert(splitButtonProps.label)"
			/>
		</div>

		<KtForm v-model="settings" size="small">
			<div class="wrapper">
				<div>
					<h4>Settings</h4>
					<KtFieldSingleSelect
						formKey="type"
						hideClear
						isUnsorted
						label="type"
						:options="[
							{ label: 'default (default)', value: 'default' },
							{ label: 'primary', value: 'primary' },
						]"
					/>
					<KtFieldSingleSelect
						formKey="size"
						hideClear
						isUnsorted
						label="size"
						:options="[
							{ label: 'small', value: 'small' },
							{ label: 'medium (default)', value: 'medium' },
							{ label: 'large', value: 'large' },
						]"
					/>
					<KtFieldToggleGroup
						formKey="booleanFlags"
						isOptional
						label="Boolean Flags"
						:options="[
							{ key: 'isDisabled', label: 'isDisabled' },
							{ key: 'isLoading', label: 'isLoading' },
						]"
						type="switch"
					/>
				</div>
				<div>
					<h4>Texts</h4>
					<KtFieldText formKey="label" label="label" />
					<KtFieldText formKey="dataTest" isOptional label="dataTest" />
					<h4>Decoration</h4>
					<div class="field-row">
						<KtFieldSingleSelect
							formKey="icon"
							isOptional
							label="icon"
							:options="iconOptions"
						>
							<template #option="{ option }">
								<i
									class="yoco"
									style="margin-right: 10px; font-size: 24px"
									v-text="option.value"
								/>
								<span v-text="option.label" />
							</template>
						</KtFieldSingleSelect>
						<KtFieldSingleSelect
							formKey="iconPosition"
							isOptional
							isUnsorted
							label="iconPosition"
							:options="[
								{ label: 'left (default)', value: 'left' },
								{ label: 'right', value: 'right' },
							]"
						/>
					</div>
				</div>
			</div>
		</KtForm>

		<pre><code data-lang="html">
&lt;KtSplitButton
    :actions=&quot;[
        { icon: 'calendar', label: 'Action 1', onClick: () => alert('Action 1'), dataTest: 'calendar' },
        { icon: 'landline', label: 'Action 2', onClick: () => alert('Action 2'), dataTest: 'landline' },
        { icon: 'location', label: 'Action 3', onClick: () => alert('Action 3'), dataTest: 'location', isDisabled: true },
    ]&quot;
    dataTest=&quot;btn-1&quot;
    icon=&quot;download&quot;
    label=&quot;Split Button&quot;
    type=&quot;primary&quot;
    @click=&quot;alert('Split Button')&quot;
/&gt;
        </code></pre>

		<h3>Best practices</h3>

		<ul>
			<li>
				When there isn't a clear default action, present all options equally by
				using a dropdown menu or button group.
			</li>
			<li>
				Try to keep the number of secondary actions to a minimum to aid focus
				and comprehension.
			</li>
			<li>
				Remember that some users may miss the secondary action entirely, so
				ensure users aren't required to interact with the secondary action to
				proceed. In other words, make sure the main action button allows people
				to proceed in most cases.
			</li>
			<li>Do not repeat the default action in the secondary actions menu.</li>
			<li>
				Avoid grouping actions that are dissimilar in the secondary actions
				menu.
			</li>
			<li>
				To represent a ”more actions” button, use a simple dropdown menu button
				with the "...” icon.
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { KtButton, KtSplitButton } from '@3yourmind/kotti-ui'
import { Kotti } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from 'vue'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsButton',
	components: {
		ComponentInfo,
	},
	setup() {
		const toggleDefaultStatus = ref<Kotti.Button.ToggleStatus>(
			Kotti.Button.ToggleStatus.OFF,
		)
		const toggleTextStatus = ref<Kotti.Button.ToggleStatus>(
			Kotti.Button.ToggleStatus.OFF,
		)

		const settings = ref<{
			booleanFlags: {
				isDisabled: Kotti.FieldToggle.Value
				isLoading: Kotti.FieldToggle.Value
			}
			dataTest: Kotti.FieldText.Value
			icon: Kotti.FieldSingleSelect.Value
			iconPosition: Kotti.FieldSingleSelect.Value
			label: Kotti.FieldText.Value
			size: Kotti.FieldSingleSelect.Value
			type: Kotti.FieldSingleSelect.Value
		}>({
			booleanFlags: {
				isDisabled: null,
				isLoading: null,
			},
			dataTest: null,
			icon: null,
			iconPosition: null,
			label: 'Split Button',
			size: Kotti.SplitButton.Size.MEDIUM,
			type: Kotti.SplitButton.Type.DEFAULT,
		})

		return {
			alert: (value: string) => {
				// eslint-disable-next-line no-alert
				window.alert(value)
			},
			iconOptions: Object.values(Yoco.Icon).map((icon) => ({
				label: icon,
				value: icon,
			})),
			ktButtonComponent: KtButton,
			ktSplitButtonComponent: KtSplitButton,
			onToggleDefaultClick: (status: Kotti.Button.ToggleStatus) => {
				toggleDefaultStatus.value = status
			},
			onToggleTextClick: (status: Kotti.Button.ToggleStatus) => {
				toggleTextStatus.value = status
			},
			settings,
			splitButtonProps: computed(() =>
				Object.fromEntries(
					[
						...Object.entries(settings.value).filter(
							([prop]) => prop !== 'booleanFlags',
						),
						...Object.entries(settings.value.booleanFlags),
					].filter(([_, value]) => value !== null),
				),
			),
			toggleDefaultIcon: computed(() =>
				toggleDefaultStatus.value === Kotti.Button.ToggleStatus.ON
					? 'check'
					: 'close',
			),
			toggleDefaultLabel: computed(() =>
				toggleDefaultStatus.value === Kotti.Button.ToggleStatus.ON
					? 'DEFAULT ON'
					: 'DEFAULT OFF',
			),
			toggleDefaultStatus,
			toggleTextIcon: computed(() =>
				toggleTextStatus.value === Kotti.Button.ToggleStatus.ON
					? 'check'
					: 'close',
			),
			toggleTextLabel: computed(() =>
				toggleTextStatus.value === Kotti.Button.ToggleStatus.ON
					? 'TEXT ON'
					: 'TEXT OFF',
			),
			toggleTextStatus,
		}
	},
})
</script>

<style src="../../../styles/form-fields.scss" lang="scss" scoped />
