import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { env } from './config/env.js';
import { errorMiddleware } from './core/middlewares/error.middleware.js';
import { authRouter } from './modules/auth/auth.route.js';

const app = express();
const PORT = env.PORT;

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Express v5 Backend is running!', status: 'ok' });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${String(PORT)}`);
});
