
import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';

const Navbar = ({ setSidebar }) => {
    const [searchQuery, setSearchQuery] = useState(''); // State to manage the search query
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Function to handle search submission
    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`); // Redirect to search results page
        }
    };

    return (
        <nav className="flex-div">
            <div className='nav-left flex-div'>
                <img
                    className='menu-icon'
                    onClick={() => setSidebar(prev => !prev)}
                    src={menu_icon}
                    alt=""
                />
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>
            </div>

            <div className='nav-middle flex-div'>
                <div className="search-box flex-div">
                    <input
                        type='text'
                        placeholder='search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <img
                        src={search_icon}
                        alt='search-icon'
                        onClick={handleSearch}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div className='nav-right flex-div'>
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img src={profile_icon} className='user-icon' alt="" />
            </div>
        </nav>
    );
};

export default Navbar;
