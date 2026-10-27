require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// Routes
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route ' + req.method + ' ' + req.url + ' not found' } });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('TaskFlow server running at http://localhost:' + PORT);
  console.log('API: http://localhost:' + PORT + '/api/tasks');
  console.log('Health: http://localhost:' + PORT + '/api/health');
});

module.exports = app;
