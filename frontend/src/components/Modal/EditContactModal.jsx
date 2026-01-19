import { useState, useEffect } from 'react';
import api from '../../api/api.js';
import Modal from './Modal.jsx';
import '../../css/addEditContact.css';

function EditContactModal({ isOpen, onClose, onSuccess, contact }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    town: '',
    status: ''
  });

  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchStatuses();
      if (contact) {
        setFormData({
          first_name: contact.first_name || '',
          last_name: contact.last_name || '',
          email: contact.email || '',
          phone_number: contact.phone_number || '',
          town: contact.town || '',
          status: contact.status || ''
        });
      }
    }
  }, [isOpen, contact]);

  const fetchStatuses = async () => {
    try {
      const response = await api.get('status/');
      setStatuses(response.data);
    } catch (err) {
      console.error("Error downloading statuses", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.put(`contacts/${contact.id}/`, formData);
      onSuccess();
      onClose();
    } catch  {
      setError('Failed to update contact.');
      alert("Nie udało się zaktualizować kontaktu")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="add-contact-form">
        <h2>Edytuj Kontakt</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Imię:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Nazwisko:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Telefon:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Miasto:</label>
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            disabled={isLoading}
          >
            <option value="">Wybierz status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.status}>
                {status.status}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Zapisywanie...' : 'Zaktualizuj Kontakt'}
        </button>
      </form>
    </Modal>
  );
}

export default EditContactModal;