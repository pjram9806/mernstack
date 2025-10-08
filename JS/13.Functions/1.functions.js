let values = [10,20];

/* //plian function
function add(){
let addNos = x+y;
console.log(`x+y :${addNos}`);
}

add();

//function expression
let subract = function(){
    let subractNo = y-x;
    console.log(`x-y:${subractNo}`);
}

subract();
 */

//arrow function = 

/* let multiply = ()=>
{
        let multiplyNo = x*y;
        console.log(`x*y:${multiplyNo}`);
}

multiply(); */

//arrow function passing with arguments
/* 
let division = (a,b)=>
{
    let divide = a/b;
    return divide
}

let result = division(a=x,b=y);
console.log(result);

 */
//arrow function passing with object as arguments
/* let multiply = ({a,b})=>
{
    let multiplyNos = a*b;
    return multiplyNos
}

let output = multiply({a:x,b:y});
console.log(output);
 */
//arrow function passing with object as arguments

/* let division = ([a,b])=>
{
    let divide = a/b;
    return divide;
}

let result = division([a=x,b=y]);
console.log(result); */

let division = ([a,b])=>
{
    return a/b;
}

let result = division(values);
console.log(result);