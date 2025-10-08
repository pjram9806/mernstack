//for in loop works for objects & arrays but mostly suitable for objects

let user = {
    name:'santhosh',
    age:20,
    email:'santhosh@fakemail.com'
}

//
for(let singleUser in user){
    console.log(`${singleUser}:${user[singleUser]}`);
}

let names = ['surya','vikram','kishore'];

for(let users in names){
    console.log(`${users}:${names[users]}`);//it will return the index count
}