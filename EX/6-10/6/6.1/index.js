var fs = require("fs");
var readline = require("readline");
var colors = require("colors");

var db = "";

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.exists("./db/dbase.txt.txt", (exists) => {
    if (exists) {
        fs.readFile("./db/dbase.txt.txt", (err, data) => {
            var dbTemp = data.toString();

            var db = dbTemp.split(",");


            for (var i = 0; i < db.length; i++) {
                db[i] = db[i].replace(/\r?\n/g, "");
            }

            var sumSalary = 0
            var count = 0;
            var middleSalary = 0;
            var successfulSearch = false;
            var continuedInput = true;


            console.log("Введите имя сотрудника:");
            rl.on("line", (line) => {
                for (var i = 0; i < db.length; i++) {
                    if (line == db[i]) {
                        if (isNaN(+db[i])) {
                            successfulSearch = true;
                            console.log("=================================".red);
                            console.log("Имя и инициалы: " + db[i].green);
                            console.log("Год рождения: " + db[i + 1].green);
                            console.log("Оклад в рублях: " + db[i + 2].green);
                            count++;
                            sumSalary += +db[i + 2];
                            middleSalary = sumSalary / count;
                            console.log(("Средний оклад запрошенных сотрудников: " + middleSalary).yellow);
                            console.log("=================================".red);
                        }
                    }
                }
                if (successfulSearch === false) {
                    console.log("Пользователь не найден".red);
                }
                successfulSearch = false;
            });
        });
    } else {
        console.error("Файл dbase.txt не найден.");
    }
});