let bgColorElement = document.getElementById('selectedColorHexCode');
let divElement = document.getElementById('colorPickerContainer');


let bgToGrey = ()=>
{
    bgColorElement.textContent = '#e0e0e0';
    divElement.style.backgroundColor = '#e0e0e0';
}

let bgToGreen = ()=>
{
     bgColorElement.textContent = '#6fcf97';
    divElement.style.backgroundColor = '#6fcf97';
}
let bgToBlue = ()=>
{
     bgColorElement.textContent = '#56ccf2';
    divElement.style.backgroundColor = '#56ccf2';
}
let bgToPurple = ()=>
{
     bgColorElement.textContent = '#bb6bd9';
    divElement.style.backgroundColor = '#bb6bd9';
}