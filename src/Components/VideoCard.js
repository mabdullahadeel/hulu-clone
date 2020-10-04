import React from 'react';
import './VideoCard.css';
import TextTruncate from 'react-text-truncate';
import { ThumbUpSharp } from '@material-ui/icons';
import { FadeTransform } from 'react-animation-components'; // Animation related stuff


const baseURL = 'https://image.tmdb.org/t/p/original';

function VideoCard({ movie, modalControl }) {
    return (
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <div className="videoCard" onClick={() => modalControl(movie)}>
                <img src={`${baseURL}${movie.backdrop_path || movie.poster_path}`} alt={movie.name} />
                <TextTruncate
                    line={1}
                    element='p'
                    truncateText='...'
                    text={movie.overview}
                />
                <TextTruncate
                    line={1}
                    element='h2'
                    truncateText='...'
                    text={movie.title || movie.original_name}
                />
                <p className='videoCard__stats'>
                    {movie.media_type && `${movie.media_type} | `}
                    {movie.release_date || movie.first_air_date}{"  |      "}
                    <ThumbUpSharp />{' '}
                    {movie.vote_count}
                </p>
            </div>
        </FadeTransform>
    )
}

export default VideoCard
