const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // app.use(proxy('/auth/google', { target: 'http://localhost:8000' }));
    // app.use(proxy('/api/**', { target: 'http://localhost:8000' }));
    app.use(
        '/api/**',
        createProxyMiddleware({
            target: 'http://localhost:5000',
        })
    );
    app.use(
        '/user/**',
        createProxyMiddleware({
            target: 'http://localhost:5000',
        })
    );
};