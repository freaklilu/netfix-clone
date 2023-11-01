import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import requests from '../../requests';
 import "./Banner.css" 


const base_url="https://image.tmdb.org/t/p/original/";
function Banner() {
    const [movie,setMovie]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request=await axios.get(requests.fetchNetflixOriginals);
            // console.log(request.data.results);
            setMovie(()=> request?.data.results[
                Math.floor(Math.random()*request.data.results.length)
            ])
            // return request;
          }
          fetchData();
    },[])
    
    // console.log(movie)
    
    function truncateString(str, num) {
          return  str?.length > num ? str.substring(0, num) + "..." :str;
       
      }
    
      return (
       <header 
       className='banner'
       style={{
       backgroundSize:"cover",
       backgroundImage:`url(${base_url}${movie?.backdrop_path})`,
       backgroundPosition:"center center",
       }}>
    
       <div  className='banner__contents'>
        <h1 className='banner__title'>
        {movie?.title||movie?.name||movie?.original_name}
        </h1>
        <div className='banner__buttons'>
            <button className='banner__button'>Play</button>
            <button className='banner__button'>My List</button>
        </div>
        <h1 className='banner__description'>{truncateString((movie?.overview),150)}</h1>
       </div>
       <div className='banner__fadeButton'/>
       
       
       
       
       
       
       </header>
      )
    }


export default Banner;
