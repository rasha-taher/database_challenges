const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, this is your Node.js server!\n');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
