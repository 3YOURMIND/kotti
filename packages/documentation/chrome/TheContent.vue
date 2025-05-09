<template>
	<div id="page-container">
		<div id="page-content">
			<slot />
		</div>
	</div>
</template>

<style>
/* Page Transition Animation */
body.page-is-transitioning #page-content {
	opacity: 0;
}

.content {
	width: 100%;
	max-width: 40rem;
	margin: 0 auto;
}

.content img {
	max-width: 100%;
}
</style>

<style>
/* Page Transition Animation */
#page-content {
	width: 100%;
	max-width: 40rem;
	margin: 0 auto;
	opacity: 1;
	transition: opacity 0.3s ease-in-out;
}

#page-content img {
	max-width: 100%;
}
</style>
