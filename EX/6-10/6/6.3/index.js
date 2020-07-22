var fs = require("fs");
var readline = require("readline");
var colors = require("colors");

var db = [];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.exists("./db/dbase.txt.txt", (exists) => {
    if (exists) {
        fs.readFile("./db/dbase.txt.txt", (err, data) => {

            var db = data.toString();
            var binaryDb = "";
            
            //Форматирование в бинарный код
            for (var i = 0; i < db.length; i++) {
                binaryDb += db[i].charCodeAt(0).toString(2) + " ";
            };

            //Запись в файл
            fs.writeFileSync("./db/db.bin", binaryDb);
        });
    }
});