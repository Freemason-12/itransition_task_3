import http from 'node:http';

function findLCM(params) {
  if (!params.has('x') || !params.has('y')) return 'NaN';
  let x = 0n, y = 0n;
  try {
    x = BigInt(params.get('x'));
    y = BigInt(params.get('y'));
  } catch (e) {
    console.log(e);
    return 'NaN';
  }
  if (x <= 0n || y <= 0n) return 'NaN';

  let [b, s] = x > y ? [x, y] : [y, x];
  while (b % s !== 0n) {
    const rem = b % s;
    b = s; s = rem;
  }
  return x * y / s;
}

const server = http.createServer(function(request, response) {
  const tail = request.url.split('/').pop();

  if (tail.includes('maksatlego_gmail_com')) {
    const params = new URLSearchParams(request.url.slice(request.url.indexOf('?')))

    console.log(`x is '${params.get('x')}', y is '${params.get('y')}'`);

    const answer = findLCM(params);
    console.log(`answer is ${answer}`);
    response.end(answer.toString());
  }
  else {
    response.writeHead(404, 'Not found');
    response.end('please navigate to appropriate url (404 not found)\n');
  }
});

server.listen(8000);
