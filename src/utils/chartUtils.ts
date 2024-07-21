interface Transaction {
  id: number;
  dateTime: string;
  amount: number;
  type: "Income" | "Expense";
  category: string;
  title: string;
  currency: string;
  note: string;
}
export const prepareChartData = (transactions: Transaction[]) => {
  const incomeData = transactions.filter((t) => t.type === "Income");
  const expenseData = transactions.filter((t) => t.type === "Expense");

  const aggregateData = (data: Transaction[]) => {
    const result = data.reduce((acc, curr) => {
      const amount = Number(curr.amount);
      if (acc[curr.category]) {
        acc[curr.category] += amount;
      } else {
        acc[curr.category] = amount;
      }
      return acc;
    }, {} as Record<string, number>);
    return result;
  };

  const incomeAggregate = aggregateData(incomeData);
  const expenseAggregate = aggregateData(expenseData);

  const totalIncome = incomeData.reduce((sum, t) => sum + +t.amount, 0);
  const totalExpense = expenseData.reduce((sum, t) => sum + +t.amount, 0);
  console.log(totalIncome);

  return {
    income: {
      labels: Object.keys(incomeAggregate),
      datasets: [
        {
          label: "Income by Category",
          data: Object.values(incomeAggregate),
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
          ],
          borderWidth: 1,
        },
      ],
    },
    expense: {
      labels: Object.keys(expenseAggregate),
      datasets: [
        {
          label: "Expense by Category",
          data: Object.values(expenseAggregate),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
          borderWidth: 1,
        },
      ],
    },
    totalIncome,
    totalExpense,
  };
};
