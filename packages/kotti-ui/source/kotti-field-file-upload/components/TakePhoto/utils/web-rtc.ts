/**
 * Checks whether WebRTC is supported
 * @returns true if supported, else false
 */
export const isWebRTCSupported = (): boolean =>
	!(
		!window.navigator.mediaDevices ||
		!window.navigator.mediaDevices.enumerateDevices ||
		!window.navigator.mediaDevices.getUserMedia
	)

/**
 * Requests a list of the available cameras
 * @returns MediaDeviceInfo array describing the cameras
 */
export const getConnectedCameras = async (): Promise<MediaDeviceInfo[]> => {
	const devices = await window.navigator.mediaDevices.enumerateDevices()
	return devices.filter((device) => device.kind === 'videoinput')
}

/**
 * Requests a camera by its deviceId. It will prompt the user for permission to use the camera.
 * @param cameraId The camera ID
 * @returns MediaStream with the camera's video track
 */
export const requestCamera = async (cameraId: string): Promise<MediaStream> => {
	const constraints: MediaStreamConstraints = {
		audio: false,
		video: {
			deviceId: cameraId,
			height: { ideal: 8192 },
			width: { ideal: 8192 },
		},
	}
	return await window.navigator.mediaDevices.getUserMedia(constraints)
}

/**
 * Stops the camera's assosiated stream media video tracks
 * @param stream MediaStream with the camera's video track
 */
export const stopCameraStream = (stream: MediaStream | null) => {
	if (stream) stream.getTracks().forEach((track) => track.stop())
}
