var testFunc = function (x, eps) {
    const maxIter = 500;
            
            var done = true;
            var ch = x;
            var y = ch;
            console.log("----------------------------");
            console.log("|      X      |      Y      |");
            console.log("----------------------------");
            

            for (var i = 0; ch > eps; i++) {
                ch *= 1 * Math.pow(x, i) / Math.pow(2, i) / Math.pow(3, i + 1);
                
                if (!(i % 2)) y -= ch; // Если счетчик i делится на 2 без остатка (каждая четная итерация)
                else y += ch; //в любом другом случае (каждая нечетная итерация)

                console.log("|      " + x + "      " + "|      " + y + "      |")

                if (i > maxIter) {
                    console.log("Ряд расходится!");
                    return done = false;
                }
                
            }
            if (done) console.log("Значение функции: " + y + " для x = " + x);
            // console.log("|      " + x + "      " + "|      " + y + "      |");
        };

        testFunc(10, 2);