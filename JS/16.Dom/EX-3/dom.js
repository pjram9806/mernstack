let h3Element = document.createElement('h3');
h3Element.textContent = 'Web Technologies';
let containerElement = document.getElementById('myContainer');
containerElement.appendChild(h3Element);

let btnElement = document.createElement('button');
btnElement.textContent = 'Change Heading'
containerElement.appendChild(btnElement)


btnElement.onclick = function()
{
    h3Element.textContent = '4.0 Technologies';
    h3Element.classList.add('heading');
}

let removeStylesBtn = document.createElement('button');
removeStylesBtn.textContent = 'Remove Styles';

removeStylesBtn.onclick = function()
{
    h3Element.classList.remove('heading');

}

document.getElementById('myContainer').appendChild(removeStylesBtn);