import React from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hook/useAuth';

const Navbar: React.FC = () => {

    const { handleLogout } = useAuth()
    return (
        <div className='container-navigation'>
            <Link to={"/create-room"}><button> Create Draft </button></Link>
            <Link to={"/history"}><button> Draft Histories </button></Link>
            <button onClick={handleLogout}> Logout </button>
        </div>
    );
};

export default Navbar;