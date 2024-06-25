const express = require('express');
const connectDB = require('./config/config');

const app = express();

// Connect to the database
connectDB();

app.use(express.json());

// Define routes
app.use('/api/items', require('./routes/itemRoutes'));

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => consolknlle.log(`Server running on port ${PORT}`));

