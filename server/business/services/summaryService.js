// server/business/services/summaryService.js
import {
  retrieveIncomeTransactions,
  retrieveExpenseTransactions,
} from "./transactionService.js";

const getSummary = async (userId) => {
  try {
    const [incomeData, expenseData] = await Promise.all([
      retrieveIncomeTransactions(userId),
      retrieveExpenseTransactions(userId),
    ]);

    let savingsTotal = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    incomeData.map((income) => {
      incomeTotal += parseFloat(income.amount);
    });
    expenseData.map((expense) => {
      expenseTotal += parseFloat(expense.amount);
    });
    savingsTotal = incomeTotal - expenseTotal;

    return {
      income: incomeTotal,
      expenses: expenseTotal,
      savings: savingsTotal,
    };
  } catch (err) {
    throw new Error(`Failed to get transactions summary: ${err.message}`);
  }
};

export { getSummary };
