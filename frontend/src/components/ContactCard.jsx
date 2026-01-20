import React, { useEffect, useState } from 'react';
import '../css/contactCard.css';
import api from '../api/api';
import EditContactModal from './Modal/EditContactModal';
import Pagination from './Pagination.jsx';

const ContactCard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ordering, setOrdering] = useState('last_name');
  const PAGE_SIZE = 4;

  const fetchContacts = (page = 1, sort = 'last_name') => {
    api.get(`contacts/?page=${page}&ordering=${sort}`)
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
    fetchContacts(currentPage, ordering);
  }, [currentPage, ordering]);

  const handleDelete = async (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten kontakt?")) {
      try {
        await api.delete(`contacts/${id}/`);
        fetchContacts(currentPage, ordering);
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

  if (contacts.length === 0) {
    return (
      <div className="no-contacts-container">
        <p>Dodaj swój pierwszy kontakt</p>
      </div>
    );
  }

  return (
      <div className="contacts-grid">
        <div className="sorting-controls">
          <label htmlFor="sort-select">Sortuj według: </label>
          <select
            id="sort-select"
            value={ordering}
            onChange={(e) => {
              setOrdering(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="last_name">Nazwisko (A-Z)</option>
            <option value="-last_name">Nazwisko (Z-A)</option>
            <option value="created_at">Data powstania (rosnąco)</option>
            <option value="-created_at">Data powstania (malejąco)</option>
          </select>
        </div>

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
                <div className="temp">{item.weather.temp}</div>
                <div className="wind">{item.weather.wind} km/h</div>
              </div>
              <div className="card-actions">
                <button onClick={() => handleEditClick(item)} className="btn edit-btn">Edytuj</button>
                <button onClick={() => handleDelete(item.id)} className="btn delete-btn">Usuń</button>
              </div>
            </div>
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <EditContactModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSuccess={() => fetchContacts(currentPage, ordering)}
            contact={selectedContact}
        />
      </div>
  );
};

export default ContactCard;