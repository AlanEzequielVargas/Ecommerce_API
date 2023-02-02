const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.route');

const app = express();

app.use(express.json()); 
app.use(cors());
app.use(morgan('tiny'));

app.get('/' , (req,res) => {
     res.json({message: 'welcome to my server'});
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1',productRoutes );

module.exports = app; //se exporta para usar en server.js



















