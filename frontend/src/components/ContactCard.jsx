import React, { useEffect, useState } from 'react';
import '../css/contactCard.css';
import api from '../api/api';

const ContactCard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api.get('contacts/')
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error during fetching contacts", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ładowanie danych</p>;

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
        </div>
      ))}
    </div>
  );
};

export default ContactCard;