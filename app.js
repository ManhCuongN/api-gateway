const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 9000;

// Define các dịch vụ bạn muốn chuyển hướng
const services = [
  { path: '/v1/api', target: 'https://product-service-production-0ee8.up.railway.app' },
  { path: '/api/v1', target: 'https://user-service-production-5aa3.up.railway.app' },
  { path: '/api/s3', target: 'https://system-service-production.up.railway.app' },

];

// Chuyển hướng yêu cầu đến các dịch vụ tương ứng
services.forEach(service => {
  app.use(service.path, createProxyMiddleware({ target: service.target, changeOrigin: true }));
});

// Cổng mà API Gateway lắng nghe
app.listen(port, () => {
  console.log(`API Gateway is running at http://localhost:${port}`);
});
