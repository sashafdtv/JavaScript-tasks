var arr = [5,6,8,3,1];

//Сортировка
for (var i = 0; i <= arr.length - 2; i++) {
    var minValue = arr[i];

    for (var j = i + 1; j <= arr.length - 1; j++) {
        if (Math.abs(arr[j]) < Math.abs(minValue)) {
            minValue = arr[j];
            var swap = arr[i];
            arr[i] = minValue;
            arr[j] = swap;
        }
    }
}

console.log (arr);