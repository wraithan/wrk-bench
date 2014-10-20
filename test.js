var bench = require('./index')
var stringify = require('json-stringify-stream')

bench({
    threads: 10,
    connections: 100,
    duration: '2s',
    url: 'http://example.com'
  }).pipe(stringify()).pipe(process.stdout)