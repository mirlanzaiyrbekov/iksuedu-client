import { Button } from '@/components/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { QrCode, Share2 } from 'lucide-react'
import QRCode from 'react-qr-code'

export const QrCodeComponent: React.FC = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={'outline'} size={'sm'}>
					<QrCode />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Отсканируйте QR код.</DialogTitle>
					<DialogDescription className="flex items-center justify-center py-10">
						<div className="flex flex-col gap-3 justify-center">
							<div className="border border-gray-200 p-4 rounded-md">
								<QRCode value="https://iksu.academy" className="w-32 h-32" />
							</div>
							<Button>
								<Share2 />
								Поделиться в
							</Button>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
