import dayjs from 'dayjs'

import { ISO8601_SECONDS } from '../../../../constants'

/**
 * Creates a File from a Blob.
 * File name is set to current time in ISO8601 format with ".png" file extension.
 * @param blob Blob object
 * @returns File object
 */
const blobToFile = (blob: Blob): File =>
	new File([blob], `${dayjs().format(ISO8601_SECONDS)}.png`, {
		lastModified: Date.now(),
		type: blob.type,
	})

/**
 * Generates a PNG file and image url string from the current data in the canvas element
 * @param canvasEl HTML Canvas Element
 * @param context Canvas Rendering Context 2D
 * @param videoEl HTML Video Element
 * @returns File object and url string
 */
export const generateImageFileAndUrl = async (
	canvasEl: HTMLCanvasElement,
	context: CanvasRenderingContext2D,
	videoEl: HTMLVideoElement,
): Promise<{
	file: File
	photoUrl: string
}> => {
	const { videoHeight, videoWidth } = videoEl
	canvasEl.height = videoHeight
	canvasEl.width = videoWidth
	context.drawImage(videoEl, 0, 0, videoWidth, videoHeight)

	const blob = await new Promise<Blob | null>((resolve) => {
		canvasEl.toBlob(resolve)
	})

	if (!blob) throw new Error('KtFieldFileUpload: error generating image blob')

	const file = blobToFile(blob)
	const photoUrl = canvasEl.toDataURL('image/png')

	return {
		file,
		photoUrl,
	}
}
