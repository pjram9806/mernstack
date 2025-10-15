//creating elements dynamically
let headingElement = document.createElement('h2');
headingElement.textContent = 'Heading-2';
headingElement.classList='h2';
document.body.appendChild(headingElement);

//reading the data from tags 
/* let h3 = document.getElementById('#h3');
let innerdata = h3.inn */



let createHeading = (tag,text,className)=>
{
    let headingElement = document.createElement(tag);
    headingElement.textContent = text;
    headingElement.classList= className
    document.body.appendChild(headingElement)
}


createHeading('h1','Main Heading','heading');
createHeading('h2',' Heading-2','heading');
createHeading('h3',' Heading-3','heading');