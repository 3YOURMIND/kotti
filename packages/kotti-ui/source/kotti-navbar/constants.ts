/* eslint-disable sonarjs/no-duplicate-string */

import { InjectionKey, Ref } from '@vue/composition-api'

import { KottiNavbar } from './types'

export const KT_NAVBAR_CONTEXT: InjectionKey<Ref<KottiNavbar.Context>> =
	Symbol('KT_NAVBAR_CONTEXT')

export const NAVBAR_THEME: Record<
	KottiNavbar.Theme,
	{
		background: string
		border: string
		color: string
		colorActive: string
		colorLight: string
		userMenuBackgroundActive: string
		userMenuBackground: string
		userMenuColor: string
	}
> = {
	[KottiNavbar.Theme.DARK]: {
		background: 'var(--gray-90)',
		border: 'var(--gray-70)',
		color: 'var(--gray-10)',
		colorActive: 'var(--gray-10)',
		colorLight: 'var(--primary-10)',
		userMenuBackgroundActive: 'var(--gray-80)',
		userMenuBackground: 'var(--gray-70)',
		userMenuColor: 'var(--gray-10)',
	},
	[KottiNavbar.Theme.DEFAULT]: {
		background: 'var(--primary-70)',
		border: 'var(--primary-60)',
		color: 'var(--primary-10)',
		colorActive: 'var(--white)',
		colorLight: 'var(--primary-20)',
		userMenuBackgroundActive: 'var(--primary-70)',
		userMenuBackground: 'var(--primary-60)',
		userMenuColor: 'var(--primary-10)',
	},
	[KottiNavbar.Theme.LIGHT]: {
		background: 'var(--white)',
		border: 'var(--gray-20)',
		color: 'var(--primary-90)',
		colorActive: 'var(--primary-50)',
		colorLight: 'var(--primary-80)',
		userMenuBackgroundActive: 'var(--gray-20)',
		userMenuBackground: 'var(--gray-10)',
		userMenuColor: 'var(--primary-90)',
	},
	[KottiNavbar.Theme.REVERSE]: {
		background: 'var(--primary-10)',
		border: 'var(--primary-20)',
		color: 'var(--primary-80)',
		colorActive: 'var(--primary-60)',
		colorLight: 'var(--primary-100)',
		userMenuBackgroundActive: 'var(--primary-30)',
		userMenuBackground: 'var(--primary-20)',
		userMenuColor: 'var(--primary-80)',
	},
}
