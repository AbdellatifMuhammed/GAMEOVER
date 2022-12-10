import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Home() {
const [loading, setLoading] = useState(true)
const [popItem, setPopItem] = useState([])


  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: {'sort-by': 'popularity'},
    headers: {
      'X-RapidAPI-Key': '3c178dc004mshb93538c4fbe69ecp1c8dfejsn867ec10260b1',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

useEffect(() => {
  axios.request(options).then(function (response) {
    // console.log(response.data);
    setPopItem(response.data)
    setLoading(false)
  }).catch(function (error) {
    console.error(error);
    setLoading(true)
  });
}, [])


  







  return <>
  <Helmet>
        <meta charSet="utf-8" />
        <title>GAMEOVER!</title>
  </Helmet>
  
{loading == true?<>

<div className="loadingbg">
<figure>
  <div></div><div></div>
  <div></div><div></div>
  <div></div><div></div>
  <div></div><div></div>
</figure>
</div>

</>
:''}



<div className='homebg w-100  mb-5'>
    <div className='p-5 text-center'>
    <h2 className='fw-bolder text-color h1'>Find & track the best <span className='text-primary'>free-to-play</span> games!</h2>
    <p className='text-muted text-muted mx-auto '>Track what you've played and search for what to play next! Plus get free premium loot!</p>
    <Link to='/all'>  <button className='btn btn-outline-secondary'> Browse Games </button></Link>
  </div>
</div>
<div className="container">


  <h3 className='text-color'><i class="fa-solid fa-robot text-lead mb-4"></i> Personalized Recommendations </h3>

<div className="row  ">

{popItem.slice(0,3).map( (item,index)=> <>
  <div className="col-md-4 mb-3  ">
  <Link className='text-white' to={`/GameDetails/${item.id}`}>
    <div className=' mainCard bgsec rounded-3 '>
    <img src={item.thumbnail} className='w-100 rounded-3' alt="" />
      <div className="row p-3 align-items-center">
        <div className="col-6 p-1">{item.title}</div>
        <div className="col-6 p-1">
          <div className='bg-info ms-auto w-50 rounded-2 py-2 px-3 m-0 d-flex justify-content-center mouse-pointer'>
                <p className='p-0 m-0 text-center' > FREE </p>
          </div>
        </div>
      </div>
    </div>
  </Link>
    </div>
</> )}

</div>

</div>

  </>
}
