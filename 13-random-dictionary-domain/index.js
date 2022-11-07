const express = require('express');
const cors = require('cors');
const app = express();

// Routes
const routes = require("./routes");

// Configuration
require('dotenv').config();
const PORT = process.env.PORT || 8888;

// Middleware
app.use(cors());
app.use(express.json());

// Use our routes
app.use('/', routes);

// Listen on the given port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));