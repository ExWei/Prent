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
prent.info("2 + 2 is ", 2 + 2);
```
Will outputted as
> **[** Trace **]** **[** Sun, 19 Jan 2014 08:48:57 GMT **]**: Some trace message
> **[** Info **]** **[** Sun, 19 Jan 2014 08:48:57 GMT **]**: 2 + 2 is 4

*"Trace" and "Info" are colored.

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
> winston.info x **95,060** ops/sec ±0.44% (96 runs sampled)

> intel.info x **58,784** ops/sec ±1.34% (96 runs sampled)

> prent.info x **207,741** ops/sec ±2.98% (94 runs sampled)

> **Fastest is prent.info**