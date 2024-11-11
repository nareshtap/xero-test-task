import React, { useEffect, useRef, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Alert,
	CircularProgress,
} from '@mui/material'

import { fetchBalanceSheet } from '../api/service'
import { BalanceSheetResponse } from '../types/balance-sheet'

const BalanceSheetTable: React.FC = () => {
	const [reportData, setReportData] = useState<BalanceSheetResponse | null>(
		null
	)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const isFetched = useRef(false)

	useEffect(() => {
		if (isFetched.current) return
		const getReportData = async () => {
			try {
				const data = await fetchBalanceSheet()
				setReportData(data)
			} catch (err) {
				setError('Failed to fetch balance sheet data')
			} finally {
				setLoading(false)
			}
		}

		getReportData()

		isFetched.current = true
	}, [])

	const renderRows = (rows: any[]) => {
		return rows.map((row, index) => {
			if (row.RowType === 'Section' && row.Title) {
				return (
					<React.Fragment key={index}>
						<TableRow>
							<TableCell
								colSpan={3}
								style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}
							>
								{row.Title}
							</TableCell>
						</TableRow>
						{row.Rows && renderRows(row.Rows)}
					</React.Fragment>
				)
			} else if (row.RowType === 'Row' || row.RowType === 'SummaryRow') {
				return (
					<TableRow key={index}>
						{row.Cells.map((cell: any, cellIndex: number) => (
							<TableCell key={cellIndex}>{cell.Value}</TableCell>
						))}
					</TableRow>
				)
			}
			return null
		})
	}

	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<CircularProgress />
			</div>
		)
	}

	if (error) {
		return (
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<Alert severity='error'>{error}</Alert>
			</div>
		)
	}

	if (!reportData || !reportData.Reports.length) {
		return (
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<Typography variant='h6'>No report data available</Typography>
			</div>
		)
	}

	const report = reportData.Reports[0]

	return (
		<TableContainer component={Paper}>
			<Typography variant='h6' align='center' gutterBottom>
				{report.ReportTitles[0]} - {report.ReportTitles[1]}
			</Typography>
			<Typography variant='subtitle2' align='center' gutterBottom>
				{report.ReportTitles[2]}
			</Typography>

			<Table>
				<TableHead>
					<TableRow>
						{report.Rows[0]?.Cells &&
							report.Rows[0].Cells.map((cell: any, index: number) => (
								<TableCell key={index} style={{ fontWeight: 'bold' }}>
									{cell.Value}
								</TableCell>
							))}
					</TableRow>
				</TableHead>
				<TableBody>{renderRows(report.Rows.slice(1))}</TableBody>
			</Table>
		</TableContainer>
	)
}

export default BalanceSheetTable
