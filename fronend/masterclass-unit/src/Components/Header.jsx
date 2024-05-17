import { useEffect, useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
    const location = useLocation();

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
        setUserRole(localStorage.getItem('userRole'));
    }, [location.pathname]);

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    {!userId && <li><Link to="/login">Login</Link></li>}
                    {!userId && <li><Link to="/register">Register</Link></li>}
                    {userId && <li><Link to="/profile">Profile</Link></li>}
                    {userRole === 'admin' && <li><Link to="/dashboard">Dashboard</Link></li>}
                    {userId && <li><Link to="/logout">Logout</Link></li>}
                </ul>
            </nav>
        </header>
    )
}