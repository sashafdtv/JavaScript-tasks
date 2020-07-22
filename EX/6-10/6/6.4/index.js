var fs = require("fs");
var readline = require("readline");
var colors = require("colors");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.exists("./db/dbase.txt.txt", (exists) => {
    if (exists) {
        fs.readFile("./db/db.bin", (err, data) => {

            var dbBuf = data.toString(); //Преобразование из буфера в string
            var dbArr = dbBuf.split(" "); //Преобразование из string в arr
            var dbUni = [];
            var dbStr = "";
            var dbTemp = [];
            var db = [];

            //Преобразование из двоичного когда в юникод
            for (var i = 0; i < dbArr.length; i++) {
                dbUni[i] = parseInt(dbArr[i], 2);
            };

            //Преобразование из юникода в текст
            for (var i = 0; i < dbUni.length; i++) {
                dbStr += String.fromCharCode(dbUni[i]);
            };

            dbTemp = dbStr.split("\r\n");
            console.log(dbTemp);

            for (var i = 0; i < dbTemp.length; i++) {
                db.push(dbTemp[i].split(","));
            };

            for (var i = 0; i <= db.length - 2; i++) {
                var minValue = db[i][0];

                for (var j = i + 1; j <= db.length - 1; j++) {
                    if (db[j][0] < minValue) {
                        minValue = db[j][0];
                        var swap = db[i][0];
                        db[i][0] = minValue;
                        db[j][0] = swap;
                    }
                }
            }
            console.log("");
            console.log("Отсортированный список: ".green);
            for (var i = 0; i < db.length; i++) {
                console.log("");
                console.log("Имя: " + db[i][0].red);
                console.log("Год рождения: " + db[i][1].red);
                console.log("Заработная плата в рублях: " + db[i][2].red);
            }
        });
    }
});



// var x = 10000100100; // Код буквы из бинарного файла
// var xUni = parseInt(x, 2);
// var xString = String.fromCharCode(xUni);

// console.log(xString); // "Ф"