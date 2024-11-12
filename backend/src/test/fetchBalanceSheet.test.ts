import axios from 'axios'
import { fetchBalanceSheet } from './../services/xeroService'
import { BalanceSheetResponse } from './../types/index'

// Mock the axios module
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('fetchBalanceSheet', () => {
	const mockApiUrl = process.env.MOCK_XERO_API_URL
	const mockBalanceSheetResponse: BalanceSheetResponse = {
		Status: 'OK',
		Reports: [
			{
				ReportID: '123',
				ReportName: 'Balance Sheet Report',
				ReportType: 'BalanceSheet',
				ReportTitles: ['Title 1', 'Title 2'],
				ReportDate: '2024-11-01',
				UpdatedDateUTC: '2024-11-01T00:00:00Z',
				Fields: [],
				Rows: [],
			},
		],
	}

	beforeEach(() => {
		// Reset the mock and set up the environment variable for each test
		jest.clearAllMocks()
		process.env.MOCK_XERO_API_URL = mockApiUrl
	})

	it('should fetch the balance sheet data successfully', async () => {
		// Mock the successful response from axios
		mockedAxios.get.mockResolvedValue({
			data: mockBalanceSheetResponse,
		})

		const result = await fetchBalanceSheet()

		expect(mockedAxios.get).toHaveBeenCalledWith(
			`${mockApiUrl}/api.xro/2.0/Reports/BalanceSheet`
		)
		expect(result).toEqual(mockBalanceSheetResponse)
	})

	it('should throw an error when the request fails', async () => {
		const errorMessage = 'Network error'
		mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

		await expect(fetchBalanceSheet()).rejects.toThrow(
			`Balance sheet fetch failed: ${errorMessage}`
		)
	})

	it('should throw an error when the API URL is missing', async () => {
		// Temporarily unset the API URL environment variable
		delete process.env.MOCK_XERO_API_URL

		await expect(fetchBalanceSheet()).rejects.toThrow('Xero API not found')
	})
})
