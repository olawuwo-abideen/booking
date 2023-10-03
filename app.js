require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const routes = require('./routes/index')
const base_url = process.env.BASE_URL
app.use(express.json({limit:'50mb'}));

// Database Connection
const connectDB = require('./database/connect');



//Middlewares
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: base_url,
  sameSites: true,
  secure: true
}));


// routes
app.get('/', (req, res) => {
  res.send('<h1> Booking Api </h1>');
});
app.use('/api/', routes)








const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
