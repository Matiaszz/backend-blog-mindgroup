import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errorHandler } from './middleware/errorHandler';
import cookie from 'cookie-parser';
import PublicRoutes from './routes/public';
import AuthenticatedRoutes from './routes/authenticated';
import AdminRoutes from './routes/admin';
import { ensureAuthenticated } from './middleware/authenticated';
import { ensureIsAdmin } from './middleware/admin';
import path from "path";


const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookie());

app.use('/api', PublicRoutes);
app.use('/api', ensureAuthenticated, AuthenticatedRoutes);
app.use('/api/admin', ensureIsAdmin, AdminRoutes);

app.use(
  "/files",
  express.static(path.resolve(process.cwd(), 'uploads'))
);

app.use(errorHandler);

app.listen(process.env.BACKEND_PORT ?? 3000, () => {
    console.log('Server running!');
});
