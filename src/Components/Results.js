import React, { useState, useEffect } from 'react';
import './Results.css'
import VideoCard from './VideoCard';
// importing axios from the file created ==> instance
import axios from '../api/axios'

// Modal
import ReactModal from 'react-modal';
import ReactPlayer from 'react-player/youtube';
import movieTrailer from 'movie-trailer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import { FadeTransform } from 'react-animation-components'; // Animation related stuff


function Results({ selectedOption }) {
    const [movies, setMovies] = useState([]);
    // run once whenever the component loads
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(selectedOption)
            setMovies(request.data.results)
            // At this point, this is not confirm that the state is Updated as it is done asyncronously
            return request
        }

        fetchData()
    }, [selectedOption])

    // modal (trailer related)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [currentMovie, setCurrentMovie] = useState({})
    const modalControl = (movie) => {
        setCurrentMovie(movie)
        setIsModalOpen(true)
        movieTrailer(movie?.title || movie.original_name || movie.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error))
    }

    const baseYTurl = 'https://www.youtube.com/watch?v=';
    const baseImgURL = 'https://image.tmdb.org/t/p/original';

    return (
        <div className="results">
            {/* MOVIE CARD */}
            {movies.map((movie) => (
                <div key={movie.id}>
                    <VideoCard
                        movie={movie}
                        key={movie.id}
                        modalControl={modalControl}
                    />
                </div>
            )
            )}
            {
                isModalOpen &&
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <ReactModal
                        className='modal'
                        isOpen={isModalOpen}
                        contentLabel="Trailer Modal"
                        ariaHideApp={false}
                        closeTimeoutMS={500}
                    >
                        <React.Fragment>
                            <IconButton
                                onClick={() => {
                                    setIsModalOpen(!isModalOpen)
                                    setTrailerUrl("")
                                }
                                } >
                                <HighlightOffIcon
                                    className='close__button'
                                />
                            </IconButton>
                            {trailerUrl ?
                                <React.Fragment>
                                    <ReactPlayer
                                        url={`${baseYTurl}${trailerUrl}`}
                                        width="85%" height="80%"
                                        style={{ padding: "15px 0px 20px 7vw" }}
                                        loop={true}
                                        controls={true}
                                    />
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <img src={`${baseImgURL}${currentMovie.backdrop_path || currentMovie.poster_path}`} alt={currentMovie.name}
                                        alt='Something Went Wrong'
                                        className='results__wentWrong' />
                                </React.Fragment>
                            }
                            <div className='results__modal--description'>
                                <h1>
                                    {currentMovie.title || currentMovie.original_name || currentMovie.name}
                                </h1>
                                <p>
                                    {currentMovie.overview}
                                </p>
                            </div>
                        </React.Fragment>
                    </ReactModal>
                </FadeTransform>
            }
        </div>
    )
};

export default Results;
