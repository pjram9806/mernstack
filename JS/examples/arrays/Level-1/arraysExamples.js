let numbers = [10,20,30];
console.log(numbers);

//get the 3rd item or 1st or 2nd item
console.log(numbers[0]);
console.log(numbers[1]);
console.log(numbers[2]);


//add a new item in existing array  using push method add a new item in the last of array

numbers.push(40);
console.log(numbers);


//remove a item from array in the last using pop method

numbers.pop();
console.log(numbers);

//add a no in the start 
numbers.unshift(60);
console.log('unshift '  ,numbers);




//remove a no from the start
numbers.shift();
console.log(numbers);