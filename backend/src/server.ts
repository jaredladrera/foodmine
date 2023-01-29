import express from 'express';
import cors from 'cors'
import foodRouter from './router/food.router';
import userRouter from './router/user.router';

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use('/api/user', userRouter);


const port = 5000;

app.listen(port, () => {
    console.log(`Website served on http://localhost:${port}`);
})