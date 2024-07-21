import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { prepareChartData } from "../utils/chartUtils"; // Import the data preparation function
import "../styles/charts.css";
ChartJS.register(Title, Tooltip, Legend, ArcElement);

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

interface ChartsProps {
  transactions: Transaction[];
}

const Charts: React.FC<ChartsProps> = ({ transactions }) => {
  const { income, expense, totalIncome, totalExpense } =
    prepareChartData(transactions);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.raw as number;
            return `${label}: ${value.toFixed(0)}`;
          },
        },
      },
    },
  };

  return (
    <div className="charts-container">
      <div className="chart">
        <Pie data={income} options={options} />
        <div className="total-summary total-income">
          Total Income: {totalIncome.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
        </div>
      </div>
      <div className="chart">
        <Pie data={expense} options={options} />
        <div className="total-summary total-expense">
          Total Expenses: {totalExpense.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
        </div>
      </div>
    </div>
  );
};

export default Charts;
