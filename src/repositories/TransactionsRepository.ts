import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const { income, outcome, } = this.transactions.reduce((previous, current) => {
      if (current.type == "income") {
        previous.income += current.value
      } else {
        previous.outcome += current.value
      }
      return previous
    }, {
      income: 0,
      outcome: 0,

    });
    const balance = { income, outcome, total: income - outcome }
    return balance
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
