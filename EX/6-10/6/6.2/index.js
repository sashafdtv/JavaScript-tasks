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
            var dbTemp = data.toString();

            var dbTemp2 = dbTemp.split("\r\n"); //каждый ползователь помещен в массив

            for (var i = 0; i < dbTemp2.length; i++) {
                db.push(dbTemp2[i].split(","));
            };

            console.log(db);

            //Сортировка
            for (var i = 0; i <= db.length - 2; i++) {
                var minValue = db[i][1];

                for (var j = i + 1; j <= db.length - 1; j++) {
                    if (db[j][1] < minValue) {
                        minValue = db[j][1];
                        var swap = db[i];
                        db[i] = db[j];
                        db[j] = swap;
                    }
                }
            }

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