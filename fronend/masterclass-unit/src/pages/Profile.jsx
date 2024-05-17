import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

function UserProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "Chargement...",
        email: "Chargement...",
        registeredSince: "Chargement...",
        events: []  // Stockage des événements
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');

        if (role !== 'user' && role !== 'admin') {
            navigate('/login');
        } else {
            const url = `http://localhost/Materclass-Unit/backend/api/user/user?idUser=${userId}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setUser({
                        name: data.UserUsername,
                        email: data.UserMail,
                        registeredSince: data.UserBirth,
                        events: data.Events  // Mise à jour des événements ici
                    });
                })
                .catch(error => {
                    console.error('Failed to fetch user data:', error);
                    navigate('/login');
                });
        }
    }, [navigate]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Profil de {user.name}</h1>
            <div className={styles.profileContainer}>
                <h2 className={styles.section}>Informations Personnelles</h2>
                <p className={styles.label}>Email: {user.email}</p>
                <p className={styles.label}>Inscrit depuis: {user.registeredSince}</p>
            </div>
            <div className={styles.profileContainer}>
                <h2 className={styles.section}>Historique des Achats</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Événement</th>
                            <th>Date</th>
                            <th>Slots</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.events.map(event => (
                            <tr key={event.IdEvent}>
                                <td>{event.EventDescription}</td>
                                <td>{event.EventStart}</td>
                                <td>{event.EventSlots}</td>
                                <td><a href={event.Invoice} target="_blank" rel="noopener noreferrer">Voir Facture</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserProfilePage;
