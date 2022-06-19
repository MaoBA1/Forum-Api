const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;
const disccusionRouter = require('./controllers/disccusion');
const cors = require('cors');

app.use(cors({
    origin:'*'
}))
console.log('te'+Math.round(Math.random()));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/dis', disccusionRouter);

const dbUrl = `mongodb+srv://forum:123@cluster0.he8iz.mongodb.net/forum?retryWrites=true&w=majority`;

mongoose.connect(dbUrl)
.then(result => {
    console.log(result);
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${port}`);
    })
})
.catch(error => {
    console.log(error);
})