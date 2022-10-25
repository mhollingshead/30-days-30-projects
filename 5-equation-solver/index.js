const express = require('express');
const cors = require('cors');
const app = express();

// Routes
const evaluateRoutes = require("./routes/evaluate");
const simplifyRoutes = require("./routes/simplify");
const parseRoutes = require("./routes/parse");

// Configuration
require('dotenv').config();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Use our routes
app.use('/evaluate', evaluateRoutes);
app.use('/simplify', simplifyRoutes);
app.use('/parse', parseRoutes);

// Listen on the given port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));