const express = require('express');
require('./db/db');
const path = require('path');
const { isValidEmail, isValidPhone } = require('../validation');
const empCollection = require('./model/model');

const temp_path = path.join(__dirname, '../template/views');
const app = express();

app.set('view engine', 'hbs');
app.set('views', temp_path);

app.use(express.urlencoded({ extended: false }));

const PORT = 3003;

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/empdata', async (req, res) => {
    try {
        // Check if required fields are provided
        if (!req.body.name || !req.body.address || !req.body.email || !req.body.phone) {
            return res.status(400).json({ error: ["All fields are required"] });
        }

        // Validate email
        if (!isValidEmail(req.body.email)) {
            return res.status(400).json({ error: ["Enter valid email"] });
        }

        // Validate phone number
        if (!isValidPhone(req.body.phone)) {
            return res.status(400).json({ error: ["Enter valid phone number"] });
        }

        // Assuming empCollection is defined correctly in the model
        const empData = new empCollection({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone
        });

        await empData.validate();
        const postData = await empData.save();
        res.send(postData);

    } catch (error) {
        if (error.errors) {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ errors });
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

module.exports = app;