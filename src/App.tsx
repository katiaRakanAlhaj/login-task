import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
