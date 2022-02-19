const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const Router = require('./router');

mongoose.connect('mongodb+srv://root:root@cluster0.0fwoe.mongodb.net/store', {
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err)
});

app.use(express.json());
app.use(cors());

app.use(Router);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});