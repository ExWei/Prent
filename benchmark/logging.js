var Benchmark = require('benchmark').Benchmark;
const Console = require('console').Console;
const EE = require('events').EventEmitter;
const winston = require('winston');
const intel = require('intel');
const prent = require('../lib/index.js');

var stdout = new EE();
stdout.write = function (out, encoding, cb) {
    if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }
    cb && cb();
    return true;
};

intel.addHandler(new intel.handlers.Stream({ stream: stdout, formatter: new intel.Formatter('[%(date)s] %(name)s:: %(message)s') }));

winston.add(winston.transports.File, { stream: stdout });
winston.remove(winston.transports.Console);

process.stdout.write = function (msg, enc, callback) {
    if (typeof enc === 'function' && !callback) callback = enc;

    callback && callback();
    return true;
};

var suite = new Benchmark.Suite('logging.info()');

suite
    .add('winston.info', function () {
        winston.info('asdf');
    })
    .add('intel.info', function () {
        intel.info('asdf');
    })
    .add('prent.info', function () {
        prent.info('asdf');
    });

suite
// add listeners
    .on('cycle', function (event) {
        console.warn(String(event.target));
    })
    .on('complete', function () {
        console.warn('Fastest is ' + this.filter('fastest').pluck('name'));
    })
// run async
    .run({ 'async': true });