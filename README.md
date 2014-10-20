# bench-wrk

I want to be able to pull down stats on a staging server at regular intervals.  This will take your sites to hit, hit them with `wrk` using your specified settings, then create a result object with the `wrk` stats, a timestamp, name of the site, and the exact url hit.

## usage

This doesn't work yet, this is just some ideal setup.

```javascript
var bench = require('bench-wrk')

var job = bench({
	name: 'my site'
	url: 'http://localhost:3000',
	threads: '2',
	duration: '10s',
	connections: 5
})

job.pipe(process.stdout)
```

## theoretical changes

* Possibly take an array of jobs
* Delay between jobs seems like a good idea but I don't have a use case yet.
* There are likely more settings in `wrk` that I'll want to expose.
