import { useState } from 'react';
import api from '../../api/api.js';
import Modal from './Modal.jsx';
import '../../css/uploadCSV.css';

function ImportContactsModal({ isOpen, onClose, onSuccess }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('contacts/upload-contacts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Kontakty zostały zaimportowane pomyślnie!');
      setFile(null);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Błąd podczas importu CSV:', error);
      alert('Nie udało się zaimportować pliku.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="add-contact-form">
        <h2>Importuj kontakty z CSV</h2>
        <p className="info-text">
          Wybierz plik .csv zawierający listę Twoich kontaktów.
        </p>

        <div className="form-group">
          <label>Plik CSV:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Rozpocznij import
        </button>
      </form>
    </Modal>
  );
}

export default ImportContactsModal;