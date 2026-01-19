import React, { useEffect, useState } from 'react';
import '../css/contactCard.css';
import api from '../api/api';
import EditContactModal from './Modal/EditContactModal';

const ContactCard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = () => {
    api.get('contacts/')
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error while fetching contacts", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten kontakt?")) {
      try {
        await api.delete(`contacts/${id}/`);
        setContacts(contacts.filter(contact => contact.id !== id));
      } catch (error) {
        console.error("Error while deleting contact ", error);
        alert("Nie udało się usunąć kontaktu.");
      }
    }
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Ładowanie danych...</p>
      </div>
    );
  }

  return (
    <div className="contacts-grid">
      {contacts.map((item) => (
        <div key={item.id} className="contact-card">
          <div className="info">
            <h3>{item.first_name} {item.last_name}</h3>
            <p>{item.email}</p>
            <p>{item.phone_number}</p>
            <p>{item.town}</p>
            <p>Status: {item.status}</p>
          </div>

          <div className="weather-info">
            <div className="temp">
              {item.weather.temp}
            </div>
            <div className="wind">
              {item.weather.wind} km/h
            </div>
          </div>
          <div className="card-actions">
            <button
              onClick={() => handleEditClick(item)}
              className="btn edit-btn"
            >
              Edytuj
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="btn delete-btn"
            >
              Usuń
            </button>
          </div>
        </div>
      ))}

      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchContacts}
        contact={selectedContact}
      />
    </div>
  );
};

export default ContactCard;