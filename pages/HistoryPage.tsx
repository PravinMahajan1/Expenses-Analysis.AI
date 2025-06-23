
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TRANSACTIONS, QuestionIcon, SearchIcon, FilterIcon, TrendingUpIcon, TrendingDownIcon, CheckCircleIcon, XCircleIcon, ClockIcon, CHART_COLORS } from '../constants';
import { Transaction, TransactionStatus, TransactionType, CategoryExpense, MonthlyExpense, DailyDataPoint } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { 
    processCategoryExpenses, 
    processMonthlyData, 
    processDailyExpenseTrend, 
    processDebitCreditDistribution,
    calculateKPIs
} from './ExpenseAnalysisPage';


const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { type, description, amount, date, status, payeePayer, iconUrl } = transaction;
  const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  
  let statusIcon, statusColor;
  switch (status) {
    case TransactionStatus.SUCCESS:
      statusIcon = <CheckCircleIcon className="w-4 h-4 text-status-success" />;
      statusColor = 'text-status-success';
      break;
    case TransactionStatus.FAILED:
      statusIcon = <XCircleIcon className="w-4 h-4 text-status-fail" />;
      statusColor = 'text-status-fail';
      break;
    case TransactionStatus.PENDING:
      statusIcon = <ClockIcon className="w-4 h-4 text-status-pending" />;
      statusColor = 'text-status-pending';
      break;
  }

  const amountColor = type === TransactionType.CREDIT ? 'text-status-success' : 'text-gray-800';
  const amountPrefix = type === TransactionType.CREDIT ? '+' : '-';

  return (
    <div className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50">
      <div className="mr-3">
        {iconUrl ? (
          <img src={iconUrl} alt={payeePayer || description} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === TransactionType.CREDIT ? 'bg-green-100' : 'bg-red-100'}`}>
            {type === TransactionType.CREDIT ? <TrendingDownIcon className="w-5 h-5 text-status-success" /> : <TrendingUpIcon className="w-5 h-5 text-status-fail" />}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-gray-800">{description}</p>
        {transaction.payeePayer && <p className="text-sm text-gray-500">{(transaction.type === TransactionType.DEBIT && transaction.description.startsWith("Paid to ")) || (transaction.type === TransactionType.CREDIT && transaction.description.startsWith("Received from ")) ? "" : (transaction.type === TransactionType.DEBIT ? 'Paid to ' : 'Received from ')}{transaction.payeePayer}</p>}
        <p className="text-xs text-gray-400">{formattedDate}</p>
      </div>
      <div className="text-right">
        <p className={`font-bold text-lg ${amountColor}`}>{amountPrefix}₹{amount.toLocaleString()}</p>
        <div className="flex items-center justify-end mt-1">
          {statusIcon}
          <span className={`ml-1 text-xs font-medium ${statusColor}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
      </div>
    </div>
  );
};

interface PdfChartData {
    categoryData: CategoryExpense[];
    monthlyData: MonthlyExpense[];
    dailyTrendData: DailyDataPoint[];
    debitCreditData: CategoryExpense[];
}

