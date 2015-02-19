var wrk = require('wrk')
var through2 = require('through2')
var si = require('si-tools')

module.exports = bench

function bench(options, errorCallback) {
  var stream = through2.obj()

  createJob(options, function (err, results) {
    if (err) {
      return errorCallback(err)
    }

    for (var key in results) {
      if (results.hasOwnProperty(key)) {
        var value = results[key]
        if (typeof value === 'string') {
          results[key] = parseSi(value)
        }
      }
    }
    results = prefixMerge('options', results, options)
    results.timestamp = Date.now()
    stream.push(results)
  })

  return stream
}

function createJob(options, callback) {
  wrk(options, function (err, results) {
    callback(err, results)

    if (err) {
      // If an error occurs, hold off for 1s then try again.
      setTimeout(function () {
        createJob(options, callback)
      }, 1000)
    } else {
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

function parseSi(number) {
  var result = si.parse(number)
  if (result.unit === 's') {
    return result.number*1000
  }
  return si.number
}
