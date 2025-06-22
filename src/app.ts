import express from 'express';
import cors from 'cors';
import { BookRoutes } from './library/book/book.route';
import { BorrowRoutes } from './library/borrow/borrow.route';
import globalErrorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Library 📕');
});



app.use('/api/books', BookRoutes);
app.use('/api/borrow', BorrowRoutes);








app.use(globalErrorHandler);

export default app;
