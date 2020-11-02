import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  value: number,
  title: string,
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, title, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance()

    if (type == "outcome" && balance.total < value) {
      throw new Error("voce não tem saldo");
    }

    return this.transactionsRepository.create(new Transaction({ value, title, type }))

  }
}

export default CreateTransactionService;
