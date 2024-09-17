const express = require('express');
const residentRouter = require('./routes/residentRoute');
const authRouter = require('./routes/authRoute');
const adminRouter = require('./routes/adminRoute')
const staffRouter = require('./routes/staffRoute')
const paymentRouter = require('./routes/paymentRoute')
const requestRouter = require('./routes/requestRoute');
const fetchreqAssingRouter = require('./routes/fetchreqAssingRoute')
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies and authentication
}));
app.use(express.json());
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/admin', adminRouter);
//app.use('/api/customer', customerRoutes);
app.use('/api/v1/staff', staffRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1',requestRouter);
app.use('/api/v1',fetchreqAssingRouter);
module.exports = app;