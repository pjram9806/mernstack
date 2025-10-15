let myArray = [5,'six',2,8.2];
console.log(myArray);

//acccessing a item in array 

console.log(myArray[0]);
console.log(myArray[1]);
console.log(myArray[2]);
console.log(myArray[3]);

//modifying an array item
myArray[1] = 6;
console.log(myArray);

let length = myArray.length;
console.log(length);

//adding a item 
myArray.push('true');
myArray.push('never');
console.log(myArray);

//removing an item
let lastItem = myArray.pop();
console.log(myArray);
console.log(lastItem);