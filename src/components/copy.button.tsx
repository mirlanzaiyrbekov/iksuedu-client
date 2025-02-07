import { useCopyClipBoard } from '@/hooks/use-copyClip-board'
import { LinkIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface ICopyClipBoardProps {
	content: string
}
export const CopyClipBoard: React.FC<ICopyClipBoardProps> = ({ content }) => {
	const handleCopy = useCopyClipBoard()

	return (
		<Button variant={'outline'} size={'sm'} onClick={() => handleCopy(content)}>
			<LinkIcon />
		</Button>
	)
}
