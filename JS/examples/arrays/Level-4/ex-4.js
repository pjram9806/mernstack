/* change object using array map */
let users = [
  { name: "Ajay", age: 25 },
  { name: "Ravi", age: 30 },
  { name: "Suma", age: 22 }
];

let changeObject = users.map(user => user);

//adding a new key value
/* let changeObject = users.map(user =>{
    return {...user,status:'Active'}
}); */

console.log(changeObject);