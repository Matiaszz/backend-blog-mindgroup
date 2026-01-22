import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errorHandler } from './middleware/errorHandler';
import cookie from 'cookie-parser';
import PublicRoutes from './routes/public';
import AuthenticatedRoutes from './routes/authenticated';
import AdminRoutes from './routes/admin';
import { ensureAuthenticated } from './middleware/authenticated';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
}));
app.use(cookie());

app.use('/api', PublicRoutes);
app.use('/api', ensureAuthenticated, AuthenticatedRoutes);
app.use('/api/admin', AdminRoutes);

app.use(errorHandler);

app.listen(process.env.BACKEND_PORT ?? 3000, () => {
    console.log('Server running!');
});
