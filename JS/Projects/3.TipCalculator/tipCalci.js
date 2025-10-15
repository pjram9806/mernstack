let billAmount = document.getElementById('billAmount');
let percentageTipAmount = document.getElementById('percentageTip');
let tipAmount = document.getElementById('tipAmount');
let totalAmount = document.getElementById('totalAmount');
let errorMsg = document.getElementById('errorMessage');

let calculateButton = (event)=>
{
    event.preventDefault();
    let billAmountValue = parseInt(billAmount.value);
    let percentageTipValue = parseInt(percentageTipAmount.value);

    if(billAmount.value === '' || percentageTipAmount.value === '')
    {
        errorMsg.textContent = 'Please Enter A Valid Input';
        tipAmount.value = '';
        totalAmount.value ='';
    }
    else{
        errorMsg.textContent = '';
        let totalBill = billAmountValue + percentageTipValue;
        let tipBill = totalBill - billAmountValue;
        tipAmount.value = tipBill;
        totalAmount.value = totalBill;
    }


}