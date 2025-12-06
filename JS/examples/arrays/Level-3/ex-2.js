/*Find first number divisible by 5 */

let numbers = [10,20,30,40,50];

let findDivisible = numbers.find((n)=>{
    return n /5;
});

console.log(findDivisible);
