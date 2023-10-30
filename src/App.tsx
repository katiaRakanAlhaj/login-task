import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import './index.css';
import Signup from './components/signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
