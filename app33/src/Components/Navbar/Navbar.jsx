import React from 'react'
import { Link, NavLink } from "react-router-dom";
import Images from "../../imgs";


export default function Navbar({userData , logout}) {
  return (
<nav className="navbar navbar-expand-lg bg-dark navbar-dark shdw ">
  <div className="container d-flex justify-content-center align-items-center ">
    <h1><Link className="navbar-brand me-5" to=""> <img src={Images.Logo} className=' logo' alt="" /> Game Over</Link></h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="All">All</NavLink>
            </li>
    
    
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Platforms
              </Link>
              <ul className="dropdown-menu cardbg">
                <li><Link className="dropdown-item text-muted" to="/Platform/pc">Pc</Link></li>
                <li><Link className="dropdown-item text-muted" to="/Platform/browser">Browser</Link></li>
              </ul>
            </li>
    
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort-by
              </Link>
              <ul className="dropdown-menu cardbg">
                <li><Link className="dropdown-item text-muted" to="/Sortby/release-date">Release Date</Link></li>
                <li><Link className="dropdown-item text-muted" to="/Sortby/popularity">Popularity</Link></li>
                <li><Link className="dropdown-item text-muted" to="/Sortby/alphabetical">Alphabetical</Link></li>
                <li><Link className="dropdown-item text-muted" to="/Sortby/relevance">Relevance</Link></li>
              </ul>
            </li>
    
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </Link>
              <ul className="dropdown-menu cardbg">
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/racing">Racing</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/sports">Sports</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/social">Social</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/shooter">Shooter</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/open-world">open World</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/zombie">zombie</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/fantasy">fantasy</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/action-rpg">action-rpg</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/action">action</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/flight">flight</Link></li>
                <li><Link className="dropdown-item text-capitalize text-muted" to="/Categories/battle-royal">battle-royal</Link></li>
              </ul>
            </li>
    
    
    
          </ul>:''}

      <div className="right rightSide d-flex flex-end justify-content-center align-items-center ms-auto">

    {userData?<button className='btn btn-outline-secondary text-white'  onClick={logout}  > LogOut</button>
    :<>
    <Link className='m-0 mx-4' to='Login'> LogIn</Link>
    <Link className='text-white' to='Register'><button className='btn btn-outline-info' >Join Free  </button></Link>
    </>
    }


</div>
    </div>




  </div>
</nav>
  )
}
