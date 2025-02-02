import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './styles/index.css'

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HelmetProvider>
			<QueryClientProvider client={client}>
				<App />
			</QueryClientProvider>
		</HelmetProvider>
	</StrictMode>
)
