import express from 'express'
import cors from 'cors'
import balanceSheetRouter from './routes/balanceSheet'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/balance-sheet', balanceSheetRouter)

app.use(
	(
		error: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
)

// Start the server and log the URL
const port = process.env.PORT || 5001
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

export default app
