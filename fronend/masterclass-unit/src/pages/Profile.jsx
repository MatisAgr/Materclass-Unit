import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

function UserProfilePage() {
    const navigate = useNavigate();
  // Utilisateur fictife
  const [user, setUser] = useState({
    name: "nom premon",
    email: "test@example.com",
    registeredSince: "2021-04-23"
  });

  // Mode d'édition
  const [editMode, setEditMode] = useState(false);

  // Champs du formulaire
  const [editedUser, setEditedUser] = useState({ ...user });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Mises à jour et fermer l'edition
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(editedUser);
    setEditMode(false);
  };

  // Historique des commandes
  const orders = [
    { eventId: 1, eventName: "Concert1", date: "2023-01-18", quantity: 2, total: 120 },
    { eventId: 2, eventName: "Concert2", date: "2023-02-22", quantity: 10, total: 500 },
    { eventId: 3, eventName: "Concert3", date: "2023-03-18", quantity: 62, total: 400 },
    { eventId: 4, eventName: "Concert4", date: "2023-04-22", quantity: 17, total: 60 },
    { eventId: 5, eventName: "Concert5", date: "2023-05-18", quantity: 28, total: 543 },
    { eventId: 6, eventName: "Concert6", date: "2023-06-22", quantity: 15, total: 444 },
    { eventId: 7, eventName: "Concert7", date: "2023-07-18", quantity: 92, total: 120 },
    { eventId: 8, eventName: "Concert8", date: "2023-08-22", quantity: 14, total: 60 },
    { eventId: 9, eventName: "Concert9", date: "2023-09-18", quantity: 22, total: 346 },
    { eventId: 10, eventName: "Concert10", date: "2023-10-22", quantity: 31, total: 34 },
    { eventId: 11, eventName: "Concert11", date: "2023-11-18", quantity: 22, total: 789 },
    { eventId: 12, eventName: "Concert12", date: "2023-12-22", quantity: 31, total: 3232 },
    { eventId: 13, eventName: "Concert13", date: "2024-01-18", quantity: 21, total: 556 },
    { eventId: 14, eventName: "Concert14", date: "2023-02-22", quantity: 12, total: 323 },
  ];

  useEffect(() => {
    const role = localStorage.getItem('userRole');
        // console.log(role)
        if (role !== 'user' && role !== 'admin') {
            navigate('/login');
        }
    }, []);

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Profil de {user.name}</h1>
        <div className={styles.profileContainer}>
            <h2 className={styles.section}>Informations Personnelles</h2>
            {!editMode ? (
                <>
                    <p className={styles.label}>Email: {user.email}</p>
                    <p className={styles.label}>Inscrit depuis: {user.registeredSince}</p>
                    <button className={styles.button} onClick={() => setEditMode(true)}>Modifier Profil</button>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Nom:
                        <input className={styles.input} type="text" name="name" value={editedUser.name} onChange={handleChange} />
                    </label>
                    <label className={styles.label}>
                        Email:
                        <input className={styles.input} type="email" name="email" value={editedUser.email} onChange={handleChange} />
                    </label>
                    <button className={styles.button} type="submit">Sauvegarder</button>
                    <button className={`${styles.button} ${styles.cancelButton}`} type="button" onClick={() => setEditMode(false)}>Annuler</button>
                </form>
            )}
        </div>
        <div className={styles.profileContainer}>
            <h2 className={styles.section}>Historique des Achats</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Événement</th>
                        <th>Date</th>
                        <th>Quantité</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.eventId}>
                            <td>{order.eventName}</td>
                            <td>{order.date}</td>
                            <td>{order.quantity}</td>
                            <td>{order.total}€</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
}

export default UserProfilePage;
