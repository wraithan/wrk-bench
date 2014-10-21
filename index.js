var wrk = require('wrk')
var through2 = require('through2')

module.exports = bench

function bench(options) {
  var stream = through2.obj()

  createJob(options, function (err, results) {
    if (err) throw err
    results = prefixMerge('options', results, options)
    results.timestamp = Date.now()
    stream.push(results)
  })

  return stream
}

function createJob(options, callback) {
  wrk(options, function (err, results) {
    callback(err, results)

    if (!err) {
      createJob(options, callback)
    }
  })
}

function prefixMerge(prefix, lhs, rhs) {
  for (var key in rhs) {
    if (rhs.hasOwnProperty(key)) {
      lhs[prefix + '-' + key] = rhs[key]
    }
  }
  return lhs
}