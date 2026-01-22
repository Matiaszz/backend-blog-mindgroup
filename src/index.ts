import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errorHandler } from './middleware/errorHandler';
import PublicRoutes from './routes/public';
import AuthenticatedRoutes from './routes/authenticated';
import AdminRoutes from './routes/admin';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
}));

app.use('/api', PublicRoutes);
app.use('/api', AuthenticatedRoutes);
app.use('/api/admin', AdminRoutes);

app.use(errorHandler);

app.listen(process.env.BACKEND_PORT ?? 3000, () => {
    console.log('Server running!');
});