const HiddenChartRenderer: React.FC<{ chartData: PdfChartData, ready: boolean }> = ({ chartData, ready }) => {
    if (!ready) return null;

    const chartContainerStyle = { width: '550px', height: '350px', backgroundColor: 'white', padding: '16px', marginBottom: '20px' }; // Increased width slightly for better capture
    const chartTitleStyle = { fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '16px', textAlign: 'center' as const };

    return (
        <div id="pdfChartSourceContainer" style={{ position: 'absolute', left: '-9999px', top: '-9999px', zIndex: -1, opacity: 0 }}>
            <div id="pdfCategoryPieChart" style={chartContainerStyle}>
                <h2 style={chartTitleStyle}>Expenses by Category</h2>
                {chartData.categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={chartData.categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                                {chartData.categoryData.map((_entry, index) => (
                                    <Cell key={`cell-cat-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : <p>No expense data for categories.</p>}
            </div>

            <div id="pdfMonthlyBarChart" style={chartContainerStyle}>
                <h2 style={chartTitleStyle}>Monthly Overview (Income vs Expense)</h2>
                {chartData.monthlyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData.monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="expense" fill="#ef4444" name="Expenses" />
                            <Bar dataKey="income" fill="#22c55e" name="Income" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : <p>No monthly data available.</p>}
            </div>

            <div id="pdfDailyTrendLineChart" style={{...chartContainerStyle, width: '600px'}}>
                <h2 style={chartTitleStyle}>Daily Expense Trend</h2>
                {chartData.dailyTrendData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={chartData.dailyTrendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString('en-GB', { day:'numeric', month:'short'})} />
                            <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                            <Legend />
                            <Line type="monotone" dataKey="amount" name="Daily Expenses" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }}/>
                        </LineChart>
                    </ResponsiveContainer>
                ) : <p>No daily trend data available.</p>}
            </div>
            
            <div id="pdfDebitCreditPieChart" style={chartContainerStyle}>
                <h2 style={chartTitleStyle}>Debit vs. Credit (Total Amount)</h2>
                {chartData.debitCreditData.length > 0 && (chartData.debitCreditData[0].value > 0 || chartData.debitCreditData[1].value > 0) ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={chartData.debitCreditData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                               <Cell key="cell-debit" fill="#ef4444" />
                               <Cell key="cell-credit" fill="#22c55e" />
                            </Pie>
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : <p>No debit/credit data available.</p>}
            </div>
        </div>
    );
};


const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfChartRenderData, setPdfChartRenderData] = useState<PdfChartData | null>(null);

  const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tx.payeePayer && tx.payeePayer.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const generatePdfStatement = async () => {
    setIsGeneratingPdf(true);

    const categoryD = processCategoryExpenses(MOCK_TRANSACTIONS);
    const monthlyD = processMonthlyData(MOCK_TRANSACTIONS);
    const dailyTrendD = processDailyExpenseTrend(MOCK_TRANSACTIONS);
    const debitCreditD = processDebitCreditDistribution(MOCK_TRANSACTIONS);
    setPdfChartRenderData({ categoryData: categoryD, monthlyData: monthlyD, dailyTrendData: dailyTrendD, debitCreditData: debitCreditD });
    
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const doc = new jsPDF('p', 'pt', 'a4');
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 40;
    const contentWidth = pageWidth - 2 * margin;
    let currentPage = 1;
    let y = margin; 

    const brandColor = '#673AB7'; 
    const grayColor = '#F0F0F0';   
    const textColor = '#333333';   
    const lightTextColor = '#555555'; 
    const greenColor = '#4CAF50'; 
    const debitColor = textColor; 

    const dateColX = margin + 5; 
    const dateColWidth = 80;    
    const amountColWidth = 75;  
    const typeColWidth = 60;    

    const detailsColX = margin + dateColWidth; 
    const detailsColWidth = contentWidth - dateColWidth - typeColWidth - amountColWidth;
    const typeColX = margin + dateColWidth + detailsColWidth; 
    const amountColX = pageWidth - margin - 5; 

    const addText = (text: string, x: number, currentY: number, size = 10, fontStyle = 'normal', color = textColor, options?: any) => {
        doc.setFontSize(size);
        doc.setFont(undefined, fontStyle); 
        doc.setTextColor(color);
        doc.text(text, x, currentY, options);
        return currentY; 
    };
    
    const drawPageHeaderAndFooter = (totalPages = 0) => {
        if (currentPage === 1) {
            doc.setFillColor(brandColor);
            doc.circle(margin + 15, margin + 5, 12, 'F'); 
            addText('EA', margin + 9, margin + 10, 10, 'bold', '#FFFFFF'); 
            
            addText('Transaction Statement for 7972191796', margin + 35, margin + 5, 12, 'bold');
            const transactionsSortedByDate = [...MOCK_TRANSACTIONS].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            if (transactionsSortedByDate.length > 0) {
                const firstDate = new Date(transactionsSortedByDate[0].date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                const lastDate = new Date(transactionsSortedByDate[transactionsSortedByDate.length-1].date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                addText(`${firstDate} - ${lastDate}`, margin + 35, margin + 20, 9, 'normal', lightTextColor);
            }
            y = margin + 40; 
        }

        const footerText = totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : `Page ${currentPage}`;
        const footerHeight = 30; 
        
        doc.setFillColor('#FFFFFF'); 
        const pageNumStrWidth = doc.getStringUnitWidth(footerText) * 8; 
        doc.rect(pageWidth - margin - pageNumStrWidth - 5, pageHeight - margin + 5, pageNumStrWidth + 5, 15, 'F'); 
        addText(footerText, pageWidth - margin, pageHeight - margin + 15, 8, 'normal', lightTextColor, { align: 'right' });
        addText('This is a system generated statement. For any queries, contact us at https://support.expenseanalyzer.com/statement', margin, pageHeight - margin + 15, 7, 'normal', lightTextColor);
    };

    const drawTableHeader = (currentY: number) => {
        doc.setFillColor(grayColor);
        doc.rect(margin, currentY, contentWidth, 20, 'F'); 
        currentY += 14; 
        addText('Date', dateColX, currentY, 9, 'bold', textColor);
        addText('Transaction Details', detailsColX, currentY, 9, 'bold', textColor);
        addText('Type', typeColX, currentY, 9, 'bold', textColor);
        addText('Amount', amountColX, currentY, 9, 'bold', textColor, { align: 'right' });
        return currentY + 10; 
    };
    
    const addNewPage = (totalPages = 0) => {
        doc.addPage();
        currentPage++;
        y = margin; 
        drawPageHeaderAndFooter(totalPages); 
        y = drawTableHeader(y); 
    };

    drawPageHeaderAndFooter();
    y = drawTableHeader(y);

    const allTransactionsSorted = [...MOCK_TRANSACTIONS].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    allTransactionsSorted.forEach(tx => {
        const dateObj = new Date(tx.date);
        const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

        const typeStr = tx.type === TransactionType.CREDIT ? 'CREDIT' : 'DEBIT';
        const amountStr = `₹${tx.amount.toLocaleString()}`;
        const typeColor = tx.type === TransactionType.CREDIT ? greenColor : debitColor;

        const detailsLines = [
            tx.description, 
            tx.transactionId ? `Transaction ID ${tx.transactionId}` : null,
            tx.utr ? `UTR No. ${tx.utr}` : null,
            tx.accountIdentifier ? (tx.type === TransactionType.DEBIT ? `Paid by ${tx.accountIdentifier}`: `Credited to ${tx.accountIdentifier}`) : null,
        ].filter(line => line !== null) as string[]; 

        const lineHeight = 10; 
        const detailBlockHeight = detailsLines.reduce((height, line, index) => {
            const currentLineHeight = index === 0 ? lineHeight + 2 : lineHeight -1; 
            return height + currentLineHeight;
        }, 0);
        const transactionHeight = Math.max(2 * lineHeight + 6, detailBlockHeight) + 15; 

        if (y + transactionHeight > pageHeight - margin - 30) { 
             addNewPage(); 
        }
        
        const startY = y;
        addText(formattedDate, dateColX, y + 2, 8, 'normal', lightTextColor);
        addText(formattedTime, dateColX, y + 12, 8, 'normal', lightTextColor); 
        
        let currentDetailY = y;
        detailsLines.forEach((line, index) => {
             const size = index === 0 ? 9 : 7; 
             const style = index === 0 ? 'bold' : 'normal';
             const color = index === 0 ? textColor : lightTextColor;
             addText(line, detailsColX, currentDetailY + 2, size, style, color, { maxWidth: detailsColWidth - 10 }); 
             currentDetailY += (index === 0 ? lineHeight + 2 : lineHeight - 1); 
        });

        addText(typeStr, typeColX, startY + 2, 9, 'normal', typeColor); 
        addText(amountStr, amountColX, startY + 2, 9, 'bold', typeColor, {align: 'right'}); 

        y = startY + transactionHeight - 10; 
        doc.setDrawColor(220); 
        doc.line(margin, y, pageWidth - margin, y); 
        y += 10; 
    });
    
    drawPageHeaderAndFooter(); 

    if (pdfChartRenderData) { 
        doc.addPage();
        currentPage++;
        y = margin;
        drawPageHeaderAndFooter(); 

        addText('Expense Analysis', pageWidth / 2, y, 16, 'bold', textColor, { align: 'center'});
        y += 15;
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y); 
        y += 20;

        const kpis = calculateKPIs(MOCK_TRANSACTIONS);
        addText('Key Performance Indicators:', margin, y, 12, 'bold');
        y += 18;
        addText(`Total Expenses: ₹${kpis.totalExpenses.toLocaleString()}`, margin + 10, y, 10);
        y += 15;
        addText(`Avg. Debit Transaction: ₹${kpis.averageDebitTransaction.toLocaleString(undefined, {maximumFractionDigits:0})}`, margin + 10, y, 10);
        y += 15;
        addText(`Largest Expense Category: ${kpis.largestCategoryName} (₹${kpis.largestCategoryValue.toLocaleString()})`, margin + 10, y, 10);
        y += 25; 

        const addChartToPdf = async (chartElementId: string, title: string) => {
            const chartElement = document.getElementById(chartElementId);
            if (!chartElement) {
                console.warn(`Chart element ${chartElementId} not found for PDF.`);
                return;
            }
            await new Promise(r => setTimeout(r, 100)); 
            const canvas = await html2canvas(chartElement, { scale: 1.5, backgroundColor: '#ffffff', logging: false, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            
            const chartAspect = canvas.width / canvas.height;
            let pdfChartWidth = contentWidth; // Make charts full width by default
            let pdfChartHeight = pdfChartWidth / chartAspect;

            const chartTitleHeight = 20;
            const totalChartBlockHeight = pdfChartHeight + chartTitleHeight + 10; 

            if (y + totalChartBlockHeight > pageHeight - margin - 30) { 
                addNewPage(); 
            }
            
            addText(title, margin, y, 11, 'bold');
            y += chartTitleHeight;
            doc.addImage(imgData, 'PNG', margin, y, pdfChartWidth, pdfChartHeight);
            y += pdfChartHeight + 15; 
        };
        
        const chartConfigs = [
            { id: 'pdfCategoryPieChart', title: 'Expenses by Category' },
            { id: 'pdfDebitCreditPieChart', title: 'Debit vs. Credit (Total Amount)' },
            { id: 'pdfMonthlyBarChart', title: 'Monthly Overview (Income vs Expense)' },
            { id: 'pdfDailyTrendLineChart', title: 'Daily Expense Trend' },
        ];

        for (const chartConfig of chartConfigs) {
            await addChartToPdf(chartConfig.id, chartConfig.title);
            drawPageHeaderAndFooter(); 
        }
    }
    
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        drawPageHeaderAndFooter(totalPages); 
    }

    doc.save('Expense_Statement.pdf');
    setIsGeneratingPdf(false);
    setPdfChartRenderData(null); 
  };


  return (
    <div className="bg-white min-h-full flex flex-col">
      {pdfChartRenderData && <HiddenChartRenderer chartData={pdfChartRenderData} ready={isGeneratingPdf} />}
      <header className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-bold text-gray-800">History</h1>
          <div className="flex items-center space-x-3">
            <button 
              type="button"
              onClick={generatePdfStatement}
              disabled={isGeneratingPdf}
              className="text-xs font-medium text-brand-purple bg-purple-100 px-3 py-1.5 rounded-full hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPdf ? 'Generating PDF...' : 'My Statements'}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/history/analysis')}
              className="text-xs font-medium text-white bg-brand-purple px-3 py-1.5 rounded-full hover:bg-brand-purple-dark"
            >
              Expenses Analysis
            </button>
            <button type="button" className="text-gray-600">
              <QuestionIcon className="w-7 h-7" />
            </button>
          </div>
        </div>
        <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions"
            className="w-full pl-10 pr-12 py-2.5 bg-gray-100 text-gray-700 rounded-lg border border-transparent focus:ring-1 focus:ring-brand-purple focus:border-transparent outline-none text-sm"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <FilterIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>
        </div>
      </header>
      
      <div className="flex-grow overflow-y-auto pb-16"> 
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(tx => <TransactionItem key={tx.id} transaction={tx} />)
        ) : (
          <p className="text-center text-gray-500 p-8">No transactions found.</p>
        )}
      </div>
    </div>
  );
};
export default HistoryPage;