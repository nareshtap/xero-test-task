import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api' // Default to localhost if not set

// Function to fetch balance sheet data
export const fetchBalanceSheet = async (): Promise<any> => {
	try {
		const response = await axios.get(`${apiUrl}/api/balance-sheet`)
		return response.data
	} catch (error) {
		console.error('Error fetching balance sheet:', error)
		throw new Error('Failed to fetch balance sheet data')
	}
}
