import React from "react";

const Users = ()=>
{
    let employees = ["user-1","user-2","user-3"]
    return(
        <React.Fragment>
            {
                employees.map((emp,index)=>
                {
                    return <li key={index}>{emp}-{index}</li>
                })
            }
        </React.Fragment>
    )
}

export default Users;