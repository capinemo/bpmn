import { Server } from 'http';
import express from 'express';
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: true,
    methods: 'GET,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent'],
    optionsSuccessStatus: 200
  })
);

app.get('/api/:url', (req, res) => {
  if (Math.random() > 0.5) res.sendStatus(200);
  else res.sendStatus(400);
});

const server = new Server(app);
server.listen(9000);

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
