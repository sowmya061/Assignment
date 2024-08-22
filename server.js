const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 2026;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/motorq';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
