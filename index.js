const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

// Import route
const authRoutes = require('./src/routes/auth.route'); 
const userRoutes = require('./src/routes/user.route'); 
const postRoutes = require('./src/routes/post.route');

dotenv.config();

// Connect DB
DBConnect().then(() => console.log('Connected to DB')).catch(err => console.log(err));
async function DBConnect(){
    await mongoose.connect(process.env.DATABASE_CONNECT, { 
        ssl: true,
        sslValidate: false,
        keepAlive: 1,
    });
}

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Listen to server
const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
    console.log('PORT start on ' + PORT);
});