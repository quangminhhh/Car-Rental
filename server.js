import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./Configs/dbConfig.js";
import carRoutes from './Routes/carsRoute.js';
import uploadRoutes from './Routes/uploadRoute.js';
import userRoutes from './Routes/userRoute.js';
import bookRoutes from './Routes/bookingsRoute.js';
import * as path from "node:path";


dotenv.config();

const app = express();
const port = process.env.PORT || 3031;
app.use(express.json());

connectDB();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use(cors({
    origin: 'https://car-rental-frontend-l520.onrender.com'
}));
// API car
app.use('/api', carRoutes);
app.use('/api', uploadRoutes);

// API user
app.use('/api/users', userRoutes);

// API booking
app.use('/api/bookings', bookRoutes);

if(process.env.NODE_ENV !== 'production'){
    app.use("/", express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
