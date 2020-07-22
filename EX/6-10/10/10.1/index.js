var fs = require("fs");
var colors = require("colors");
var prompts = require("prompts");

var db = [];

var middleSalary = 0;
var countSalary = 0;

class User { //Объявление класса User
    constructor(name, year, salary) { //Конструктор
        this.name = name;
        this.year = year;
        this.salary = salary;
    }

    info() { //Метод вывода информации и сотруднике
        console.log("")
        console.log("Имя: " + this.name.red.bold);
        console.log("Год рождения: " + this.year.red.bold);
        console.log("Заработная плата в рублях: " + this.salary.red.bold);
        console.log("");
    }
};

function programStart() {

    (async () => {

        fs.exists("./db/dbase.txt.txt", (exists) => {

            if (exists) {
                fs.readFile("./db/dbase.txt.txt", (err, data) => {

                    for (var i = 0; i < data.toString().split("\r\n").length; i++) { //Создание объектов класса User
                        db[i] = new User(
                            data.toString().split("\r\n")[i].split(",")[0],
                            data.toString().split("\r\n")[i].split(",")[1],
                            data.toString().split("\r\n")[i].split(",")[2]
                        );
                    };
                });
            }
        });

        const usersSearch = await prompts({ //Ввод данных для поиска
            type: 'text',
            name: 'value',
            message: 'Введите фамилию и инициалы сотрудника',
        });

        for (var i = 0; i < db.length; i++) { //Поиск
            if (usersSearch.value === db[i].name) {
                db[i].info(); //Вывод информации

                countSalary++;
                middleSalary += db[i].salary / countSalary; 
                console.log(("Средний оклад запрошенных пользователей: " + middleSalary).yellow.bold);
                console.log("");

                programStart(); //Рекурсивный вызов программы
            }
        };
    })();
};

programStart();