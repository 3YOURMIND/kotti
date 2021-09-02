/* eslint-disable no-magic-numbers */
/**
 * @description generates a random id
 * @param {Number} ID_BITS id entropy in bits, defaults to 64 (4 words)
 * @returns {String} random id
 */
export const generateId = (ID_BITS = 64) => {
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
export const notId =
	({ id: id1 }) =>
	({ id: id2 }) =>
		id1 !== id2
