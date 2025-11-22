import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from'react-router-dom';


const Login = ()=>
{
    const[form,setForm] = useState({email:'',password:''});
    const [msg,setMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e)=>
    {
        setForm({...form,[e.target.name]:e.target.value});
    }


    const handleSubmit = async(e)=>
    {
        e.preventDefault();
        console.log('Form data',form);
        try{
             const response = await axios.post('http://127.0.0.1:6500/api/auth/login',{email:form.email,password:form.password});
             const user = response.data;
             localStorage.setItem('user',JSON.stringify(user)) //save to local storage

             if(user.role === 'admin') navigate('/dashboard', { state: { msg: 'Welcome Admin!' } })
             else if(user.role === 'employee') navigate('/personaldetails')
        }
        catch(err){
            const errorMsg = err.response.data?.msg || 'Login failed. Please try again'
            setMsg(errorMsg);
        }
       
    }
    return(
        <React.Fragment>
            <div className="container my-3">
                <div className="row">
                    <div className="col-4">
                        <div className="card text-primary">
                            <div className="card-header">
                                <p className="card-title">Login</p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <input type="email" name="email" className='form-control mb-2' onChange={handleChange} required/>
                                    <input type="password" name="password" className='form-control mb-2' onChange={handleChange} required/>
                                    <button className='btn btn-sm btn-danger w-100'>Login</button>
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

export default Login