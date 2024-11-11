interface Report {
	ReportID: string
	ReportName: string
	ReportType: string
	ReportTitles: string[]
	ReportDate: string
	UpdatedDateUTC: string
	Fields: Field[] // Placeholder for field structure, can be refined later
	Rows: Row[]
}

// Field structure with an extensible field type
interface Field {
	name: string // Name of the field
	type: string // Type of data (e.g., string, number)
	value: string | number | null // Field value
}

interface Row {
	RowType: string
	Cells: Cell[]
	Title?: string // Optional for Section rows
	Rows?: Row[] // Optional for Section rows
}

interface Cell {
	Value: string | number
	Attributes: Attribute[]
}

interface Attribute {
	Value: string
	Id: string
}

export interface BalanceSheetResponse {
	Status: string
	Reports: Report[]
}
