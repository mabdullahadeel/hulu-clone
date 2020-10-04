import React from 'react';
import './Navbar.css';
import endpoints from '../api/request'

function Navbar({ setSelectedOption }) {
    return (
        <div className="nav">
            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchTrending)
            }}>Trending</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchTopRated)
            }}>Top Rated</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchActionMovies)
            }}>Action</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchComedyMovies)
            }}>Comedy</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchHorrorMovies)
            }}>Horror</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchRomanticMovies)
            }}>Romance</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchMystery)
            }}>Mystery</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchSciFi)
            }}>Sci-fi</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchWestern)
            }}>Western</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchAnimation)
            }}>Animation</h2>

            <h2 onClick={() => {
                setSelectedOption(endpoints.fetchNetflixOriginals)
            }}>Movie</h2>

        </div>
    )
}

export default Navbar;
