
/* creating multiple todos */
let todoList = [
    {text:'Learn HTML'},
    {text:'Learn Bootstrap'},
    {text:'Learn CSS'},
    {text:'Learn JavaScript'},
]

let createAndAppendTodo = (todoList)=>
{
//creating list items 
let todoItemsContainer = document.getElementById('todoItemsContainer');
let todoElement = document.createElement('li');
todoElement.classList.add("todo-item-container","d-flex","flex-row");
todoItemsContainer.appendChild(todoElement);

//creating checkbox
let inputElement = document.createElement('input');
inputElement.type = 'checkbox';
inputElement.id ='checkboxInput';
inputElement.classList.add('checkbox-input');
todoElement.appendChild(inputElement);


//creating div element
let labelContainer = document.createElement('div');
labelContainer.classList.add("label-container","d-flex","flex-row");
todoElement.appendChild(labelContainer);

//creating label 
let labelElement = document.createElement('label');
labelElement.setAttribute('for','checkboxInput')
labelElement.textContent = todoList.text;
labelElement.classList.add('checkbox-label');
labelContainer.appendChild(labelElement);

//creating deleteItemContainer
let deleteIconContainer = document.createElement('div');
deleteIconContainer.classList.add("delete-icon-conatiner");
labelContainer.appendChild(deleteIconContainer);

//creating delet icon
let deleteIcon = document.createElement('i');
deleteIcon.classList.add('far',"fa-trash-alt","delete-icon");
deleteIconContainer.appendChild(deleteIcon);

}


for (let eachTodo of todoList){
    createAndAppendTodo(eachTodo)
}