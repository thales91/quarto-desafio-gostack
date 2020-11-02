import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

 const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all()
    const balance = transactionsRepository.getBalance()
    response.status(200).json({transactions, balance})
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const {title,value, type} = request.body;
    const service = new CreateTransactionService(transactionsRepository)
    const result = service.execute({title,value,type})
    response.status(200).json(result)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
