// // const express = require('express');
// // const residentRouter = require('./routes/residentRoute');
// // const authRouter = require('./routes/authRoute');
// // const adminRouter = require('./routes/adminRoute')
// // const staffRouter = require('./routes/staffRoute')
// // const paymentRouter = require('./routes/paymentRoute')
// // const requestRouter = require('./routes/requestRoute');
// // const fetchreqAssingRouter = require('./routes/fetchreqAssingRoute')
// // const app = express();
// // const cors = require('cors');
// // const allowedOrigins = [
// //   'http://localhost:5173',
// //   'https://main--peppy-dolphin-89bcee.netlify.app',
// //   'https://main--peppy-dolphin-89bcee.netlify.app/admin',
// //   'https://main--peppy-dolphin-89bcee.netlify.app/staff',
// // ];
// //  app.use(cors({
// //      origin: 'http://localhost:5173',
// //      credentials: true, 
// //      methods:['GET','POST','PATCH','PUT','DELETE']
// //  }));
// // app.use(cors({
// //   origin: function (origin, callback) {
// //     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   credentials: true,
// //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
// // }));
// // app.use(express.json());
// // app.get('/', (req, res) => {
// //     res.send('Welcome to the API!');
// //   });
// // app.use('/api/v1/auth',authRouter)
// // app.use('/api/v1/admin', adminRouter);
// // //app.use('/api/customer', customerRoutes);
// // app.use('/api/v1/staff', staffRouter);
// // app.use('/api/v1/payment', paymentRouter);
// // app.use('/api/v1',requestRouter);
// // app.use('/api/v1',fetchreqAssingRouter);
// // module.exports = app;
// const express = require('express');
// const residentRouter = require('./routes/residentRoute');
// const authRouter = require('./routes/authRoute');
// const adminRouter = require('./routes/adminRoute');
// const staffRouter = require('./routes/staffRoute');
// const paymentRouter = require('./routes/paymentRoute');
// const requestRouter = require('./routes/requestRoute');
// const fetchreqAssingRouter = require('./routes/fetchreqAssingRoute');
// const cors = require('cors');
// const app = express();

// // List of allowed origins
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://main--peppy-dolphin-89bcee.netlify.app',
//   'https://main--peppy-dolphin-89bcee.netlify.app/admin',
//   'https://main--peppy-dolphin-89bcee.netlify.app/staff',
// ];

// // Configure CORS middleware
// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl requests)
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,  // Allow cookies and other credentials
//   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
// }));

// app.use(express.json());  // Body parser

// // Default route
// app.get('/', (req, res) => {
//   res.send('Welcome to the API!');
// });

// // Route setup
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/admin', adminRouter);
// app.use('/api/v1/staff', staffRouter);
// app.use('/api/v1/payment', paymentRouter);
// app.use('/api/v1', requestRouter);
// app.use('/api/v1', fetchreqAssingRouter);

// module.exports = app;

const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://main--peppy-dolphin-89bcee.netlify.app',
  'https://main--peppy-dolphin-89bcee.netlify.app/admin',
  'https://main--peppy-dolphin-89bcee.netlify.app/staff',
  'https://peppy-dolphin-89bcee.netlify.app'  // Add actual deployed URL
];

// Configure CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow credentials such as cookies
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());  // Body parser

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Add your routes here
// Example routes
app.use('/api/v1/auth', require('./routes/authRoute'));
app.use('/api/v1/admin', require('./routes/adminRoute'));
app.use('/api/v1/staff', require('./routes/staffRoute'));
app.use('/api/v1/payment', require('./routes/paymentRoute'));
app.use('/api/v1', require('./routes/requestRoute'));
app.use('/api/v1', require('./routes/fetchreqAssingRoute'));

module.exports = app;
