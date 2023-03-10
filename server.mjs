'use strict';

import http from 'node:http';

const HOST = '127.0.0.1';
const PORT = 8080;
// const STATIC_PATH = path.join(process.cwd(), './pages');

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(PORT, HOST, () => {
  console.log(`Server start at: http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EACCES') {
    console.log(`No access to port: ${PORT}`);
  }
});
