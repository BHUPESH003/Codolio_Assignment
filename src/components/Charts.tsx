import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { prepareChartData } from "../utils/chartUtils"; // Import the data preparation function
import "../styles/charts.css";
ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface Transaction {
  id: string;
  date: string;
  amount: string;
  category: string;
  title: string;
  notes: string;
  type: "Income" | "Expense";
}

interface ChartsProps {
  transactions: Transaction[];
}

const Charts: React.FC<ChartsProps> = ({ transactions }) => {
  const { income, expense, totalIncome, totalExpense } =
    prepareChartData(transactions);

  return (
    <div className="charts-container">
      <div className="chart">
        <Pie data={income} />
        <div className="total-summary total-income">
          Total Income: {totalIncome.toFixed(2)}
        </div>
      </div>
      <div className="chart">
        <Pie data={expense} />
        <div className="total-summary total-expense">
          Total Expenses: {totalExpense.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Charts;
