import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';



function App() {
  return (
    <>
      <main>
        <Routes>
          {/* Not protected ulrs */}
          <Route path="/login" element={<Login />} />
          {/* Protected urls */}
          <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;