import { AttempType } from '@/types/attemp.types'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import React from 'react'

export const useAttemp = () => {
	const [attemp, setAttemp] = React.useState<AttempType>()

	React.useEffect(() => {
		const fetchDeviceInfo = async () => {
			const ipResponse = await fetch('https://api.ipify.org?format=json', {
				method: 'GET',
			})
			const jsonData = await ipResponse.json()
			const ipAddress = jsonData.ip

			const fp = await FingerprintJS.load()
			const fingerprintResult = await fp.get()

			const userAgent = navigator.userAgent

			const deviceModel =
				/iPhone|iPad|Android|Windows|Mac|Linux/.exec(userAgent)?.[0] ||
				'Unknown'
			setAttemp({
				deviceModel,
				fingerprint: fingerprintResult.visitorId,
				userAgent,
				ipAddress,
			})
		}
		fetchDeviceInfo()
	}, [])

	return { attemp }
}
