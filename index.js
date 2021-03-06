const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors')
require('dotenv').config();

// Quote Route
const quoteRoute = require('./routes/quoteRoute.js');

const app = express();


// Middleware - helps modify the request
app.use(express.json());

//CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
	next();
});

// Routes for API
app.get('/',(req,res)=>{
    res.send('Welcome to the Quote API')
})

app.use('/quotes',quoteRoute)



// Connect to Our Database
const URL = process.env.DB_URL;
const PORT = process.env.PORT || 4040;
mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('Database Connection Established...');
    })
    .catch(()=>{
        console.log('Database Connection Failed !!')
    })

// Start the Server
app.listen(PORT,()=>{
    console.log('Server is listening on port 4040 ...')
})