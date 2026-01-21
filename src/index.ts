import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    credentials: true,
}));

app.listen(process.env.BACKEND_PORT ?? 3000, () => {
    console.log('Server running!');
});
