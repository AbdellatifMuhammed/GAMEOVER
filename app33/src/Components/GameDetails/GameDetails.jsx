import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";


export default function GameDetails() {
    let {id}= useParams()
    const [gameDetails, setGameDetails] = useState({})
    const [system, setSystem] = useState({})
    const [screens, setScreens] = useState([])
    const [loading, setLoading] = useState(true)

async function getDetails() {
        

    let { data } = await axios.get(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    {headers:{'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68','X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',},},);
    setGameDetails(data)
    console.log(data);
    setSystem(data.minimum_system_requirements)
    setScreens(data.screenshots)
    // console.log(data.minimum_system_requirements);
    console.log(data.screenshots);
    setLoading(false)
}



useEffect(() => {
    getDetails()

        
    },[])







return <>

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


<div className="container py-5">

<div className="row">

<div className="col-md-4">
    <img src={gameDetails.thumbnail} className='w-100 rounded-2 mb-3' alt="" />
    <div className="row p-1">
        <div className="col-4">
            <div className='bg-secondary w-100 rounded-2 py-2 px-3 m-0 d-flex justify-content-center mouse-pointer'>
                <p className='p-0 m-0 text-center' > FREE </p>
            </div>
        </div>
        <div className="col-8"> 
            <button className='btn btn-info py-2 px-3 w-100'> <a href={gameDetails.game_url} target="_blank"> PLAY NOW </a> </button>
        </div>
    </div>
</div>

<div className="col-md-8">

    <h2 className='h1 fw-bolder mb-4'>{gameDetails.title}</h2>
    
    <h4 className=''>About {gameDetails.title}</h4>
    <p className='text-muted px-2'> {gameDetails.description} </p>

    <h4 className=''>Minimum System Requirements:</h4>
    <p className='px-2 m-0 mb-1'> Graphics: <span className='text-muted px'> {system.graphics}</span> </p>
    <p className='px-2 m-0 mb-1'> Memory: <span className='text-muted px'> {system.memory}</span> </p>
    <p className='px-2 m-0 mb-1'> OS: <span className='text-muted px'> {system.os}</span> </p>
    <p className='px-2 m-0 mb-1'> Processor: <span className='text-muted px'> {system.Processor}</span> </p>
    <p className='px-2 m-0 mb-1'> Storage: <span className='text-muted px'> {system.storage}</span> </p>

    <h4 className='my-3'>Minimum System Requirements Screenshots</h4>
    {screens == null?'': <>
<h5 className='pt-4 pb-2 fw-bolder' >{gameDetails.title} Global Screenshots</h5>

<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel"  data-bs-interval="2000">
  
<div  className="carousel-inner">
        {screens.map((item,id)=>
        
        <div key={id}  className="carousel-item active"> <img src={item.image} className="d-block w-100"  /> </div> )}  
        </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon d-none" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon d-none" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

</> }
    <h4 className='my-2'>Additional Information</h4>
    <div className="row py-3">
        <div className="col-md-4 col-6">
            <p className='text-muted m-0'>Title</p>
            <h5>{gameDetails.title}</h5>
        </div>
        <div className="col-md-4 col-6">
            <p className='text-muted m-0 text-capitalize'>developer</p>
            <h5>{gameDetails.developer}</h5>
        </div>
        <div className="col-md-4 col-6">
            <p className='text-muted m-0 text-capitalize'>publisher</p>
            <h5>{gameDetails.publisher}</h5>
        </div>
        <div className="col-md-4 col-6">
            <p className='text-muted m-0 text-capitalize'>release date</p>
            <h5>{gameDetails.release_date}</h5>
        </div>
        <div className="col-md-4 col-6">
            <p className='text-muted m-0 text-capitalize'>genre</p>
            <h5>{gameDetails.genre}</h5>
        </div>
        <div className="col-md-4 col-6">
            <p className='text-muted m-0 text-capitalize'>platform</p>
            <h5>{gameDetails.platform}</h5>
        </div>

    </div>






</div>


</div>
    
</div>

{/* {screens == null?'': <>
<h5 className='pt-4 pb-2 fw-bolder' >{gameDetails.title} Global Screenshots</h5>
<div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">

<div  className="carousel-inner">
{screens.map((item,id)=>
    <div key={id}  className="carousel-item active"> <img src={item.image} className="d-block w-100"  /> </div> )}  
    </div>
    // carouselExampleSlidesOnly|||||carouselExampleControls
    </div>
</> } */}









</>
}
