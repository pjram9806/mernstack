let counterElement = document.getElementById("counterValue");


let incrementCount = () => 
{
    let getCouterValue = counterElement.textContent;
    let incrementValue = parseInt(getCouterValue)+1 ;
    counterElement.textContent = incrementValue;

    if(incrementValue > 0)
    {
    counterElement.style.color = 'green';
    }
    else if(incrementValue < 0)
    {
    counterElement.style.color = 'red';
    }
    else
    {
    counterElement.style.color = 'black';
    }
    
  
    
};

let decrementCount = () => 
{
    let getCounterValue = counterElement.textContent;
    let decrementValue = parseInt(getCounterValue )-1;
    counterElement.textContent = decrementValue;
        if(decrementValue > 0)
    {
    counterElement.style.color = 'green';
    }
    else if(decrementValue < 0)
    {
    counterElement.style.color = 'red';
    }
    else
    {
    counterElement.style.color = 'black';
    }
};

let onReset = () => 
{
    let resetValue = 0;
    counterElement.textContent = resetValue;
    counterElement.style.color = 'black';

};
