<template lang="md">

# Select

## Default

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value1"
		:options="words"/>
	<h5 v-text="`English: ${value1}`" class="mt-16px"/>
</div>

## Compact

<div class="element-example">
	<KtSelect label="Words"
		is-compact
		placeholder="Select Word"
		v-model="value1"
		:options="words"/>
	<h5 v-text="`English: ${value1}`" class="mt-16px"/>
</div>

## Allow Empty

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value2"
		allowEmpty
		:options="words"/>
	<h5 v-text="`English: ${value2}`" class="mt-16px"/>
	<button @click="value2=null">Reset</button>
</div>

## Disable

```js

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		disabled
		v-model="value2"
		allowEmpty
		:options="words"/>
	<h5 v-text="`English: ${value2}`" class="mt-16px"/>
	<button @click="value2=null">Reset</button>
</div>

```

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		disabled
		v-model="value2"
		allowEmpty
		:options="words"/>
	<h5 v-text="`English: ${value2}`" class="mt-16px"/>
	<button @click="value2=null">Reset</button>
</div>


## Filterable

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value3"
		filterable
		allowEmpty
		:options="words"/>
	<h5 v-text="`English: ${value3}`" class="mt-16px"/>
</div>


```js
{
	words: [
		{
			label: '西瓜',
			value: 'Watermelon',
		},
		{
			label: '西蕉',
			value: 'Waternana',
		},
		{
			label: '香蕉',
			value: 'Banana',
		},
		{
			label: '鳄梨',
			value: 'Avocados',
		},
		{
			label: '苹果',
			value: 'Apple',
		},
	],
}
```

## Icon

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value3"
		filterable
		allowEmpty
		icon="user"
		:options="words"/>
	<h5 v-text="`English: ${value3}`" class="mt-16px"/>
</div>

## Required

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value5"
		required
		icon="user"
		:options="words"/>
	<h5 v-text="`English: ${value5}`" class="mt-16px"/>
</div>

if you allowEmpty, you can't make the field required. allowEmpty will make field valid in that case

```html
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value5"
		required
		icon="user"
		:options="words"/>
```

## Async Search

<div class="element-example">
	<KtSelect label="Country"
		placeholder="Select Country"
		v-model="value4"
		allowEmpty
		filterable
		isAsync
		:isLoading="loadingOnRequest"
		@asyncMethod="asyncFind"
		:options="countryOptions"
		/>
	<h5 v-text="`Native Name: ${value4}`" class="mt-16px"/>
</div>


```html
<KtSelect label="Country"
	placeholder="Select Country"
	v-model="value4"
	allowEmpty
	filterable
	:isLoading="loadingOnRequest"
	@asyncMethod="asyncFind"
	:options="countryOptions"/>
<h5 v-text="`Native Name: ${value4}`" class="mt-16px"/>
```

```js
async asyncFind(query) {
	const BASE_URL = `https://restcountries.eu/rest/v2`
	const queryURL = !query ? `${BASE_URL}/all` : `${BASE_URL}/name/${query}`
	this.loadingOnRequest = true
	await this.$axios.$get(queryURL).then(response => {
		let coutriesOptions = response.map(country => ({
			label: country.name,
			value: country.nativeName,
		}))
		this.loadingOnRequest = false
		this.countryOptions = coutriesOptions
	}).catch(()=>{
		this.loadingOnRequest = false
	})
},
```

</template>

<script>
export default {
	name: 'KtSelectDoc',
	data() {
		return {
			value1: null,
			value2: null,
			value3: 'Avocados',
			value4: null,
			value5: null,
			words: [
				// {
				// 	label: 'Empty',
				// 	value: null,
				// },
				{
					label: '西瓜',
					value: 'Watermelon',
				},
				{
					label: '西蕉',
					value: 'Waternana',
				},
				{
					label: '香蕉',
					value: 'Banana',
					disabled: true,
				},
				{
					label: '鳄梨',
					value: 'Avocados',
				},
				{
					label: '苹果',
					value: 'Apple',
				},
			],
			loadingOnRequest: false,
			countryOptions: [],
		}
	},
	methods: {
		async asyncFind(query) {
			const BASE_URL = `https://restcountries.eu/rest/v2`
			const queryURL = !query ? `${BASE_URL}/all` : `${BASE_URL}/name/${query}`
			this.loadingOnRequest = true
			await this.$axios
				.$get(queryURL)
				.then((response) => {
					const coutriesOptions = response.map((country) => ({
						label: country.name,
						value: country.nativeName,
					}))
					this.loadingOnRequest = false
					this.countryOptions = coutriesOptions
				})
				.catch(() => {
					this.loadingOnRequest = false
				})
		},
	},
}
</script>
<style lang="scss" scoped>
.element-example {
	overflow: auto;
}
</style>
