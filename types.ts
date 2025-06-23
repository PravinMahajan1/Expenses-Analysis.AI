
export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export enum TransactionStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string; // ISO string format e.g. "2024-07-15T10:00:00Z"
  status: TransactionStatus;
  category: string; // e.g., 'Food', 'Shopping', 'Bills', 'Travel', 'Salary'
  payeePayer?: string; // e.g. "Aaudhut Enterprises", "XXXXXX4374"
  iconUrl?: string; // URL for payee/payer icon
  transactionId?: string; // e.g., T25061844157644654579
  utr?: string; // e.g., 516717424815
  accountIdentifier?: string; // e.g., XXXXXX0219 (for "Paid by" or "Credited to")
}

export interface CategoryExpense {
  name: string;
  value: number;
}

export interface MonthlyExpense {
  month: string;
  expense: number;
  income: number;
}

export interface DailyDataPoint {
  date: string;
  amount: number;
}
