//importing our packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api')

// Mongoose connection
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stateful_count', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected");
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes)


if (process.env.NODE_ENV === 'production'){
   app.use(express.static('client/build')) 
}


app.listen(PORT, console.log(`Server is starting at ${PORT}`))