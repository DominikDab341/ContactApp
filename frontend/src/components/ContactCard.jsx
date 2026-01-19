import React, { useEffect, useState } from 'react';
import '../css/contactCard.css';
import api from '../api/api';
import EditContactModal from './Modal/EditContactModal';

const ContactCard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 4;

  const fetchContacts = (page = 1) => {
    api.get(`contacts/?page=${page}`)
      .then(response => {
        setContacts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / PAGE_SIZE));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error while fetching contacts", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten kontakt?")) {
      try {
        await api.delete(`contacts/${id}/`);
        fetchContacts(currentPage);
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

        <div className="pagination-bar">
          <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="btn pagination-btn"
          >
            Poprzednia
          </button>

          <span className="page-info">
          Strona <strong>{currentPage}</strong> z {totalPages || 1}
        </span>

          <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="btn pagination-btn"
          >
            Następna
          </button>
        </div>

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