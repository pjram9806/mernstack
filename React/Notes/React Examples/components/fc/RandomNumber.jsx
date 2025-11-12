import React, { use, useState,useEffect } from 'react';

const RandomNumber = ()=>
{
    const [randomNo,setRandomNo] = useState(()=>Math.ceil(Math.random()*100));
    const [userGuess,setUserGuess] = useState('');
    const [result,setResult] = useState('');
    const [color,setColor] = useState('#1e217c');

 /*    useEffect(()=>
    {
        let generateRandomNumber = Math.ceil(Math.random()*100);
        setRandomNo(generateRandomNumber);
        console.log(generateRandomNumber);
    },[]); */

    let checkNumber = ()=>
    {
        const guessedNumber = userGuess;

        if(isNaN(guessedNumber))
        {
            setResult('Please provide a Valid Input');
            setColor('red');
            return;
        }


        if(guessedNumber > randomNo){
            setResult('Too High Try Again!!');
            setColor('#1e217c');
        }
        else if(guessedNumber < randomNo){
            setResult('Too Low Try Again !!')
            setColor('#1e217c');
        }
        else{
            setResult('Congratulations You Got It Right !!');
            setColor('white')
        }
    }

return(
    <React.Fragment>
        <div className="container py-3">
            <div className="row">
                <div className="col-6">
                    <div className="card bg-secondary text-white">
                        <div className="card-header">
                            <h3>Radom Number Game</h3>
                        </div>
                        <div className="card-body">
                            <h3>Guess The Number</h3>
                            <input type="number"  placeholder='Enter Guessed Number' onChange={(e)=> setUserGuess(e.target.value)} value={userGuess}/>
                            <button className='btn btn-sm btn-danger' onClick={checkNumber}>Check</button>
                        </div>
                        <div className="card-footer">
                            <p style={{color:color}}>Result:{result|| 'Result Will Appear Here'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
)
}

export default RandomNumber;