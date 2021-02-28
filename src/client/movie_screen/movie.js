import '../utils/style.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Header from '../images/logo.jpg'
import BackGround from '../images/background.jpg'

import { Recommendations } from './movieRecommendation'

const MoviePage = () => {
    const token = useSelector(state => state.token)
    const userName = useSelector(state => state.userName)

    const [movie,setMovie] = useState('')
    const [genres,setGenres] = useState('')


    useEffect(()=>{
        axios.get("https://api.themoviedb.org/3/movie/414771?api_key=a69ec695d12d89a6b5e1178a4640d2ef&language=he")
        .then((res)=>{
            // console.log(res.data)
            setMovie(res.data)
            getGeneres(res.data)
        }).catch(err => console.log(err))
    },[])


    const getGeneres = (movie) =>{
        let gens = ""
        movie.genres.map(genre =>{
            return gens+=genre.name+" "
        })
        setGenres(gens)
    }



    return (
        <div class="flex flex-col bg-fixed items-center "
            style={{ backgroundImage: `url(${BackGround})`, backgroundSize: '100% 100%' }}
        >
            <header class="flex flex-col h-1/6 sm:h-2/6 w-full">
                <img src={Header} alt="" class="h-full" />
            </header>

            <div class = "flex flex-col my-24 bg-white box-border w-3/4 sm:h-5/6 sm:w-2/4 border-4 rounded-lg">

                        {/*title + genres + release*/}
                <div class = "flex flex-col w-full sm:h-2/6 grid divide-y-2  divide-black divide-opacity-25 bg-white ">
                    <div class = "flex items-center h-3/4 text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black underline justify-self-center text-center">
                        {movie.title}   
                    </div>

                    <div class = "h-1/4 grid grid-cols-2 divide-x divide-green-500 text-xs sm:text-sm text-center">
                        <div class = "">
                            תאריך יציאה: {movie.release_date}
                        </div>
                        <div class = "">
                            ג'נאר: {genres}
                        </div>
                    </div>
                </div>

                        {/*Photo*/}
                <div class="flex flex-row w-full h-2/6  grid justify-items-center bg-gray-300"> 
                    <div class = "flex flex-row w-1/2">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                    </div>
                </div>
                
                
                <div class = "flex flex-col h-16 sm:h-1/6 text-xs sm:text-sm mt-5"> {/*overview*/}
                    <div class = "flex justify-end underline">
                        תקציר
                    </div>
                    <div class = "flex justify-start text-right  overflow-y-auto">
                        {movie.overview}
                    </div>
                </div>


                <div class = "flex flex-col h-40 sm:h-1/6 text-right mt-5 "> {/* Recommendations */}
                    <div class = "underline mb-2">
                        המצלות
                    </div>
                    <div class = "max-h-52 overflow-y-auto">
                    <Recommendations/>
                    </div>
                </div>
            </div>



        </div>
    )

}

export default MoviePage