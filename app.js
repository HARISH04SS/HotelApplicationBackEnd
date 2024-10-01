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
const allowedOrigins = [
  'http://localhost:5173',
  'https://main--peppy-dolphin-89bcee.netlify.app',
  'https://main--peppy-dolphin-89bcee.netlify.app/admin',
  'https://main--peppy-dolphin-89bcee.netlify.app/staff',
  'https://main--peppy-dolphin-89bcee.netlify.app/register'
];
 app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true, 
     methods:['GET','POST','PATCH','PUT','DELETE']
 }));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/admin', adminRouter);
//app.use('/api/customer', customerRoutes);
app.use('/api/v1/staff', staffRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1',requestRouter);
app.use('/api/v1',fetchreqAssingRouter);
module.exports = app;