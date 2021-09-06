const target = 15;
const array1 = [11,11,6,2,3,4,5];
const array2 = [5,6,4,7,8,9];

let mapArray1 = {}, result = [];

//Create hash of number to 15 -> index in array 1
array1.forEach((el, index) => {
    const current = mapArray1[target - el] ? mapArray1[target - el] : []
    mapArray1[target - el] = current.concat(index)
});

array2.forEach((el, index) => {
    const found = mapArray1[el]
    if (found) {
        result.push(`${found} + ${index}`)
    }
});