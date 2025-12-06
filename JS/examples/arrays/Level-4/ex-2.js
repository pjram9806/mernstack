let names = ['ajay','santhosh'];

let upperNames = names.map(u=> u.toUpperCase());

let lowerNames = names.map(l=>l.toLocaleLowerCase());


let addTitle = names.map(title=> 'Mr.' + title);
console.log(addTitle)

console.log(upperNames,lowerNames);