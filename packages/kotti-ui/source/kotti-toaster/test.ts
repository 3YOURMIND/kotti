// TODO: turn this into a type test

withOptions({
	custom: {}, // wrong
	type: 'error',
})({ text: 'anything' })

withOptions({
	custom: { error: 'error' },
	any: 'thing', // wrong
	type: 'error',
})({
	text: 'wow',
	custom: { error: 'error' },
})

withOptions({ text: 'something' }) // illegal
// withOptions({})({type: 'error', custom: {'error': 'error'}, text: 'wow'})

withOptions({ custom: {}, type: 'default' })({
	custom: { error: 'error' },
	type: 'error',
	text: 'error',
})

withOptions({ custom: {}, type: 'default' })({ text: 'wow' })
withOptions({ custom: {}, type: 'default' })({ custom: {}, text: 'wow' })
withOptions({ custom: {}, type: 'default' })({
	custom: { error: 'error' }, // wrong
	text: 'wow',
})

withOptions({ type: 'default' })({ text: 'wow' })
withOptions({ type: 'default' })({ custom: {}, text: 'wow' })
withOptions({ type: 'error' })({
	type: 'default',
	custom: {
		error: 'error', // wrong
	},
	text: 'wow',
})
withOptions({ type: 'error' })({
	custom: {},
	text: 'wow',
}) // wrong
withOptions({ type: 'error' })({ custom: { error: 'error' }, text: 'wow' })
withOptions({
	duration: 5000,
	type: 'error',
})({
	duration: 6000,
	custom: { error: 'error' },
	text: 'wow',
})

withOptions({ type: 'default' })({
	type: 'error',
	custom: { error: 'error' },
	// wrong, no text
})

withOptions({ type: 'error' })({
	text: 'wow',
	// wrong, no custom
})

withOptions({ type: 'error' })({
	custom: { error: 'error' },
	// wrong, no text
})

withOptions({ type: 'default' })({
	type: 'error',
	custom: { error: 'error' },
	text: 'wow',
})
withOptions({ duration: 5000 })({
	type: 'error',
	custom: {}, // wrong
	text: 'wow',
})
withOptions({ duration: 5000 })({
	type: 'error',
	custom: { error: 'error' },
	text: 'wow',
})
