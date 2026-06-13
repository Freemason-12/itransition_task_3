import http from 'node:http';

const server = http.createServer(function(request, response) {
  const tail = request.url.split('/').pop();

  if (tail.includes('maksatlego_gmail_com')) {
    const params = new URLSearchParams(request.url.slice(request.url.indexOf('?')))
    console.log(`x is '${params.get('x')}', y is '${params.get('y')}'`);

    if (!params.has('x') || !params.has('y')) response.end('NaN');
    else if (
      params.get('x') === '0' || params.get('x').includes('-') || params.get('x').includes('.') ||
      params.get('y') === '0' || params.get('y').includes('-') || params.get('y').includes('.') ||
      isNaN(parseInt(params.get('x'))) || isNaN(parseInt(params.get('y')))
    ) response.end('NaN');
    else {
      const x = BigInt(parseInt(params.get('x'))), y = BigInt(parseInt(params.get('y')));
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
