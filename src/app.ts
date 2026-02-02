import express from 'express';
import battleRoutes from './routes/battleRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/', battleRoutes);

app.use(errorHandler);

export default app;