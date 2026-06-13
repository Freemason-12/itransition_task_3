import http from 'node:http';

const server = http.createServer(function(request, response) {
  const tail = request.url.split('/').pop();
  if (tail.includes('maksatlego_gmail_com')) {
    const queryParams = tail.split('?').pop().split('&').map((p) => BigInt(Number(p.split('=').pop())))
    const x = queryParams[0], y = queryParams[1];
    if (x <= 0n || y <= 0n || x % 1n !== 0n || y % 1n !== 0n) response.end('NaN');
    else {
      let lcm = x;
      while (lcm % y !== 0n) lcm += x;
      response.end(lcm.toString());
    }
  }
  else {
    response.writeHead(404, 'Not found');
    response.end('please navigate to appropriate url (404 not found)\n');
  }
});

server.listen(8000);
