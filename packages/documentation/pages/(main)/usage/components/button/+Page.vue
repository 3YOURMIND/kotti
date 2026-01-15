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

		<img alt="Button labels" src="./button_label.png" />

		<p>
			<code>Yes/No</code> buttons are not self-explanatory, the user needs to
			read the context to understand the action. Using
			<code>Cancel/Replace</code> buttons let the user respond quickly without
			thinking.
		</p>

		<h2>Types</h2>

		<CodePreview
			code='
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton type="primary" @click="...">
						Primary Button
					</KtButton>
					<KtButton type="secondary" @click="...">
						Secondary Button
					</KtButton>
					<KtButton type="danger" @click="...">
						Danger Button
					</KtButton>
					<KtButton @click="...">
						Default Button
					</KtButton>
					<KtButton type="text" @click="...">
						Text Button
					</KtButton>
				</div>
			'
			language="vue-html"
		>
			<div style="display: flex; flex-wrap: wrap; gap: var(--unit-6)">
				<KtButton type="primary" @click="showToaster('primary')">
					Primary Button
				</KtButton>
				<KtButton type="secondary" @click="showToaster('secondary')">
					Secondary Button
				</KtButton>
				<KtButton type="danger" @click="showToaster('danger')">
					Danger Button
				</KtButton>
				<KtButton @click="showToaster('default')"> Default Button </KtButton>
				<KtButton type="text" @click="showToaster('text')">
					Text Button
				</KtButton>
			</div>
		</CodePreview>

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

		<CodePreview
			code='
				<KtButton icon="edit" label="Edit Button" type="primary" />
				<!-- is equivalent to -->
				<KtButton icon="edit" type="primary">Edit Button</KtButton>
			'
			language="vue-html"
		>
			<KtButton icon="edit" label="Edit Button" type="primary" />
		</CodePreview>

		<p>
			Instead of using the default slot, you can also provide text via the
			<code>label</code> property. Note that <code>v-text</code> and
			<code>v-t</code> are <strong>NOT SUPPORTED</strong>.
		</p>

		<h2>Icon</h2>

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

		<CodePreview
			code='
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton type="primary">Edit button</KtButton>
					<KtButton icon="edit" label="Edit Button" type="primary" />
					<KtButton icon="edit" iconPosition="right" label="Icon To The Right" type="primary"/>
					<KtButton helpText="This is an icon button" icon="edit" type="primary" />
				</div>
			'
			language="vue-html"
		>
			<div style="display: flex; gap: var(--unit-6)">
				<KtButton type="primary">Edit button</KtButton>
				<KtButton icon="edit" label="Edit Button" type="primary" />
				<KtButton
					icon="edit"
					iconPosition="right"
					label="Icon To The Right"
					type="primary"
				/>
				<KtButton
					helpText="This is an icon button"
					icon="edit"
					type="primary"
				/>
			</div>
		</CodePreview>

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

		<CodePreview
			code='
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton
						:icon="toggleDefaultIcon"
						:toggleStatus="toggleDefaultStatus"
						type="default"
						@update:toggleStatus="(event) => onToggleDefaultClick(event)"
					>
						{{ toggleDefaultLabel }}
					</KtButton
					<KtButton
						:icon="toggleTextIcon"
						:label="toggleTextLabel"
						:toggleStatus="toggleTextStatus"
						type="text"
						@update:toggleStatus="(event) => onToggleTextClick(event)"
					/>
				</div>
			'
			language="vue-html"
		>
			<div style="display: flex; gap: var(--unit-6)">
				<KtButton
					:icon="toggleDefaultIcon"
					:toggleStatus="toggleDefaultStatus"
					type="default"
					@update:toggleStatus="(event) => onToggleDefaultClick(event)"
				>
					{{ toggleDefaultLabel }}
				</KtButton>
				<KtButton
					:icon="toggleTextIcon"
					:label="toggleTextLabel"
					:toggleStatus="toggleTextStatus"
					type="text"
					@update:toggleStatus="(event) => onToggleTextClick(event)"
				/>
			</div>
		</CodePreview>

		<h2><code>isMultiline</code>/<code>isBlock</code></h2>

		<p>
			For handling long text, we can use the <code>isMultiline</code> and
			<code>isBlock</code> properties.
		</p>

		<CodePreview
			code='
			<div style="width: 200px; display: flex; flex-direction: column; gap: var(--unit-1)">
				<KtButton block type="primary">Purchase</KtButton>
				<KtButton icon="save" isBlock isMultiline>
					Purchase this product without the 5 year garantee
				</KtButton>
				<KtButton isBlock isMultiline>
					Purchase this product without the 5 year garantee and proceed with the
					2 year only garantee
				</KtButton>
			</div>
			<br/>
			<div style="display: flex; flex-direction: column; gap: var(--unit-1)">
				<KtButton isMultiline>
					Multiline works on one line if the parent does not constraint the width
				</KtButton>
				<KtButton isMultiline>
					(But the height is less reliable as it uses
					<code>line-height</code>)
				</KtButton>
			</div>
			'
			language="vue-html"
		>
			<div
				style="
					display: flex;
					flex-direction: column;
					gap: var(--unit-1);
					width: 200px;
				"
			>
				<KtButton block type="primary">Purchase</KtButton><br />
				<KtButton icon="save" isBlock isMultiline>
					Purchase this product without the 5 year garantee
				</KtButton>
				<KtButton isBlock isMultiline>
					Purchase this product without the 5 year garantee and proceed with the
					2 year only garantee
				</KtButton>
			</div>
			<br />
			<div style="display: flex; flex-direction: column; gap: var(--unit-1)">
				<KtButton isMultiline>
					Multiline works on one line if the parent does not constraint the
					width
				</KtButton>
				<KtButton isMultiline>
					(But the height is less reliable as it uses
					<code>line-height</code>)
				</KtButton>
			</div>
		</CodePreview>

		<h2>Loading</h2>

		<CodePreview
			code='
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton icon="edit" isLoading>
						Loading button
					</KtButton>
					<KtButton icon="edit" iconPosition="right" isLoading type="primary">
						Loading button
					</KtButton>
					<KtButton isLoading type="secondary">Loading</KtButton>
					<KtButton isLoading type="danger">Loading</KtButton>
				</div>
			'
			language="vue-html"
		>
			<div style="display: flex; gap: var(--unit-6)">
				<KtButton icon="edit" isLoading> Loading button </KtButton>
				<KtButton icon="edit" iconPosition="right" isLoading type="primary">
					Loading button
				</KtButton>
				<KtButton isLoading type="secondary">Loading</KtButton>
				<KtButton isLoading type="danger">Loading</KtButton>
			</div>
		</CodePreview>

		<h2>Button Group</h2>

		<CodePreview
			code='
				<KtButtonGroup>
					<KtButton icon="edit" type="primary">Edit</KtButton>
					<KtButton icon="trash" type="secondary">Delete</KtButton>
				</KtButtonGroup>
			'
			language="vue-html"
		>
			<KtButtonGroup>
				<KtButton icon="edit" type="primary">Edit</KtButton>
				<KtButton icon="trash" type="secondary">Delete</KtButton>
			</KtButtonGroup>
		</CodePreview>

		<h2>Size</h2>

		<MarkdownBlock>
			`KtButton` has 3 sizes: `small`, `medium`, and `large`
		</MarkdownBlock>

		<CodePreview
			code='
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton icon="edit" size="small" type="primary">
						Small
					</KtButton>
					<KtButton isLoading size="medium">
						Medium (Default)
					</KtButton>
					<KtButton icon="edit" size="large">
						Large
					</KtButton>
				</div>
			'
			language="vue-html"
		>
			<div style="display: flex; gap: var(--unit-6)">
				<KtButton icon="edit" size="small" type="primary"> Small </KtButton>
				<KtButton isLoading size="medium"> Medium (Default) </KtButton>
				<KtButton icon="edit" size="large"> Large </KtButton>
			</div>
		</CodePreview>

		<h2><code>isSubmit</code></h2>

		<p>
			If you want the button to trigger the native <code>form</code>
			<code>submit</code> event, you need to opt-in via
			<code>&lt;KtButton isSubmit /&gt;</code>
		</p>

		<br />

		<ComponentInfo :component="ktSplitButtonComponent" />

		<p>
			A split button lets someone take one of several related actions. The
			dominant action is the left button, while additional actions are tucked
			away in a popover menu that is triggered by clicking on the dropdown
			button.
		</p>

		<h3>Usage</h3>

		<h4>Best practices</h4>

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

		<KtForm v-model="splitButtonSettings" size="small">
			<ComponentForm
				:component="ktSplitButtonComponent"
				:propFormatters="propFormatters"
				:props="splitButtonProps"
			>
				<template #component-form-settings>
					<div>
						<KtFormControllerObject formKey="props">
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
						</KtFormControllerObject>
						<KtFieldToggleGroup
							formKey="booleanFlags"
							isOptional
							label="Boolean Flags"
							:options="[
								{ key: 'isDisabled', label: 'isDisabled' },
								{ key: 'isLoading', label: 'isLoading' },
							]"
							style="margin-top: 0.8rem"
							type="switch"
						/>
					</div>
					<div>
						<KtFormControllerObject formKey="props">
							<h4>Texts</h4>
							<KtFieldText formKey="label" label="label" />
							<KtFieldText formKey="dataTest" isOptional label="dataTest" />
							<h4>Decoration</h4>
							<div class="field-row">
								<FieldYocoIcon isOptional />
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
						</KtFormControllerObject>
					</div>
				</template>
			</ComponentForm>
		</KtForm>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
	KtButton,
	KtButtonGroup,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggleGroup,
	KtForm,
	KtFormControllerObject,
	KtSplitButton,
} from '@3yourmind/kotti-ui'
import { Kotti } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

