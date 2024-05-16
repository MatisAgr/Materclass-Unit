import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    {!userId && <li><Link to="/login">Login</Link></li>}
                    {!userId && <li><Link to="/register">Register</Link></li>}
                    {userId && <li><Link to="/profile">Profile</Link></li>}
                    {userRole == 'admin' && <li><Link to="/dashboard">Dashboard</Link></li>}
                    {userId && <li><Link to="/logout">Logout</Link></li>}
                </ul>
            </nav>
        </header>
    )
}