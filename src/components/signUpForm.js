import React, {useState} from 'react'

function signUpForm({ signUp, error }) {
  const [details, setDetails] = useState({ username:"", email:"", password:"" })
  const submitHandler = e =>{
    e.preventDefault();
    Login(details);
  }  
  return (
    <form onSubmit={submitHandler}>
        <div className='form-inner'>
            <h2>Login</h2>
            {/*Error*/
             (error!=="") ? (<div className='error'>{error.message}</div>) : ""
            }
            <div className='form-group'>
                <label htmlFor='email'>Email:</label>
                <br />
                <input type='email' name='email' id='email' 
                onChange={e => setDetails({...details, email: e.target.value})} value={details.email} 
                required />
            </div>
            <div className='form-group'>
                <label htmlFor='username'>Username:</label>
                <br />
                <input type='text' name='username' id='username' 
                onChange={e => setDetails({...details, username: e.target.value})} value={details.username} 
                required />
            </div>
            <br />
            <div className='form-group'>
            <label htmlFor='password'>Password: *Minimum 8 characters </label>
                <br />
                <input type='password' name='password' id='password' 
                onChange={e => setDetails({...details, password: e.target.value})} value={details.password} 
                minLength="8" required />
            </div>
            <br />
            <input type='submit' value='signup'/>
        </div>
    </form>
  )
}

export default signUpForm