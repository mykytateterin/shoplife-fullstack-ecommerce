import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { errorMiddleware } from './core/middlewares/error.middleware.js';
import { usersRouter } from './modules/users/users.route.js';

const app = express();
const PORT = String(process.env.PORT ?? 5000);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Express v5 Backend is running!', status: 'ok' });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
