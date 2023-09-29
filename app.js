require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use(express.json());

// Database Connection
const connectDB = require('./database/connect');



//Middlewares
app.use(cookieParser());
app.use(cors());



// routes
app.get('/', (req, res) => {
  res.send('<h1>Booking API</h1>');
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
