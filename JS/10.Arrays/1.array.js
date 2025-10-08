let list = [1,2,3,4,5,6,7,8,9,10];
console.log(list);

/* for(let i=0;i<list.length;i++)
    {
    if(list[i] % 2 === 0){
        console.log(`Even No:${list[i]}`);

    }else{
        console.log(`Odd No:${list[i]}`);
        
    }

} */


/* 
for (let numbers of list)
    {
       numbers%2 === 0 ? console.log(`even no:${numbers}`): console.log(`odd no:${numbers}`);
        
    } */

list.forEach(nos=>{
    nos%2 === 0 ? console.log(`even no:${nos}`): console.log(`odd no:${nos}`);
})

/* //length of array
let length = list.length;
console.log(length);



/* 


console.log(list[0]);
console.log(list[1]);
console.log(list[2]);
console.log(list[3]); 
console.log(list[4]); 
console.log(list[4][0]); 
console.log(list[4][1]); 
//console.log(list.at(-1));



//push add element tot the end
list.push('false');
console.log(list);

//pop remove element from last
list.pop();
console.log(list);

//unshift add the elements in starting
list.unshift(65);
console.log(list);
 
//shift remove the elements from last
list.shift();
console.log(list);
 */



console.log(`-----------------------------------------------------------------------------------------`)