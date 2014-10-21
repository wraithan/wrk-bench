var bench = require('./index')
var stringify = require('json-stringify-stream')

bench({
  threads: 2,
  connections: 5,
  duration: '10s',
  url: 'http://example.com'
}).pipe(stringify()).pipe(process.stdout)
