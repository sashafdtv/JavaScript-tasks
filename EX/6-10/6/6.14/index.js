var fs = require("fs");
var colors = require("colors");
var prompts = require("prompts");

var db = [ //База данных
    ['Федотов А. М.', 89998204850, [12, 7, 1997]],
    ['Попов Н. С.', 89553442222, [28, 10, 1998]],
    ['Чекашкин В. И.', 89996554433, [31, 1, 1998]],
    ['Яблочкин С. П.', 89991234567, [1, 2, 2000]],
    ['Агибалов П. С.', 89999876543, [12, 8, 1990]]
];

var sortDb = function() { //Функция сортировки по первым трем числам в номере

    for (var i = 0; i <= db.length - 2; i++) {
        var minValue = (db[i][1] + "").slice(0, 4);
        minValue = +minValue;

        for (var j = i + 1; j <= db.length - 1; j++) { 
        var actualValue = (db[j][1] + "").slice(0, 4);
        actualValue = +actualValue;
          if (actualValue < minValue) {
            minValue = db[j];
            var swap = db[i];
            db[i] = minValue;
            db[j] = swap;
          }
        }
      }
};

var startProram = function () { //Основная функция программы

    sortDb(db); // Вызов функции сортировки

    (async () => {

        //Главное меню программы
        console.log("");
        console.log("1".green + ". Ввод нового сотрудника в БД");
        console.log("2".green + ". Поиск сотрудника по фамилии");
        console.log("3".green + ". Вывести на экран БД");
        console.log("4".green + ". Выход из программы.");
        console.log("");
        const menu = await prompts({
            type: 'number',
            name: 'value',
            message: 'Выберите пункт меню.',
        });

        if (menu.value == 1) { //Выполняется, если пользователь введет 1

            const newUserName = await prompts({
                type: 'text',
                name: 'value',
                message: 'Введите имя нового сотрудника (Фамилия и инициалы, пример ->' + " Федотов А. М.".red + ")",
            });

            var newUser = db.length;
            db.push([]);
            db[newUser].push(newUserName.value);

            const newUserPhone = await prompts({
                type: 'text',
                name: 'value',
                message: 'Телефон нового сотрудника',
            });
            db[newUser].push(+newUserPhone.value);

            const newUserDate = await prompts({
                type: 'text',
                name: 'value',
                message: 'Дата рождения (DD.MM.YYYY, пример -> ' + '01.01.2019'.red + ')',
            });
            db[newUser].push(newUserDate.value);
            db[newUser][2] = db[newUser][2].split(".");

            for (var i = 0; i < db[newUser][2].length; i++) {
                db[newUser][2][i] = +db[newUser][2][i];
            }

            startProram(db); //Рекурсивный вызов программы 

        } else if (menu.value == 2) { //Выполняется, если пользователь введет 2

            const searchUsers = await prompts({
                type: 'text',
                name: 'value',
                message: 'Введите фамилию и инициалы для поиска',
            });

            var nameUserForSearch = searchUsers.value;

            var successfulSearch = false;

            for (var i = 0; i < db.length; i++) {

                
                if (db[i][0] == nameUserForSearch) {
                    successfulSearch = true;
                    console.log("");
                    console.log("Сотрудник найден: ".red);
                    console.log("");
                    console.log("Имя работника: " + db[i][0].red);
                    console.log("Номер телефона: " + db[i][1]);

                    //т.к. по заданию дата хранится в массиве из чисел, для корректного вывода требуется сделать несколько проверок

                    if ((db[i][2][0] + "").length === 1) { //если первое число в массиве с датой однозначное

                        if ((db[i][2][1] + "").length === 1) { // если второе число в массиве с датой однозначное
                            console.log("Дата рождения: " + "0" + db[i][2][0] + ".0" + db[i][2][1] + "." + db[i][2][2]);

                        } else if ((db[i][2][1] + "").length === 2) { // если второе число в массиве с датой двузначное
                            console.log("Дата рождения: " + "0" + db[i][2][0] + "." + db[i][2][1] + "." + db[i][2][2]);
                        }
                    } else if ((db[i][2][0] + "").length === 2) { //если первое число в массиве с датой двузначное

                        if ((db[i][2][1] + "").length === 1) { // если второе число в массиве с датой однозначное
                            console.log("Дата рождения: " + db[i][2][0] + ".0" + db[i][2][1] + "." + db[i][2][2]);

                        } else if ((db[i][2][1] + "").length === 2) { // если второе число в массиве с датой двузначное
                            console.log("Дата рождения: " + db[i][2][0] + "." + db[i][2][1] + "." + db[i][2][2]);
                        }
                    } 

                    console.log("");

                }
            }

            if (successfulSearch === false) console.log("Сотрудник не найден.".red);

            startProram(db); //Рекурсивный вызов программы 

        } else if (menu.value == 3) { //Выполнится, если пользователь введет 3
            console.log(db);
            startProram(db); //Рекурсивный вызов программы
        } else if (menu.value == 4) { //Выполняется, если пользователь введет 4
            process.exit(-1);
        };

    })();
};


startProram(db);