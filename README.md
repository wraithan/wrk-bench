# wrk-bench

`wrk-bench` is a library to make creating `wrk` jobs that recur immediately.
This is good for having tests that collect stats for a couple seconds, record
them, then does it again. This assumes you'll pipe the results into something
that makes sense.

## usage

Since this is just a light wrapper around `wrk` the node module, which is just a
light wrapper around `wrk` the command line tool. You'll just pass the options
that you'd normally pass to `wrk` to `wrk-bench` like so:

```javascript
var bench = require('wrk-bench')

var job = bench({
	url: 'http://localhost:3000',
	threads: 2,
    connections: 5,
	duration: '10s'
})

job.pipe(process.stdout)
```

Which might result in output that looks like the following:

```json
{
  "transferPerSec": "355.09KB",
  "requestsPerSec": 228.54,
  "requestsTotal": 2286,
  "durationActual": "10.00s",
  "transferTotal": "3.47MB",
  "latencyAvg": "17.62ms",
  "latencyStdev": "4.29ms",
  "latencyMax": "73.93ms",
  "latencyStdevPerc": 98.67,
  "rpsAvg": 115.89,
  "rpsStdev": 15.94,
  "rpsMax": 171,
  "rpsStdevPerc": 79.32,
  "options-threads": 2,
  "options-connections": 5,
  "options-duration": "10s",
  "options-url": "http://localhost:3000"
  "timestamp": 1413854725961
}
```

Notice how the options is merged into the object. This makes it so you don't
have to track each job yourself. Also if you add any other properties to the
option argument they will be merged in and if `wrk` doesn't know about them,
they wont be used. This is handy if you want to name jobs or add in any
interesting version data or something of that sort.

Also a timestamp of when the test finished is added to the object as well. I am
up for debate on this and could also see collecting start/end and reporting
them, or maybe not having a timestamp on at all and leaving that up to a user of
the API

## theoretical changes

* Possibly take an array of jobs
* Delay between jobs seems like a good idea but I don't have a use case yet.
* There are likely more settings in `wrk` that I'll want to expose.
* Standardize the output. So `KB`/`MB` values are always bytes. `ns`, `ms`, `s`,
  `m`, etc all changed to `ms`
