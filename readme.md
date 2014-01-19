Prent
=====================
The light-weight and fastest node.js logging library.

----------


Usages
---------
First, you should install Prent through NPM.
```
npm install prent
```
Second, you should include Prent to your file.
```
var prent = require("prent");
```
Third, starting now, you can use Prent logging.
For example:
```
prent.trace("Some trace message");
```
Will outputted as
> **[** Trace **]** **[** Sun, 19 Jan 2014 08:48:57 GMT **]**: Some trace message*

*"Trace" are colored.

Configuration
---------
Prent can be configured through prent.init()
For example, below configuration will write to console and file (logfile.txt) with frequency value 3 (write when logs >= than 3):
```
prent.init({
    consoleOutput: true,
    fileOutput: {
        enable: true,
        type: "File",
        path: "logfile.txt",
        frequency: 3

}});
```
Or, below configuration will write to console and directory with frequency value 10 (write when logs >= than 10):
```
prent.init({
    consoleOutput: true,
    fileOutput: {
        enable: true,
        type: "Directory",
        path: "logsdir",
        frequency: 10

}});
```
## Benchmark results ##
> winston.info x **46,574** ops/sec ±2.08% (92 runs sampled)
intel.info x **17,959** ops/sec ±5.27% (72 runs sampled)
prent.info x **187,393** ops/sec ±0.29% (97 runs sampled)
**Fastest is prent.info**