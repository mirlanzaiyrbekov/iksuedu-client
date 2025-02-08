import { useCopyClipBoard } from '@/hooks/use-copyClip-board'
import { useExpiredDate } from '@/hooks/use-expired-date'
import { LinkIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface ICopyClipBoardProps {
	content: string
	expire: Date
}
export const CopyClipBoard: React.FC<ICopyClipBoardProps> = ({
	content,
	expire,
}) => {
	const handleCopy = useCopyClipBoard()
	const { inActive } = useExpiredDate(expire)

	return (
		<Button
			disabled={inActive}
			variant={'outline'}
			size={'sm'}
			onClick={() => handleCopy(content)}
		>
			<LinkIcon />
		</Button>
	)
}
