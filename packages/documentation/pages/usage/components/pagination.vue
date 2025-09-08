<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Basic Usage

<div class="element-example white">
	<KtPagination :total="50" :page="page50" :pageSize="10" @setPage="updatePage50"/>
</div>

```html
<KtPagination :total="50" :pageSize="10" />
```

## Default Page

<div class="element-example white">
	<KtPagination :total="50" :pageSize="10" :page="page50" @setPage="updatePage50" />
</div>

```html
<KtPagination :total="50" :pageSize="10" />
```

## Styles

#### Expanded

<div class="element-example white">
	<KtPagination pagingStyle="expand" :total="50" :pageSize="10" :page="page50" @setPage="updatePage50" />
</div>

```html
<KtPagination pagingStyle="expand" :total="50" :pageSize="10" />
```

#### Fraction

<div class="element-example white">
	<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" :page="page50" @setPage="updatePage50" />
</div>

```html
<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" />
```

#### Flexible

<div class="element-example white">
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="page500" @setPage="updatePage500" />
</div>

```html
<KtPagination pagingStyle="flex" :total="500" :pageSize="10" />
```

##### Flexible without right bound

With flexible pagination components you can omit the `total` prop. This will make the upper bound disappear, the user
can increase the page indefinitely. This is useful for cases where the total number of pages is not (yet) known

<div class="element-example white">
	<KtPagination pagingStyle="flex" :pageSize="10" :page="page500" @setPage="updatePage500" />
</div>

#### Extra Options

<div class="element-example white">
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="page500"  @setPage="updatePage500" :adjacentAmount="1"/>
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="page500"  @setPage="updatePage500" :adjacentAmount="2"/>
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="page500"  @setPage="updatePage500" :adjacentAmount="3"/>
	<br/>
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="page500"  @setPage="updatePage500"/>
	<KtPagination pagingStyle="flex" :total="500" :pageSize="10" :page="page500"  @setPage="updatePage500" fixedWidth/>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { KtPagination } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsPagination',
	components: {
		ComponentInfo,
	},
	setup() {
		const page50 = ref(1)
		const page500 = ref(1)
		const pageLimitLess = ref(1)
		return {
			component: KtPagination,
			page50,
			page500,
			pageLimitLess,
			updatePage50: (page: number) => {
				page50.value = page
			},
			updatePage500: (page: number) => {
				page500.value = page
			},
			updatePageLimitless: (page: number) => {
				pageLimitLess.value = page
			},
		}
	},
})
</script>
