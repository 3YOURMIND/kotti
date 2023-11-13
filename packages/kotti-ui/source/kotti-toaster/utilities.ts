/* eslint-disable no-magic-numbers */

import { KottiToaster } from './types'

/**
 * @description generates a random id
 * @param ID_BITS id entropy in bits, defaults to 64 (4 words)
 * @returns random id
 */
export const generateId = (ID_BITS = 64): string => {
	const randomWord = () =>
		Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)

	const result = []

	for (let i = 0; i < ID_BITS; i += 16) result.push(randomWord())

	return result.join('')
}

/**
 * @description curried function that filters all ids that don't match a given id
 * @param {String} $0.id first id
 * @returns {Function} compares id1 to passed id
 */

export const notId: (
	id1: KottiToaster.NotificationInternal['id'],
) => (id2: KottiToaster.NotificationInternal['id']) => boolean =
	(id1) => (id2) =>
		id1 !== id2
