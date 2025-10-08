import React, { useState } from 'react';

let WishMsg = ()=>
    {
      const [msg,setMsg] = useState('Hi')
      
      let Gm = ()=>
        {
            setMsg('Good Morning')
        }

     let Ge = ()=>
        {
            setMsg('Good Evening')
        }
        return(
            <React.Fragment>
                <div className="col-4 mx-3 py-2">
                    <div className="card">
                        <h4>{msg}</h4>
                        <div className="card-body">
                            <button className='btn btn-sm btn-primary' onClick={Gm}>Good Morning</button>
                            <button className='btn btn-sm btn-secondary' onClick={()=>setMsg('Good AFter_Noon')}>Good AfterNoon</button>
                            <button className='btn btn-sm btn-danger' onClick={Ge}>Good Evening</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

export default WishMsg;