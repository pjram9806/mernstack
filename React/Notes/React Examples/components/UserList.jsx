import React, { useEffect, useState }  from "react";
import UserService from "../services/UserService";

let UserList = ()=>
{
    let [state,setState] = useState({
        users:[]
    });

    useEffect(()=>{
        UserService.getAllUsers()
        .then((response)=>
            {
                setState(()=>({users:response.data}))
            })
        .catch((err)=>{
            console.error(`${err}`)
        })
    },[])

    let {users} = state;
    return(
          <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h3 text-success">User List</p>
                        <table className="table table-hover table-striped text-center">
                            <thead>
                                <tr>
                                    <th>SNO</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Street</th>
                                    <th>City</th>
                                    <th>Website</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                users.length >0 && users.map(user=>{
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address.street}</td>
                                            <td>{user.address.city}</td>
                                            <td>{user.website}</td>

                                        </tr>
                                    )
                                })
                               }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>            
          </React.Fragment> 
    )     
}

export default UserList;