import axios from 'axios'
import React, { useState }  from 'react'
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Images from '../../imgs';
import { Helmet } from 'react-helmet';




export default function Register() {
  const [errorList, setErrorList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setErorr] = useState(``)
  const [user, setUser] = useState({  
    first_name:'',
    last_name:'',
    age:0,
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


  async function sendRegisterDataToApi( ) {
    let {data}=await axios.post(`https://sticky-note-fe.vercel.app/signup`,user)
  console.log(data);

  if (data.message == `success`) {
    setLoading(false)
    navigate(`/Login`)
  }
  else{
    setLoading(false)
    setErorr(data.message)
}



}


function submitRegisterData(e) {
setLoading(true);
e.preventDefault();
let validation=validateRegister();

if(validation.error) {
  setLoading(false);
  setErrorList(validation.error.details);
  
} else{
  sendRegisterDataToApi()
}


}


function validateRegister() {
let scheme = Joi.object({
  first_name: Joi.string().pattern(/^[A-Z]/).min(3).max(13).required() ,
  last_name: Joi.string().pattern(/^[A-Z]/).min(3).max(13).required() ,
  age: Joi.number().min(18).max(68).required(),
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
        <title>Registeration</title>
  </Helmet>

<div className="container py-5">


<div className="row py-5">



{errorList.map( (err,index)=> <div key={index} className="alert alert-danger w-100 text-center
 mx-auto p-1 my-2">{err.context.label} is invailed</div>    )}
{error.length>0 ?  <div className="alert alert-danger p-1 my-2">{error}</div>:`` }

<div className="col-md-6 px-0 bgsec ">
  <div className="bg-log w-100"><img  className='w-100' src={Images.Game} alt="" /></div>
</div>

<div className="col-md-6 px-3 bgsec">
  

  
  
  <form action="" onSubmit={submitRegisterData}>

  <div className="sub text-center pt-3">
    {/* <img src={Images.Logo} className='w-25' alt="" /> */}
    <h2 className='fw-boldr'>Register Here</h2>
  </div>

    <div className="row my-3">
      <div className="col-md-6">
        <input onChange={getUserData} type="text" className='form-control my-input my-2' name="first_name" id="first_name" placeholder='First Name' />
      </div>
      <div className="col-md-6">
      <input  onChange={getUserData} type="text" className='form-control my-input my-2' name="last_name" id="last_name" placeholder='Last Name' />
      </div>
    </div>

    <input onChange={getUserData} type="email" className='form-control my-input my-3' name="email" id="email" placeholder='Email Address' />
    <input  onChange={getUserData} type="number" className='form-control my-input my-3' name="age" id="age"placeholder='Age' />
    <input  onChange={getUserData} type="password" className='form-control my-input my-3' name="password" id="password" placeholder='Password' />

    <button className='btn btn-dark px-3 py-3 w-100' type='submit' >
    {loading == true? <i className='fas fa-spinner fa-spin'></i>:`Create Account` }
  </button>

  <p className='text-muted my-3 text-center'>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target='_blank'>Privacy Policy</a> and <a href="https://policies.google.com/terms" target='_blank'>Terms of Service </a>apply.</p>

  </form>
</div>


</div>

</div>
</>

}
