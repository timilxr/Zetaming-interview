const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const staffRouter = require('./routes/teacher');
const studentRouter = require('./routes/student');

require('dotenv').config();

const uri = process.env.URI;
const port = process.env.PORT || 2000;
const app = express();

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', ()=>console.log('Database connected successfully')
);

app.use(cors());
app.use(express.json());

app.use('/staff', staffRouter);
app.use('/students', studentRouter);
// app.use('/orders', ordersRouter);
// app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Your server is up and running on port: ${port}`);
});