import React, { useState } from "react";

let Child = (props)=>
    {
        let [state,setState] =useState({
            msg:'i am from child component'
        })
        let btnClick = ()=>
            {
                props.sendData(state.msg);
                

            }
        return(
            <React.Fragment>
                            <div className="container">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="card">
                                            <div className="card-body bg-warning text-white">
                                                <p className="h4">Child Component</p>
                                                <p>From Parent:{props.msg}</p>
                                                <button className="btn btn-dark btn-sm" onClick={btnClick}>Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
        )
    }

export default Child;