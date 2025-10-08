/* console.log('Hello-1');
console.log('Hello-2');

setTimeout(()=>
    {
      console.log('Hello-3');
    },3000)
console.log('Hello-4');
console.log('Hello-5'); */


function Register()
{
    return new Promise((resolve,reject)=>
        {
            setTimeout(()=>
                {
                    console.log(`Please Register`);
                    reject(`Registration Failed`)
                },3000)
        })
}

const login = ()=>
    {
        return new Promise((resolve,reject)=>
            {
                setTimeout(()=>
            {
                console.log('Please Login');
                resolve('Success')
            },6000)
            })
        
    }


const thanku = ()=>
    {
      new Promise((resolve,reject)=>
        {
              setTimeout(()=>
            {
                console.log(`Thank You`);
                
            },1000)
        })
    }

Register()
.then(login).then(thanku)
.catch((err)=>{console.log(err);
})
