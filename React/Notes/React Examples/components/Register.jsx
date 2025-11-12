import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Register = ()=>
{
    const [form,setForm] = useState({
        name:'',
        email:'',
        password:'',
        role:'employee'
    })
    const [msg,setMsg] = useState('')     
  

    const handleChange = (e)=>
    {
        //e.preventDefault();
        setForm({...form,[e.target.name]:e.target.value})
        
    }

    const handleSubmit = async(e)=>
    {
        e.preventDefault();
        console.log('Form data:', form);
        try{
            const res = await axios.post('http://127.0.0.1:6500/api/auth/register',form);
            alert( 'registered Successfully')
        }
        catch(err){
            const errorMsg = err.response?.data?.msg || 'Register Failed'
            setMsg(errorMsg)
        }

    }



    return(
        <React.Fragment>
            <div className="container my-3 ">
                <div className="row">
                    <div className="col-6">
                        <div className="card  text-success">
                            <div className="card-header">
                                <p className="card-title">Register</p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <input 
                                    type="name" 
                                    name="name"
                                    onChange={handleChange}
                                    className='form-control mb-2' 
                                    placeholder='Enter Name' 
                                    required/>

                                    <input 
                                    type="email" 
                                    name="email" 
                                    onChange={handleChange}
                                    className='form-control mb-2' 
                                    placeholder='Enter Email' 
                                    required/>

                                    <input 
                                    type="password" 
                                    name="password" 
                                    onChange={handleChange}
                                    className='form-control mb-2' 
                                    placeholder='Enter Password' 
                                    required />

                                    <select name="role" className='form-control mb-2' onChange={handleChange} required>
                                        <option value="disabled select">Select</option>
                                        <option value="admin">Admin</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                    <button className='btn btn-sm btn-primary w-100' type='submit'>Register</button>
                                </form>
                            </div>
                            <div className="card-footer">
                                 <p className={`card-text ${msg.includes('Success') ? 'text-success' : 'text-danger'}`}>
                                   {msg || 'No message yet'}
                                 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register;