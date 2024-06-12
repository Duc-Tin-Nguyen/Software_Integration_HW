const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const env = process.env.NODE_ENV || 'development';
let dbURI;

switch (env) {
  case 'development':
    dbURI = process.env.MONGODB_URI_DEV;
    break;
  case 'release':
    dbURI = process.env.MONGODB_URI_RELEASE;
    break;
  case 'production':
    dbURI = process.env.MONGODB_URI_PROD;
    break;
  default:
    throw new Error('Unknown environment');
}

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected to ${env} database`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(express.json());

// Allow requests from all origins
app.use(cors());

// Define routes
app.use('/api/items', require('./routes/itemRoutes'));

module.exports = app;
