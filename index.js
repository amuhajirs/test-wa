import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
config({ path: '.env' })

import authRoutes from './src/modules/auth/authRoutes.js';
import './src/config/cloudinary.js';
import connectDB from './src/config/mongoose.js';
import createClientWa from './src/config/wa.js';

const app = express();
const port = process.env.PORT || 3001

// Parser
app.use(express.json());
app.use(cookieParser());

// Log
app.use(morgan('tiny'));

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connect
connectDB()

// Create wa
createClientWa(app)

app.listen(port, () => {
    console.log(`Server running on [http://localhost:${port}]...`)
})
