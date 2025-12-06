let numbers = [10,70,30,80,100];

let total = numbers.reduce((sum,n)=>{
    return sum + n;
},0)

console.log(total);
