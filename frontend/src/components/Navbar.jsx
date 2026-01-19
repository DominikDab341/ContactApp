import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import AddContactModal from './Modal/AddContactModal.jsx';

const MODALS = {
  ADD_CONTACT: 'addContact',
  IMPORT_CSV: 'importCsv'
};

function Navbar() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button
            className="navbar-add-button"
            onClick={() => setActiveModal(MODALS.ADD_CONTACT)}
          >
            Dodaj kontakt
          </button>
          <button
            className="navbar-add-button"
            onClick={() => setActiveModal(MODALS.IMPORT_CSV)}
          >
            Importuj kontakty
          </button>
        </div>

        <div className="navbar-center">
          <span className="navbar-title">ContactApp</span>
        </div>

        <div className="navbar-actions">
          <button className="navbar-button" onClick={handleLogout}>
            Wyloguj
          </button>
        </div>
      </nav>

      <AddContactModal
        isOpen={activeModal === MODALS.ADD_CONTACT}
        onClose={closeModal}
        onSuccess={handleRefresh}
      />
    </>
  );
}

export default Navbar;