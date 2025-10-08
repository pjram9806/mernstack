/* template String */

/* let name = `vikram` */

/* document.write(`My Name Is ${name}`); */

/* let n1 = 10,n2 = 20; */
/* normal function  */

/* function add(x,y)
{
    return x+y;
}

console.log(`addition:`, add(x=n1,y=n2)); */

/* function expression */

/* let subract = function(x,y)
{
    return y-x;
}

;
console.log(`subraction:`, subract(x=n1,y=n2)); */

/* arrow function */
/* 
let multiply = (x,y)=>
{
    return x*y
}

console.log(`multiplication:`,multiply(x=n1,y=n2));
 */

/* for of & for in */

//for of loop is used on arrays

let values = [5,4,3,2,1];
let students = ['vijay','ajay','kishore'];

/* values.forEach((number)=>
    {
        console.log(` ${number}`);
    }); */


/* 
for (let numbers of students)
    {
        console.log(numbers)
    } */


//for in loop is used in objects

let cities = 
{
    one:'hyd',
    two:'delhi',
    three:'bangalore'
}

for (let i in cities)
    {
        console.log(cities[i]);
    }