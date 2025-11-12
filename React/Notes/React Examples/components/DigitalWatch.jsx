import React, { useEffect, useState } from "react";

let DigitalWatch = ()=>
{

    let [state,setState] = useState({ 
        currenTime:new Date().toLocaleTimeString()
    });

    useEffect(()=>{
        let interval = setInterval(()=>{
            setState(()=>({currenTime:new Date().toLocaleTimeString()}))
        },1000);
        return ()=>{
            clearInterval(interval);
        }
    },[])


    return(
        <React.Fragment>
            <div className="container my-3">
                <div className="row">
                    <div className="col-4">
                        <div className="card shadow lg text-center">
                            <div className="card-header bg-warning">
                                <p className="h5">Digital Watch</p>
                            </div>
                            <div className="card-body">
                                <p className="h4">{state.currenTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DigitalWatch;