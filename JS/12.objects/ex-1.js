let person = {
  name: "gopi",
  age: 25,
  city: "kakinada",
  1: "value1",
  "my choice": "value2",
  key: "lock",
  run: function () {
    console.log("start runnning...........");
  },
  hobbies: ["Playing Chess", "Singing"],
  car: { name: "bmw", model: "320d", color: "white" },
};

/* console.log(person);
console.log(person.name);
console.log(person.age);
console.log(person['1']);
console.log(person['city']);
console.log(person['my choice']);

//varaiable as key
let key = 'age';
console.log(person[key]);
console.log(person.key);
 */

//object destructuring
let { name } = person;
console.log(name);
console.log(person.age);

//modifying the object property

person.name = "Hari";
console.log(person.name);

person["name"] = "Viswas";
console.log(person.name);

//adding the property
person.gender = "Male";
console.log(person.gender);

person["state"] = "Andhra Pradesh";
console.log(person);

console.log(person.run());

console.log(person.hobbies);
console.log(person.hobbies[0]);
console.log(person["hobbies"][1]);


console.log(person.car);
console.log(person.car.name);
console.log(person.car['color']);