import CodePreview from '~/components/CodePreview.vue'
import ComponentForm from '~/components/component-form/ComponentForm.vue'
import FieldYocoIcon from '~/components/component-form/FieldYocoIcon.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'
import { success } from '~/utilities/toaster'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsButton',
	components: {
		CodePreview,
		ComponentForm,
		ComponentInfo,
		FieldYocoIcon,
		KtButton,
		KtButtonGroup,
		KtFieldSingleSelect,
		KtFieldText,
		KtFieldToggleGroup,
		KtForm,
		KtFormControllerObject,
	},
	setup() {
		const toggleDefaultStatus = ref<Kotti.Button.ToggleStatus>(
			Kotti.Button.ToggleStatus.OFF,
		)
		const toggleTextStatus = ref<Kotti.Button.ToggleStatus>(
			Kotti.Button.ToggleStatus.OFF,
		)

		const splitButtonSettings = ref({
			booleanFlags: {
				isDisabled: false,
				isLoading: false,
			},
			props: {
				dataTest: null,
				icon: null,
				iconPosition: Kotti.SplitButton.IconPosition.LEFT,
				label: 'Split Button',
				size: Kotti.SplitButton.Size.MEDIUM,
				type: Kotti.SplitButton.Type.DEFAULT,
			},
		})

		return {
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
			propFormatters: {
				actions: (items: unknown) =>
					JSON.stringify(items, null, '\t').split('\n'),
			},
			showToaster: (value: string) => {
				success({ text: value })
			},
			splitButtonProps: computed(() => ({
				...splitButtonSettings.value.booleanFlags,
				...splitButtonSettings.value.props,
				actions: [
					{
						dataTest: 'action-1',
						icon: 'calendar',
						label: 'Action 1',
						onClick: () => success({ text: 'Action 1' }),
					},
					{
						dataTest: 'action-2',
						icon: 'landline',
						label: 'Action 2',
						onClick: () => success({ text: 'Action 2' }),
					},
					{
						dataTest: 'action-3',
						icon: 'location',
						isDisabled: true,
						label: 'Action 3',
						onClick: () => success({ text: 'Action 3' }),
					},
					{
						dataTest: 'action-4',
						label: 'Action 4 (without icon)',
						onClick: () => success({ text: 'Action 4' }),
					},
				],
			})),
			splitButtonSettings,
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
