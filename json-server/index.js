const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const https = require('https');
const http = require('http');

// Попытка загрузить SSL сертификаты (опционально)
let httpsOptions = null;
const keyPath = path.resolve(__dirname, 'key.pem');
const certPath = path.resolve(__dirname, 'cert.pem');

try {
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
        httpsOptions = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
        };
        console.log('SSL certificates found. HTTPS server will be available.');
    } else {
        console.log('SSL certificates not found. HTTPS server will be skipped. Only HTTP server will run.');
    }
} catch (error) {
    console.log('Error loading SSL certificates. HTTPS server will be skipped:', error.message);
}

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Public endpoints that don't require authorization
const publicEndpoints = ['/articles', '/article-ratings'];

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    // Allow public GET requests for certain endpoints
    const isPublicEndpoint = publicEndpoints.some(
        (endpoint) => req.path.startsWith(endpoint) && req.method === 'GET'
    );

    if (isPublicEndpoint) {
        return next();
    }

    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

// запуск сервера
const PORT = 8443;
const HTTP_PORT = 8000;

// Запуск HTTP сервера (всегда доступен)
const httpServer = http.createServer(server);
httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP server is running on port ${HTTP_PORT}`);
});

httpServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${HTTP_PORT} is already in use. Please stop the process using this port or use a different port.`);
    } else {
        console.error('Error starting HTTP server:', error.message);
    }
    process.exit(1);
});

// Запуск HTTPS сервера (только если доступны сертификаты)
if (httpsOptions) {
    try {
        const httpsServer = https.createServer(httpsOptions, server);
        httpsServer.listen(PORT, () => {
            console.log(`HTTPS server is running on port ${PORT}`);
        });
        
        httpsServer.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use. Please stop the process using this port or use a different port.`);
            } else {
                console.error('Error starting HTTPS server:', error.message);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error('Error starting HTTPS server:', error.message);
    }
}