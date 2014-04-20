var prent = require('../lib/index.js');

prent.info("Start");
prent.info("2 + 2 is %s", 2 + 2);
longCalculation(function(result) {
    prent.info("longCalculation returned callback");
    prent.info(result);
});

function longCalculation(callback) {
    prent.info("longCalculation started");
    setTimeout(function() {
        prent.info("longCalculation done");
        callback(4);
    }, 2000);
}