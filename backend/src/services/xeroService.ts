import axios, { AxiosResponse } from 'axios'
import { BalanceSheetResponse } from '../types'

// The fetchBalanceSheet function to retrieve the balance sheet data
export const fetchBalanceSheet = async (): Promise<BalanceSheetResponse> => {
	try {
		// Define the API URL with a fallback
		const apiUrl = process.env.MOCK_XERO_API_URL

		if (!apiUrl) {
			throw new Error('Xero API not found')
		}
		// Fetch data from the balance sheet endpoint
		const response: AxiosResponse<BalanceSheetResponse> = await axios.get(
			`${apiUrl}/api.xro/2.0/Reports/BalanceSheet`
		)

		// Return the data from the response
		return response.data
	} catch (error: any) {
		// Handle error and throw with a custom error message
		console.error('Error fetching balance sheet:', error)
		throw new Error('Balance sheet fetch failed: ' + error.message)
	}
}
