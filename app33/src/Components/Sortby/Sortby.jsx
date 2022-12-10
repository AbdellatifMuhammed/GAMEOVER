import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useParams } from "react-router-dom";



export default function Categories() {
let params= useParams()
const [sortItem, setSortItem] = useState([])
const [more, setMore] = useState(24)
const [loading, setLoading] = useState(true)
console.log(params);

const getMore=()=>
{  setMore( (moreItems)=> moreItems + 24 );} 

const options = {
  method: 'GET',
  url: `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${params.sortby}`,
  headers: {
    'X-RapidAPI-Key': '3c178dc004mshb93538c4fbe69ecp1c8dfejsn867ec10260b1',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

useEffect(() => {
  axios.request(options).then(function (response) {
    setSortItem(response.data);
    console.log(response.data);
    setLoading(false)
  }).catch(function (error) {
    console.error(error);
    setLoading(true)
});
}, [params.sortby])












return <>

<Helmet>
        <meta charSet="utf-8" />
        <title className='text-capitalize'> {params.sortby} games</title>
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
<section>
  <div className="container py-5">
    <div className="row gy-4 gx-4">
    {sortItem.slice(0,more).map((item,index)=><>
      <div key={index} className="col-lg-3 col-md-4 s col-sm-6">

        <Link to={`/GameDetails/${item.id}`}>
          <div className="card  cardbg mouse-pointer">
  <img src={item.thumbnail}  className="card-img-top w-100" alt="" />
  <div className="card-body">
    
    <div className='d-flex  justify-content-between align-items-center'>
      <h6 className=" ">{item.title?.split(' ').splice(0,3).join(' ')}..</h6>
      <div className="btn btn-primary text-white">Free</div>
    </div>

    <p className='text-muted'>{item.short_description?.split(' ').splice(0,2).join(' ')}....</p>

    <div className=" d-flex justify-content-between align-items-center">
      <button className='btn btn-secondary btn-sm rounded-3'><i className='fa-solid fa-plus'></i></button>

      <div className='d-flex justify-content-between align-items-center'>
        <button className='btn btn-secondary text-white mx-2 me-md-0 p-1 '>{item.genre}</button>
          {item.platform == "PC (Windows)"?      <button className='btn btn-secondary text-white mx-2 me-md-0 p-1'><i className='fa-brands fa-windows '></i></button>
          :<button className='btn btn-secondary text-white mx-2 me-md-0 p-1 '><i className='fa-solid fa-laptop'></i></button>}
      </div>
    </div>
  
  </div>
          </div>
        </Link>
      
      </div>
      </>)}

    </div>
      <div className='text-center my-3'>
      <button onClick={getMore} className='btn btn-secondary py-3 mx-auto w-md-25'>Show More Games</button>
      </div>
    </div>
</section>


  </>
  
}
