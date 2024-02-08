<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Basic Usage

<div class="element-example white">
	<KtPagination :total="50" :pageSize="10"/>
</div>

```html
<KtPagination :total="50" :pageSize="10" />
```

## Default Page

<div class="element-example white">
	<KtPagination :total="50" :pageSize="10" :page="3" />
</div>

```html
<KtPagination :total="50" :pageSize="10" :page="3" />
```

## Styles

#### Expanded

<div class="element-example white">
	<KtPagination pagingStyle="expand" :total="50" :pageSize="10"/>
</div>

```html
<KtPagination pagingStyle="expand" :total="50" :pageSize="10" />
```

#### Fraction

<div class="element-example white">
	<KtPagination pagingStyle="fraction" :total="50" :pageSize="10"/>
</div>

```html
<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" />
```

#### Flexible

<div class="element-example white">
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10"/>
</div>

```html
<KtPagination pagingStyle="flex" :total="500" :pageSize="10" />
```

#### Extra Options

<div class="element-example white">
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="25" :adjacentAmount="1"/>
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="25" :adjacentAmount="2"/>
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="25" :adjacentAmount="3"/>
	<br/>
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10"/>
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" fixedWidth/>
</div>

```html
<KtPagination
	pagingStyle="flex"
	:total="500"
	:pageSize="10"
	:page="25"
	:adjacentAmount="1"
/>
<KtPagination
	pagingStyle="flex"
	:total="500"
	:pageSize="10"
	:page="25"
	:adjacentAmount="2"
/>
<KtPagination
	pagingStyle="flex"
	:total="500"
	:pageSize="10"
	:page="25"
	:adjacentAmount="3"
/>

<KtPagination pagingStyle="flex" :total="500" :pageSize="10" />
<KtPagination pagingStyle="flex" :total="500" :pageSize="10" fixedWidth />
```

## Usage

### Props

| Attribute        | Description                                  | Type      | Accepted Values              | Default    |
| :--------------- | :------------------------------------------- | :-------- | :--------------------------- | :--------- |
| `adjacentAmount` | number of pairs of adjacent pages to display | `Number`  | --                           | `1`        |
| `fixedWidth`     | set width based on max number of elements    | `Boolean` | `True`, `False`              | `False`    |
| `page`           | the default page to show                     | `Number`  | --                           | --         |
| `pageSize`       | amount of items each page                    | `Number`  | --                           | `10`       |
| `pagingStyle`    | style of the pagination                      | `String`  | `expand`, `flex`, `fraction` | `expand`   |
| `total`          | total amount of items                        | `Number`  | --                           | `Required` |

### Events

| Event Name            | Description                               | Parameters                             |
| :-------------------- | :---------------------------------------- | :------------------------------------- |
| `currentPageChange`   | trigger when number clicked               | `(event: Event, payload: currentPage)` |
| `nextPageClicked`     | trigger when next page button clicked     | `(event: Event, payload: currentPage)` |
| `previousPageClicked` | trigger when previous page button clicked | `(event: Event, payload: currentPage)` |
</template>

<script lang="ts">
import { KtPagination } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsPagination',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtPagination,
		}
	},
})
</script>
