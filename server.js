require('dotenv').config();



const express = require('express');
const cors = require('cors');
const db = require('./models');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Booking CMS API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Database sync and server start
const startServer = async () => {
    try {
        // Test database connection
        await db.sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync models (use { force: true } only in development to reset DB)
      await db.sequelize.sync();


        console.log('Database synchronized.');

        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`API base URL: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;