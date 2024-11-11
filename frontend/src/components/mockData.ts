export const mockData = {
  Reports: [
    {
      ReportID: "BalanceSheet",
      ReportName: "Balance Sheet",
      ReportType: "BalanceSheet",
      ReportTitles: [
        "Balance Sheet",
        "Demo Company (AU)",
        "As at 28 February 2018",
      ],
      ReportDate: "23 February 2018",
      UpdatedDateUTC: "/Date(1519358515899)/",
      Rows: [
        {
          RowType: "Header",
          Cells: [
            { Value: "" },
            { Value: "28 Feb 2018" },
            { Value: "28 Feb 2017" },
          ],
        },
        {
          RowType: "Section",
          Title: "Assets",
        },
        {
          RowType: "Section",
          Title: "Bank",
          Rows: [
            {
              RowType: "Row",
              Cells: [
                { Value: "Business Bank Account" },
                { Value: "-2894.08" },
                { Value: "0.00" },
              ],
            },
            {
              RowType: "Row",
              Cells: [
                { Value: "Business Savings Account" },
                { Value: "6878.28" },
                { Value: "0.00" },
              ],
            },
            {
              RowType: "SummaryRow",
              Cells: [
                { Value: "Total Bank" },
                { Value: "3984.20" },
                { Value: "0.00" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
