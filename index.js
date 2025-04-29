// Import required packages
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Import routes
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');
const apiDocs = require('./apiDocs.json');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Global middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

// Swagger documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '......Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




