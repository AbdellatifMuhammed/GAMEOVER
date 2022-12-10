import axios from 'axios'
import React, { useState }  from 'react'
import 
{ Link,useNavigate } from "react-router-dom";
import Joi from "joi";
import Images from "../../imgs";
import { Helmet } from 'react-helmet';



export default function Login({saveUserData}) {
  const [errorList, setErrorList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setErorr] = useState(``)
  const [user, setUser] = useState({  
    email:``,
    password:'',
  })

  let navigate= useNavigate()
  
  function getUserData(e) {
    
    let myUser= {...user}
    myUser[e.target.name]=e.target.value
    setUser(myUser)
    console.log(myUser);
  }


  async function sendLoginDataToApi( ) {
    let {data}=await axios.post(`https://sticky-note-fe.vercel.app/signin`,user)
  console.log(data);

  if (data.message == `success`) {
    setLoading(false)
    localStorage.setItem('userToken',data.token)
    saveUserData()
    navigate(`/`)


  }
  else{
    setLoading(false)
    setErorr(data.message)
}



}


function submitLoginData(e) {
setLoading(true);
e.preventDefault();
let validation=validateLogin();

if(validation.error) {
  setLoading(false);
    setErrorList(validation.error.details);
  
} else{
  sendLoginDataToApi()
}


}


function validateLogin() {
let scheme = Joi.object({
  email: Joi.string().email({tlds: { allow: ['com','net'] } }).required(),
  password: Joi.string().min(5).required(),
})

console.log(scheme.validate(user, {abortEarly: false} ) );
return  scheme.validate(user, {abortEarly: false} )  ;
}




// 




return <>

<Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
  </Helmet>

<div className="container">
<div className="row py-5  ">


<div className="col-md-6 px-0 bgsec ">
  <div className="bg-log w-100"><img className='w-100' src={Images.Game} alt="" /></div>
</div>

<div className="col-md-6 px-3 bgsec ">
  {errorList.map( (err,index)=> <div key={index} className="alert alert-danger p-1 my-2">{err.context.label} is invailed</div>    )}

  {error.length>0 ?  <div className="alert alert-danger p-1 my-2">{error}</div>:`` }

<div className="sub text-center">
    <img src={Images.Logo} className='w-25' alt="" />
    <h2 className='fw-bold'>Log in to GameOver</h2>
  </div>

  <form action="" onSubmit={submitLoginData} className='mb-0'>




    <input onChange={getUserData} type="email" className='form-control w-75 mx-auto my-input my-3' name="email" id="email" placeholder='Email Address' />
    <input  onChange={getUserData} type="password" className='form-control w-75 mx-auto my-input my-3' name="password" id="password" placeholder='Password' />

    <div className='text-center mb-2'>
    <button className='btn btn-dark  w-75    px-3 py-2 ' type='submit' >
    {loading == true? <i className='fas fa-spinner fa-spin'></i>:`LogIn` }
    </button>
    </div>
    <div className='text-center mb-0'> <p className='mb-0'>Not a member yet? <Link to='/Register' className='text-primary'>Create Account</Link> Now </p></div>
  </form>

  
</div>


</div>
</div>

</>

}
