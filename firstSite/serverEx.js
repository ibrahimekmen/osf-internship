const http = require('http');
const router = require("./router.js");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  router.home(req,res);
  router.user(req,res);
});


server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

