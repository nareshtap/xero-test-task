interface Report {
	ReportID: string
	ReportName: string
	ReportType: string
	ReportTitles: string[]
	ReportDate: string
	UpdatedDateUTC: string
	Fields: Field[]
	Rows: Row[]
}

interface Field {
	name: string
	type: string
	value: string | number | null
}

export interface Row {
	RowType: string
	Cells: Cell[]
	Title?: string
	Rows?: Row[]
}

export interface Cell {
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
