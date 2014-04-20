var prent = require('../lib/index.js');

prent.info("Start");
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