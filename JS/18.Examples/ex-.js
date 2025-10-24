let inputElement = document.createElement('input');
inputElement.type="checkbox";
inputElement.id ="myCheckbox";
document.body.appendChild(inputElement);

let labelElement = document.createElement('label');
labelElement.setAttribute('for','myCheckbox');
labelElement.textContent = "Graduated";
document.body.appendChild(labelElement);
