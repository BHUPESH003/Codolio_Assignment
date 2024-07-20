interface Transaction {
  id: string; // Unique identifier
  date: string;
  amount: string;
  category: string;
  title: string;
  notes: string;
  type: "Income" | "Expense";
}
export const prepareChartData = (transactions: Transaction[]) => {
  const incomeData = transactions.filter(t => t.type === "Income");
  const expenseData = transactions.filter(t => t.type === "Expense");

  const aggregateData = (data: Transaction[]) => {
    return data.reduce((acc, curr) => {
      if (acc[curr.category]) {
        acc[curr.category] += parseFloat(curr.amount);
      } else {
        acc[curr.category] = parseFloat(curr.amount);
      }
      return acc;
    }, {} as Record<string, number>);
  };

  const incomeAggregate = aggregateData(incomeData);
  const expenseAggregate = aggregateData(expenseData);

  const totalIncome = incomeData.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpense = expenseData.reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return {
    income: {
      labels: Object.keys(incomeAggregate),
      datasets: [
        {
          label: 'Income by Category',
          data: Object.values(incomeAggregate),
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    expense: {
      labels: Object.keys(expenseAggregate),
      datasets: [
        {
          label: 'Expense by Category',
          data: Object.values(expenseAggregate),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    totalIncome,
    totalExpense
  };
};
