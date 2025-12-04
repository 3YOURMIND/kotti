import { describe, expect, expectTypeOf, test } from 'vitest'

import { createToaster } from './create-toaster'

describe('toaster.withOptions', () => {
	const toaster = createToaster<{
		default: Record<string, never>
		error: { error: 'error' }
	}>({})

	test('must contain `duration` or `type` field', () => {
		expectTypeOf(toaster.withOptions({})).toBeFunction() // a noop, but allowed
		expectTypeOf(toaster.withOptions({ type: 'error' })).toBeFunction()
		expectTypeOf(toaster.withOptions({ duration: 1200 })).toBeFunction()

		// @ts-expect-error only having a `text` field is not acceptable
		expectTypeOf(toaster.withOptions({ text: 'something' })).toBeFunction()
		// @ts-expect-error `type` is only accepted to be 'default' or 'error'
		expectTypeOf(toaster.withOptions({ type: 'something' })).toBeFunction()
	})

	test('can not pass `custom` field in opions', () => {
		expectTypeOf(
			// @ts-expect-error withOptions does not accept custom field
			toaster.withOptions({
				custom: { error: 'error' }, // wrong
				type: 'error',
			}),
		).toBeObject()
	})

	test('will not accept superfluous parameter fields', () => {
		expectTypeOf(
			// @ts-expect-error withOptions does rightfully not accept the `any` field
			toaster.withOptions({
				any: 'thing', // wrong
				type: 'error',
			}),
		).toBeFunction()
	})

	describe('default toaster', () => {
		const defaultToaster = toaster.withOptions({ type: 'default' })
		const defaultToasterWithDuration = toaster.withOptions({
			duration: 600,
			type: 'default',
		})

		test('can call default Toaster', () => {
			expectTypeOf(defaultToaster({ text: 'wow' })).toBeObject()
			expectTypeOf(defaultToaster({ custom: {}, text: 'wow' })).toBeObject()
			expectTypeOf(defaultToaster({ duration: 1200, text: 'wow' })).toBeObject()

			expectTypeOf(defaultToasterWithDuration({ text: 'wow' })).toBeObject()
			expectTypeOf(
				defaultToasterWithDuration({ custom: {}, text: 'wow' }),
			).toBeObject()
			expectTypeOf(
				defaultToasterWithDuration({
					duration: 1200, // can override default duration
					text: 'wow',
				}),
			).toBeObject()
		})

		test('validates input correctly', () => {
			expect(() => {
				// @ts-expect-error custom is not allowed to contain any data
				defaultToaster({ custom: { error: 'error' }, text: 'wow' })
			}).not.toThrow()

			expect(() => {
				// @ts-expect-error defaultToaster does rightfully not accept the `any` field
				defaultToaster({ any: 'something', text: 'wow' })
			}).toThrow()

			expect(() => {
				// @ts-expect-error needs to pass `text` field
				defaultToaster({ duration: 1000 })
			}).toThrow()

			expect(() => {
				defaultToaster({
					// @ts-expect-error defaultToaster can not produce error toasts
					custom: { error: 'error' },
					text: 'yikes',
					// @ts-expect-error defaultToaster can not produce error toasts
					type: 'error',
				})
			}).not.toThrow()
		})
	})

	describe('error toaster', () => {
		const errorToaster = toaster.withOptions({ type: 'error' })
		const errorToasterWithDuration = toaster.withOptions({
			duration: 300,
			type: 'error',
		})

		test('can call errorToaster', () => {
			expectTypeOf(
				errorToaster({ custom: { error: 'error' }, text: 'wow' }),
			).toBeObject()
			expectTypeOf(
				errorToaster({ custom: { error: 'error' }, text: 'wow' }),
			).toBeObject()
			expectTypeOf(
				errorToaster({
					custom: { error: 'error' },
					duration: 1200,
					text: 'wow',
				}),
			).toBeObject()

			expectTypeOf(
				errorToasterWithDuration({ custom: { error: 'error' }, text: 'wow' }),
			).toBeObject()
			expectTypeOf(
				errorToasterWithDuration({ custom: { error: 'error' }, text: 'wow' }),
			).toBeObject()
			expectTypeOf(
				errorToasterWithDuration({
					custom: { error: 'error' },
					duration: 1200, // can override default duration
					text: 'wow',
				}),
			).toBeObject()
		})

		test('validates input correctly', () => {
			expectTypeOf(
				// @ts-expect-error custom field needs to be passed
				errorToaster({ text: 'wow' }),
			).toBeObject()

			expect(() => {
				// @ts-expect-error text field needs to be passed
				errorToaster({ custom: { error: 'error' } })
			}).toThrow()

			expect(() => {
				// @ts-expect-error defaultToaster does rightfully not accept the `any` field
				errorToaster({
					any: 'something',
					custom: { error: 'error' },
					text: 'wow',
				})
			}).toThrow()

			expect(() => {
				errorToaster({
					// @ts-expect-error custom data needs to have right layout
					custom: { any: 'something' },
					text: 'yikes',
				})
			}).not.toThrow()

			expect(() => {
				// @ts-expect-error errorToaster can not produce default toasts
				errorToaster({ text: 'wow', type: 'default' })
			}).not.toThrow()
		})
	})
})
