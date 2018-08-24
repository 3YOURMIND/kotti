<template lang="md">
# Pagination

## Basic Usage

<div class="element-example white">
	<KtPagination :total="100" :pageSize="25"/>
</div>

```html
<KtPagination :total="100" :pageSize="25"/>
```

## Default Page

<div class="element-example white">
	<KtPagination :total="100" :pageSize="25" :page="2" />
</div>

```html
<KtPagination :total="100" :pageSize="25" :page="2" />
```

## Fraction Style

<div class="element-example white">
	<KtPagination :total="100" :pageSize="25" fractionStyle/>
</div>

```html
<KtPagination :total="100" :pageSize="25" fractionStyle/>
```

## Usage

### Props

| Attribute       | Description               | Type      | Accepted Values | Default    |
|:----------------|:--------------------------|:----------|:----------------|:-----------|
| `total`         | total amount of items     | `Number`  | --              | `Required` |
| `pageSize`      | amount of items each page | `Number`  | --              | `10`       |
| `page`          | the default page to show  | `Number`  | --              | --         |
| `fractionStyle` | fraction style pagination | `Boolean` | --              | `false`    |

### Events

| Event Name            | Description                               | Parameters                             |
|:----------------------|:------------------------------------------|:---------------------------------------|
| `currentPageChange`   | trigger when number clicked               | `(event: Event, payload: currentPage)` |
| `nextPageClicked`     | trigger when next page button clicked     | `(event: Event, payload: currentPage)` |
| `previousPageClicked` | trigger when previous page button clicked | `(event: Event, payload: currentPage)` |

</template>


<script>
import KtPagination from '../../../packages/kotti-pagination'
export default {
	name: 'KtPaginationDoc',
	components: {
		KtPagination,
	},
}
</script>
