var prent = require('../lib/index.js');

var a, b, c;

prent.info("Start");
a = 1;
prent.trace("A is %s", a);
prent.info("2 + 2 is %s", 2 + 2);
prent.debug("Program is still run");
longCalculation(function(result) {
    prent.info("longCalculation returned callback");
    anotherFailLongFunction(result, function(result) {
        prent.info("anotherFailLongFunction returned callback");
        if (result == 1) { // Special bug
            prent.error("Result is equal 1, kernel panic :)")
        }
    });
});

function longCalculation(callback) {
    prent.info("longCalculation started");
    setTimeout(function() {
        prent.info("longCalculation done");
        callback(4);
    }, 1000);
}

function anotherFailLongFunction(someNumber, callback) {
    prent.info("anotherFailLongFunction started");
    setTimeout(function() {
        var result = someNumber / 4; // Special bug
        if (result == 1) {
            prent.warn("Seems, something went wrong, result is zero");
        }
        prent.info("2 seconds passed");
        callback(result);
    }, 2000);
}