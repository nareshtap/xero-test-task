import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { mockData } from "./mockData";

const BalanceSheetTable: React.FC = () => {
  const report = mockData.Reports[0];

  const renderRows = (rows: any[]) => {
    return rows.map((row, index) => {
      if (row.RowType === "Section" && row.Title) {
        return (
          <React.Fragment key={index}>
            <TableRow>
              <TableCell
                colSpan={3}
                style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}
              >
                {row.Title}
              </TableCell>
            </TableRow>
            {row.Rows && renderRows(row.Rows)}
          </React.Fragment>
        );
      } else if (row.RowType === "Row" || row.RowType === "SummaryRow") {
        return (
          <TableRow key={index}>
            {row.Cells.map((cell: any, cellIndex: number) => (
              <TableCell key={cellIndex}>{cell.Value}</TableCell>
            ))}
          </TableRow>
        );
      }
      return null;
    });
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="center" gutterBottom>
        {report.ReportTitles[0]} - {report.ReportTitles[1]}
      </Typography>
      <Typography variant="subtitle2" align="center" gutterBottom>
        {report.ReportTitles[2]}
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            {report.Rows[0]?.Cells &&
              report.Rows[0].Cells.map((cell: any, index: number) => (
                <TableCell key={index} style={{ fontWeight: "bold" }}>
                  {cell.Value}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(report.Rows.slice(1))}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default BalanceSheetTable;
