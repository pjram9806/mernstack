import React, { Component, useState } from 'react';

let AuthUser = ()=>
    {
        let [state,setState] = useState({
            isLoggedIn:false
        });

        let Login = () =>
            {
                setState(()=>({
                    isLoggedIn:true
                }))
            }
        let Logout = ()=>
            {
                setState(()=>({
                    isLoggedIn:false
                }))
            }
        return(
            <React.Fragment>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    {
                                    
                                        state.isLoggedIn ?<p className="h3">Welcome Ram</p>:<p className="h3">Welcome Guest!!!</p>
                                    }
                                    {
                                        state.isLoggedIn ? <button className='btn btn-sm btn-danger' onClick={Logout}>Logout</button> :<button className='btn btn-sm btn-primary' onClick={Login}>Login</button>
                                    }
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
export default AuthUser;