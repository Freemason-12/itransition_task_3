import { http } from 'node:http';

const server = http.createServer(function(request, response) {
  response.end('hello world');
});

server.listen(8000);
