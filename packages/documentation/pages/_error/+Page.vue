<script lang="ts">
export default {
	name: 'ErrorPage',
}
</script>

<script lang="ts" setup>
import { usePageContext } from 'vike-vue/usePageContext'

const ctx = usePageContext()
const { abortReason, is404 } = ctx
const reason =
	abortReason ??
	(is404 ? 'This page could not be found.' : 'Something went wrong.')
const heading = is404 ? '404 Page Not Found' : '500 Internal Server Error'
</script>

<template>
	<h1>{{ heading }}</h1>
	<p>{{ reason }}</p>
</template>
