const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} -> ${status}: ${message}`);
  if (err.stack && process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  res.status(status).json({
    success: false,
    error: { message, ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }) },
  });
};

module.exports = errorHandler;
