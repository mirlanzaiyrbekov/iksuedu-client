export const getContentType = () => ({
	'Content-Type': 'application/json',
})

export const errorCatch = (err: any) => {
	const message = err?.response?.data?.message

	return message
		? typeof err.response.data.message === 'object'
			? message[0]
			: message
		: err.message
}
