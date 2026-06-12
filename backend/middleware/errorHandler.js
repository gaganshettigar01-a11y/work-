/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.response?.status === 404) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource or city was not found',
      timestamp: new Date().toISOString()
    });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      error: 'Service Unavailable',
      message: 'Weather service is temporarily unavailable',
      timestamp: new Date().toISOString()
    });
  }

  res.status(status).json({
    error: err.name || 'Error',
    message: message,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
