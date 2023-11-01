import React, { useEffect, useState } from 'react';
import './Row.css'
import axios from '../../axios';
import requests from '../../requests';
import Youtube from 'react-youtube'
import movieTrailer from  'movie-trailer'

const base_url="https://image.tmdb.org/t/p/original/";

const Row = ({fetchUrl,title,isLargeRow}) => {
    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("");

    useEffect(()=>{
       
        async function fetchData(){
            const request=await axios.get(fetchUrl);
            console.log(request.data.results);
             setMovies(()=> request?.data.results)
            // return request;
          }
          fetchData()
        

    },[])

    const opts={
      height:"390",
      width:"100%",
      playerVars:{
        autoplay:1,
      },
    };
    
    const handleClick=(movie)=>{
        if(trailerUrl){
        setTrailerUrl("")
        }else{
          movieTrailer(movie?.title||movie?.name||movie?.original_name)
          .then((url)=>{
            const urlParams= new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"))
          })
          .catch((error)=>console.log(error))
         }
        }
    return (
        <div className='row'>
        <h2>{title}</h2>
        <div className="row__posters" >
           {movies?.map((singleMovie)=>{
           return (<img 
           onClick={()=> handleClick(singleMovie)}
           className={`row__poster ${isLargeRow && "row__posterLarge"}`}
           src={`${base_url}${
            isLargeRow?singleMovie.poster_path:singleMovie.backdrop_path}`} 
           alt={singleMovie.name} />)
           })} 
        </div>

        <div style={{padding:"40px"}}>
          {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
        
    </div>

    );
}

export default Row;
