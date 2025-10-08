/* let user = {name:'john',age:30};
console.log(user);

localStorage.setItem('user',JSON.stringify(user));

const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser);
console.log(storedUser.name);
console.log(storedUser.age); */



localStorage.setItem("color", "blue");

console.log(localStorage.getItem("color")); // "blue"

console.log(localStorage.length); // 1

console.log(localStorage.key(0)); // "color"

localStorage.removeItem("color");

localStorage.clear(); // clears everything
