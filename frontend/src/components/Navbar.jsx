import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="navbar-add-button">
          Dodaj kontakt
        </button>
        <button className="navbar-add-button">
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
  );
}

export default Navbar;