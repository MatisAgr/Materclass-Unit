import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    )
}