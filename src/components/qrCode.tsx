import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useExpiredDate } from '@/hooks/use-expired-date'
import { QrCode, Share2 } from 'lucide-react'
import QRCode from 'react-qr-code'
import {
	TelegramIcon,
	TelegramShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share'

interface IQrCodeComponentProps {
	url: string
	expire: Date
}
export const QrCodeComponent: React.FC<IQrCodeComponentProps> = ({
	url,
	expire,
}) => {
	const { inActive } = useExpiredDate(expire)

	return (
		<Dialog>
			<DialogTrigger disabled={inActive}>
				<div className="border p-1 rounded-sm">
					<QrCode />
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Отсканируйте QR код.</DialogTitle>
					<DialogDescription
						asChild
						className="flex items-center justify-center py-10"
					>
						<div className="flex flex-col gap-3 justify-center">
							<div className="border border-gray-200 p-4 rounded-md">
								<QRCode value={url} className="w-32 h-32" />
							</div>
							<span className="flex items-center justify-center gap-1.5 border p-2 rounded-md">
								<Share2 size={16} />
								Поделиться в
							</span>
							<div className="flex items-center justify-center">
								<WhatsappShareButton url={url}>
									<div className="w-10 h-10 relative text-sm">
										<WhatsappIcon size={32} className="rounded-sm" />
									</div>
								</WhatsappShareButton>
								<TelegramShareButton url={url}>
									<div className="w-10 h-10 relative text-sm">
										<TelegramIcon size={32} className="rounded-sm" />
									</div>
								</TelegramShareButton>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
