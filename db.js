const mongoose = require('mongoose')
require('dotenv').config;

const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB sever');
})

db.on('error', (err) => {
    console.log('MongoDB connectio error:', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

module.exports = db;