/* let users = [
    { name: 'anil', isActive: true },
    { name: 'sunil', isActive: false },
    { name: 'kiran', isActive: true }
];
 */




/* //console.log(user);

//bracket notation
console.log(user["name"]);
console.log(user["email"]);
console.log(user["isActive"]);
console.log(user["address"]);
console.log(user["address"]["city"]);
console.log(user["address"]["location"]);
 
console.log('---------------------------------------------------------------------');

//dot notation
console.log(user.name);
console.log(user.email);
console.log(user.isActive);
console.log(user.address);
console.log(user.address.city);
console.log(user.address.location); */


//iterate an array of users & log only active users
/* for(i=0; i<users.length; i++)
    {
    if(users[i].isActive)
    {
        console.log(users[i]);
        
    }
} */
/* 
for (let user of users){
    if(user.isActive){
        console.log(user);
        
    }
} */
/* 
users.forEach(emp=>{
    if(emp.isActive)
    {
    console.log(emp)
    }
}) */


/* let user = {
    name:'anil',email:'anil@fakemail.com',isActive:true
}

let keys = Object.keys(user);
console.log(keys);


keys.forEach(key=>{
    console.log(key,user[key]);
    
})  */


let student = 
{
    name:'raju',marks:{maths:90,science:75}
}

let keys = Object.keys(student);
console.log(keys);


let values = Object.values(student);
console.log(values);

let entries = Object.entries(student);
console.log(entries);



/* 
keys.forEach(key=>{
    typeof student[key] === 'object' ? console.log(`Nested Keys ${key}:`,key,student[key]): console.log(key,student[key]);
    
});
 */
