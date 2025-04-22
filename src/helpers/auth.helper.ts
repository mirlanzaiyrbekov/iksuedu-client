export const generateStrongPassword = (length = 12): string => {
	const chars = {
		uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		lowercase: 'abcdefghijklmnopqrstuvwxyz',
		numbers: '0123456789',
		symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
	}
	const requiredChars = [
		chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)],
		chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)],
		chars.numbers[Math.floor(Math.random() * chars.numbers.length)],
		chars.symbols[Math.floor(Math.random() * chars.symbols.length)],
	]
	const allChars = Object.values(chars).join('')
	const randomChars = Array.from(
		{ length: length - 4 },
		() => allChars[Math.floor(Math.random() * allChars.length)]
	)
	return [...requiredChars, ...randomChars]
		.sort(() => Math.random() - 0.5)
		.join('')
}
