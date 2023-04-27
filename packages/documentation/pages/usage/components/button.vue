<template lang="md">
    <ComponentInfo v-bind="{ component }" />

    Use buttons to lead a call to action or guide a user to their next steps.

    ## Labels

    The label text explains the purpose of the button, which should be clear, self-explanatory and short.

    ![Button labels](~/assets/img/button_label.png)

    `Yes/No` buttons are not self-explanatory, the user needs to read the
    context to understand the action. Using `Cancel/Replace` buttons
    let the user respond quickly without thinking.

    ## Types

    <div class="element-example white">
    	<KtButton type="primary" class="mt-4 mr-4" @click="alert('primary')">Primary Button</KtButton>
    	<KtButton type="secondary" class="mt-4 mr-4" @click="alert('secondary')">Secondary Button</KtButton>
    	<KtButton type="danger" class="mt-4 mr-4" @click="alert('danger')">Danger Button</KtButton>
    	<KtButton class="mt-4 mr-4" @click="alert('default')">Default Button</KtButton>
    	<KtButton type="text" class="mt-4 mr-4" @click="alert('text')">Text Button</KtButton>
    </div>

    **Primary button**

    Use the primary button to lead a main call to
    action, such as changing the status of an order, or submitting a form. We suggest
    only using one primary button on each page (not including the primary button
    on a different layer). If there is another strong action needed, compare
    their priority and choose the most important one.

    **Secondary Button**

    Use a secondary button only when there is a main call to action in the page.

    **Danger Button**

    The danger button should be used only for actions which can't be undone.
    For example, canceling an order or deleting a material. Like the primary button, it should also limited to once per page.

    **Default button**

    This button can be used in most cases.

    **Text button**

    A text button can be used for sub-menus and page navigation. It also can pair with a primary button for destructive actions such as `Cancel`.

    ## Label

    <div class="element-example">
    	<KtButton type="primary" icon="edit" label="Edit Button"/>
    </div>

    Instead of using the default slot, you can also provide text via the `label` property. Note that `v-text` and `v-t` are **NOT SUPPORTED**.

    ```html
    <KtButton type="primary" icon="edit" label="Edit Button"/>
    ```

    ## Icon

    <div class="element-example">
    	<KtButton type="primary" class="mr-4">Edit button</KtButton>
    	<KtButton type="primary" icon="edit" label="Edit Button" class="mr-4" />
    	<KtButton type="primary" icon="edit" label="Right Icon Button" iconPosition="right"/>
    	<KtButton type="primary" icon="edit" helpText="This is an icon button"/>
    </div>

    * **Label only:** Used in most cases.
    * **Icon and label:** Use when you need to catch the user's attention.
    * **Icon only:** Use when you have limited space, such as when the page needs to fit on a mobile device, and a single icon is enough to convey the meaning,
    * **iconPosition** prop can be used to place icon to the right of the label. Is left by default.
    * **helpText** prop can be passed to **Icon only** buttons that is displayed on button hover.

    ```html
    <KtButton type="primary">Edit button</KtButton>
    <KtButton type="primary" icon="edit" label="Edit Button" />
    <KtButton type="primary" icon="edit" helpText="This is an icon button"/>
    <KtButton type="primary" icon="edit" label="Right Icon Button" iconPosition="right"/>
    ```
    ## `isMultiline`/`isBlock`

    For handling long text, we can use the `isMultiline` and `isBlock` properties.

    ```html
    <KtButton>Purchase</KtButton>
    <KtButton isMultiline>Purchase this product without the 5 year garantee and proceed with the 2 year only garantee</KtButton>
    ```

    <div class="element-example">
    	<div style="width: 200px;">
    		<KtButton block type="primary">Purchase</KtButton><br>
    		<KtButton icon="save" isBlock isMultiline>Purchase this product without the 5 year garantee</KtButton><br>
    		<KtButton isBlock isMultiline>Purchase this product without the 5 year garantee and proceed with the 2 year only garantee</KtButton>
    	</div>
    	<br>
    	<br>
    		<KtButton isMultiline>Multiline works on one line if the parent does not constraint the width</KtButton><br>
    		<KtButton isMultiline>(But the height is less reliable as it uses <code>line-height</code>)</KtButton>
    </div>

    ## Loading

    <div class="element-example">
    	<KtButton isLoading class="mr-16px" icon="edit">Loading button</KtButton>
    	<KtButton type="primary" class="mr-16px" isLoading icon="edit" iconPosition="right">Loading button</KtButton>
    	<KtButton type="secondary" class="mr-16px" isLoading>Loading</KtButton>
    	<KtButton type="danger" class="mr-16px" isLoading>Loading</KtButton>
    </div>

    ```html
    <KtButton isLoading>Loading button</KtButton>
    <KtButton type="primary" isLoading>Loading button</KtButton>
    <KtButton type="secondary" isLoading/>
    <KtButton type="danger" isLoading/>
    ```

    ## Button Group

    <div class="element-example">
    	<KtButtonGroup>
    		<KtButton type="primary" icon="edit">Edit</KtButton>
    		<KtButton type="secondary" icon="trash">Delete</KtButton>
    	</KtButtonGroup>
    </div>

    ```html
    <KtButtonGroup>
    	<KtButton type="primary" icon="edit">Edit</KtButton>
    	<KtButton type="secondary" icon="trash">Delete</KtButton>
    </KtButtonGroup>
    ```

    ## Size

    <div class="element-example">
    	<KtButton type="primary" size="small" icon="edit" class="mr-16px">Small</KtButton>
    	<KtButton isLoading size="medium" class="mr-16px">Medium (Default)</KtButton>
    	<KtButton size="large" icon="edit">Large</KtButton>
    </div>

    `KtButton` has 3 size: `small`, `medium` and `large`.

    ```html
    	<KtButton type="primary" size="small" icon="edit" class="mr-16px">Small</KtButton>
    	<KtButton isLoading size="medium" class="mr-16px">Medium (Default)</KtButton>
    	<KtButton size="large" icon="edit">Large</KtButton>
    ```

    ## `isSubmit`

    If you want the button to trigger the native `form` `submit` event, you need to opt-in via `<KtButton isSubmit/>`
</template>

<script lang="ts">
import { KtButton } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'
import ShowCase from '~/components/ShowCase.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsButton',
	components: {
		ComponentInfo,
		ShowCase,
	},
	setup() {
		return {
			alert: (value: string) => window.alert(value),
			component: KtButton,
		}
	},
})
</script>
