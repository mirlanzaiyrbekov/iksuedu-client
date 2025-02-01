import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ILink } from '@/interfaces/link.interface'
import React from 'react'
interface INavigationComponentProps {
	links?: ILink[]
}
export const NavigationComponent: React.FC<INavigationComponentProps> = ({
	links,
}) => {
	return (
		<div className="my-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Мои тесты</BreadcrumbLink>
					</BreadcrumbItem>
					{links
						? links.map((link) => (
								<React.Fragment key={link.url}>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbLink href={link.url}>{link.name}</BreadcrumbLink>
									</BreadcrumbItem>
								</React.Fragment>
						  ))
						: null}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}
