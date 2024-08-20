const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || process.env.DB_CONNECTION;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

module.exports = mongoose;
