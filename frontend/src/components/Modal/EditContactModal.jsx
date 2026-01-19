import { useState, useEffect } from 'react';
import api from '../../api/api.js';
import Modal from './Modal.jsx';
import '../../css/addEditContact.css';
import { validateContact } from '../../utils/contactValidation.js';

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
  const [fieldErrors, setFieldErrors] = useState({});

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
      setFieldErrors({});
      setError('');
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
    setFormData({ ...formData, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errors = validateContact(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      await api.put(`contacts/${contact.id}/`, formData);
      onSuccess();
      onClose();
    } catch {
      setError('Nie udało się zaktualizować kontaktu.');
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
            disabled={isLoading}
          />
          {fieldErrors.first_name && <div className="error-message">{fieldErrors.first_name}</div>}
        </div>

        <div className="form-group">
          <label>Nazwisko:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            disabled={isLoading}
          />
          {fieldErrors.last_name && <div className="error-message">{fieldErrors.last_name}</div>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          {fieldErrors.email && <div className="error-message">{fieldErrors.email}</div>}
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
          {fieldErrors.phone_number && <div className="error-message">{fieldErrors.phone_number}</div>}
        </div>

        <div className="form-group">
          <label>Miasto:</label>
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleChange}
            disabled={isLoading}
          />
          {fieldErrors.town && <div className="error-message">{fieldErrors.town}</div>}
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Wybierz status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.status}>
                {status.status}
              </option>
            ))}
          </select>
          {fieldErrors.status && <div className="error-message">{fieldErrors.status}</div>}
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Zapisywanie...' : 'Zaktualizuj Kontakt'}
        </button>
      </form>
    </Modal>
  );
}

export default EditContactModal;