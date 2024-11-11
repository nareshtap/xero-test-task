import axios, { AxiosResponse } from 'axios'
import { BalanceSheetResponse } from '../types'

// Define the API URL with a fallback
const apiUrl: string =
	process.env.MOCK_XERO_API_URL || 'http://mock-xero-api:3000'

// The fetchBalanceSheet function to retrieve the balance sheet data
export const fetchBalanceSheet = async (): Promise<BalanceSheetResponse> => {
	try {
		console.log('-> apiUrl:', apiUrl)

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
