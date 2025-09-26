import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import petitionRoutes from './routes/petition.routes.js';
import departmentRoutes from './routes/department.routes.js';
import staffRoutes from './routes/staff.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        callback(null, true);
    },
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/petitions', petitionRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/staff', staffRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Also accessible on your local network at http://<your-local-ip>:${PORT}`);
});
