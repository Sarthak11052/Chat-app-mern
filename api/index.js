const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const user = require('./models/Users');
dotenv.config();
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;
const app = express();
app.use(cors());
app.use(express.json());



app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;


    try {
        const createdUser = await user.create({ username, password });

        jwt.sign({ userId: createdUser._id }, jwtSecret, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json('ok');
        });


    } catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    }

});
app.listen(4040);

