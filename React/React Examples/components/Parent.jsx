import React, { useState } from "react";
import Child from "./Child";

let Parent = ()=>
    {
        let  [state,setState] =  useState(
            {
                msg:'Hello I am from parent',
                name:'  '
            });
        
        let receiveData = (data)=>
            {
                setState((state)=>({
                    ...state,
                    name:data
                }))
            }
        return(
            <React.Fragment>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body bg-secondary text-white">
                                    <p className="h4">Parent Component</p>
                                    <p>From Child:{state.name}</p>
                                    <Child msg = {state.msg} sendData = {receiveData}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

export default Parent;