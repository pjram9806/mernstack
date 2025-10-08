import React, { useState } from "react";

let User = ()=>
    {
        let [state,setState] = useState({
            username:'john'
        });

        let updateInput = (event)=>
            {
                event.preventDefault();
                setState((state)=>({
                    username:event.target.value
                }))
            }
        return(
            <React.Fragment>
                <div className="container my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <h3>Username</h3>
                                </div>
                                <div className="card-body">
                                    <form >
                                        <input type="text" className="form-control" value={state.username} onChange={updateInput}/>
                                    </form>
                                    <h3>{state.username}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
export default User;