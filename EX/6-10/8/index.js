var fs = require("fs");
var colors = require("colors");
var prompts = require("prompts");

var db = [];



fs.exists("./db/dbase.txt.txt", (exists) => {
    if (exists) {
        fs.readFile("./db/dbase.txt.txt", (err, data) => {
            //Чтение файла и форматирование массива
            var dbTemp = data.toString();
            var dbTemp2 = dbTemp.split("\r\n");
            for (var i = 0; i < dbTemp2.length; i++) {
                db.push(dbTemp2[i].split(","));
            };

            (async () => {

                console.log("");
                console.log("1".green + ". Ввести год рождения и показать всех работников, родившихся после.");
                console.log("2".green + ". Ввести оклад и показать всех работников, чей оклад больше");
                console.log("3".green + ". Выход из программы.");
                console.log("");
                const menu = await prompts({
                    type: 'number',
                    name: 'value',
                    message: 'Выберите пункт меню.',
                });

                if (menu.value == 1) {
                    const eyersInput = await prompts({
                        type: 'number',
                        name: 'value',
                        message: 'Введите год рождения',
                    });

                    var eyers = eyersInput.value;

                    console.log("");
                    console.log("Работники, родившееся после " + eyers + " года:");

                    for (var i = 0; i < db.length; i++) {
                        if (db[i][1] > eyers) {
                            console.log("");
                            console.log("Имя работника: " + db[i][0].red);
                            console.log("Год рождения: " + db[i][1].red);
                            console.log("Оклад: " + db[i][2].red);
                            console.log("");

                        }
                    }

                } else if (menu.value == 2) {
                    const salaryInput = await prompts({
                        type: 'number',
                        name: 'value',
                        message: 'Введите оклад',
                    });

                    var salary = salaryInput.value;

                    console.log("");
                    console.log("Работники, у которых оклад больше " + salary + " рублей:");
                    for (var i = 0; i < db.length; i++) {
                        if (db[i][2] > salary) {
                            console.log("");
                            console.log("Имя работника: " + db[i][0].red);
                            console.log("Год рождения: " + db[i][1].red);
                            console.log("Оклад: " + db[i][2].red);
                            console.log("");

                        }
                    }
                } else if (menu.value == 3) {
                    process.exit(-1);
                };

            })();

        });
    }
});

var stack = [];        // []
stack.push( "first" ); // stack === ["first"]
stack.push( 10, 20 );  // stack === ["first", 10, 20]
var el = stack.pop();  // stack === ["first", 10] && el === 20
stack.push( 2 );       // stack === ["first", 10, 2]
el = stack.pop();      // stack === ["first", 10] && el === 2
el = stack.pop();      // stack === ["first"] el = 10
el = stack.pop();      // stack === [] && el === "first"
el = stack.pop();      // stack === [] && typeof el === "undefined"