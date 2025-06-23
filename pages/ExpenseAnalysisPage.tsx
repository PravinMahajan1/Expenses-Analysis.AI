
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { MOCK_TRANSACTIONS, CHART_COLORS, ArrowLeftIcon } from '../constants';
import { Transaction, TransactionType, CategoryExpense, MonthlyExpense, DailyDataPoint } from '../types';

// Helper function to process transactions for category expenses
export const processCategoryExpenses = (transactions: Transaction[]): CategoryExpense[] => {
  const expenses = transactions
    .filter(tx => tx.type === TransactionType.DEBIT)
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(expenses)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// Helper function to process transactions for monthly expenses/income
export const processMonthlyData = (transactions: Transaction[]): MonthlyExpense[] => {
  const monthlyDataMap: Record<string, { expense: number; income: number }> = {};
  
  transactions.forEach(tx => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!monthlyDataMap[month]) {
      monthlyDataMap[month] = { expense: 0, income: 0 };
    }
    if (tx.type === TransactionType.DEBIT) {
      monthlyDataMap[month].expense += tx.amount;
    } else {
      monthlyDataMap[month].income += tx.amount;
    }
  });

  return Object.entries(monthlyDataMap)
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
    }); 
};

// Helper function to process daily expense trend
export const processDailyExpenseTrend = (transactions: Transaction[]): DailyDataPoint[] => {
    const dailyExpensesMap: Record<string, number> = {};
    transactions
        .filter(tx => tx.type === TransactionType.DEBIT)
        .forEach(tx => {
            const dateStr = new Date(tx.date).toISOString().split('T')[0]; // YYYY-MM-DD
            dailyExpensesMap[dateStr] = (dailyExpensesMap[dateStr] || 0) + tx.amount;
        });
    
    return Object.entries(dailyExpensesMap)
        .map(([date, amount]) => ({ date, amount }))
        .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const processDebitCreditDistribution = (transactions: Transaction[]): CategoryExpense[] => {
    let totalDebit = 0;
    let totalCredit = 0;
    transactions.forEach(tx => {
        if (tx.type === TransactionType.DEBIT) totalDebit += tx.amount;
        else totalCredit += tx.amount;
    });
    return [
        { name: 'Total Debits', value: totalDebit },
        { name: 'Total Credits', value: totalCredit },
    ];
};

export const calculateKPIs = (transactions: Transaction[]) => {
    const debits = transactions.filter(tx => tx.type === TransactionType.DEBIT);
    const totalExp = debits.reduce((sum, tx) => sum + tx.amount, 0);
    const avgDebit = debits.length > 0 ? totalExp / debits.length : 0;
    
    const catExp = processCategoryExpenses(transactions);
    const largestCatName = catExp.length > 0 ? catExp[0].name : 'N/A';
    const largestCatValue = catExp.length > 0 ? catExp[0].value : 0;

    return {
        totalExpenses: totalExp,
        averageDebitTransaction: avgDebit,
        largestCategoryName: largestCatName,
        largestCategoryValue: largestCatValue,
    };
};


const KPICard: React.FC<{ title: string; value: string; color?: string }> = ({ title, value, color = 'text-brand-purple' }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);


const ExpenseAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState<CategoryExpense[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyExpense[]>([]);
  const [dailyTrendData, setDailyTrendData] = useState<DailyDataPoint[]>([]);
  const [debitCreditData, setDebitCreditData] = useState<CategoryExpense[]>([]);
  
  const kpis = useMemo(() => calculateKPIs(MOCK_TRANSACTIONS), []);


  useEffect(() => {
    setCategoryData(processCategoryExpenses(MOCK_TRANSACTIONS));
    setMonthlyData(processMonthlyData(MOCK_TRANSACTIONS));
    setDailyTrendData(processDailyExpenseTrend(MOCK_TRANSACTIONS));
    setDebitCreditData(processDebitCreditDistribution(MOCK_TRANSACTIONS));
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <header className="flex items-center mb-6">
        <button type="button" onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full hover:bg-gray-200">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Expenses Analysis</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard title="Total Expenses" value={`₹${kpis.totalExpenses.toLocaleString()}`} color="text-red-600" />
        <KPICard title="Avg. Debit Transaction" value={`₹${kpis.averageDebitTransaction.toLocaleString(undefined, {maximumFractionDigits:0})}`} />
        <KPICard title="Largest Expense Category" value={`${kpis.largestCategoryName} (₹${kpis.largestCategoryValue.toLocaleString()})`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Pie Chart */}
        <div id="categoryPieChartContainer" className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Expenses by Category</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                  {categoryData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No expense data for categories.</p>}
        </div>

        {/* Monthly Bar Chart */}
        <div id="monthlyBarChartContainer" className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Overview (Income vs Expense)</h2>
          {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="expense" fill="#ef4444" name="Expenses" />
              <Bar dataKey="income" fill="#22c55e" name="Income" />
            </BarChart>
          </ResponsiveContainer>
          ) : <p className="text-gray-500">No monthly data available.</p>}
        </div>
        
        {/* Daily Expense Trend Line Chart */}
        <div id="dailyTrendLineChartContainer" className="bg-white p-4 rounded-lg shadow col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Daily Expense Trend</h2>
          {dailyTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString('en-GB', { day:'numeric', month:'short'})} />
                <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="amount" name="Daily Expenses" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No daily trend data available.</p>}
        </div>

        {/* Debit vs Credit Pie Chart */}
        <div id="debitCreditPieChartContainer" className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Debit vs. Credit (Total Amount)</h2>
          {debitCreditData.length > 0 && (debitCreditData[0].value > 0 || debitCreditData[1].value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={debitCreditData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                   <Cell key="cell-debit" fill="#ef4444" />
                   <Cell key="cell-credit" fill="#22c55e" />
                </Pie>
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-500">No debit/credit data available.</p>}
        </div>

      </div>
    </div>
  );
};

export default ExpenseAnalysisPage;