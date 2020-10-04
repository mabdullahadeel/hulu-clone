import React from 'react';
import './Header.css';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';


function Header() {
    return (
        <div className="header">
            <div className="header__icons">
                <div className="header__icon">
                    <HomeIcon />
                    <p>Home</p>
                </div>
                <div className="header__icon">
                    <FlashOnIcon />
                    <p>Trending</p>
                </div>
                <div className="header__icon">
                    <LiveTvIcon />
                    <p>Verified</p>
                </div>
                <div className="header__icon">
                    <VideoLibraryIcon />
                    <p>Collection</p>
                </div>
                <div className="header__icon">
                    <SearchIcon />
                    <p>Search</p>
                </div>
                <div className="header__icon">
                    <PersonOutlineIcon />
                    <p>Profile</p>
                </div>
            </div>
            <img src="https://www.techadvisor.co.uk/cmsdata/features/3779153/hulu_logo_copy_thumb1200_16-9.png" alt="hulu-logo" />
        </div>
    )
}

export default Header
