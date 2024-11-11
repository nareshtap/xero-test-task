import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import BalanceSheetTable from './BalanceSheetTable'
import { fetchBalanceSheet } from '../api/service'

const mockData = {
	Reports: [
		{
			ReportTitles: ['Balance Sheet', 'Company XYZ', 'As of Dec 31, 2023'],
			Rows: [
				{
					RowType: 'Row',
					Cells: [{ Value: 'Assets' }, { Value: 'Liabilities' }],
				},
				{
					RowType: 'Section',
					Title: 'Current Assets',
					Rows: [
						{ RowType: 'Row', Cells: [{ Value: 'Cash' }, { Value: '1000' }] },
						{
							RowType: 'Row',
							Cells: [{ Value: 'Inventory' }, { Value: '2000' }],
						},
					],
				},
			],
		},
	],
}

// Mock the fetchBalanceSheet function
jest.mock('../api/service', () => ({
	fetchBalanceSheet: jest.fn(),
}))

describe('BalanceSheetTable', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('displays loading state', () => {
		render(<BalanceSheetTable />)

		// Check if CircularProgress is displayed
		expect(screen.getByRole('progressbar')).toBeInTheDocument()
	})

	test('displays error message when fetch fails', async () => {
		;(fetchBalanceSheet as jest.Mock).mockRejectedValue(
			new Error('Failed to fetch')
		)

		render(<BalanceSheetTable />)

		await waitFor(() => {
			expect(
				screen.getByText(/failed to fetch balance sheet data/i)
			).toBeInTheDocument()
		})
	})

	test('displays no data message when reportData is empty', async () => {
		;(fetchBalanceSheet as jest.Mock).mockResolvedValue({ Reports: [] })

		render(<BalanceSheetTable />)

		await waitFor(() => {
			expect(screen.getByText(/no report data available/i)).toBeInTheDocument()
		})
	})

	test('renders report data when fetched successfully', async () => {
		;(fetchBalanceSheet as jest.Mock).mockResolvedValue(mockData)

		render(<BalanceSheetTable />)

		// Separate assertions outside of `waitFor` where possible
		await screen.findByText(/balance sheet/i)
		await screen.findByText(/company xyz/i)
		await screen.findByText(/as of dec 31, 2023/i)

		// Checking row data in separate waitFor statements
		await screen.findByText(/cash/i)
		await screen.findByText(/1000/i)
		await screen.findByText(/inventory/i)
		await screen.findByText(/2000/i)
	})
})
