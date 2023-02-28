const express = require('express');
const cors = require('cors');
const products = require('./products');
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');

require('dotenv').config();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);

app.get('/', (req, res) => {
  res.send('Wellcome to online shop API');
});
app.get('/products', async (req, res) => {
  res.send(products);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoose.set('strictQuery', false);
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB connection failed ${err.message}`));
