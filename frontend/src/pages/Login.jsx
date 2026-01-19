import LoginForm from '../components/LoginForm';
import '../css/login.css';

function Login() {
  return (
      <div className="login-wrapper">
        <div className="login-page-container">
          <h2>Login Page</h2>
          <LoginForm />
        </div>
      </div>
  );
}

export default Login;