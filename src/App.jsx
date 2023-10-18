import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [data, setData] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../db/db.json');
        const json = await response.json();
        setData(json);
        console.log(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      data &&
      data.name === name &&
      data.email === email &&
      data.password === password
    ) {
      setResult('true');
    } else {
      setResult('false');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleFormSubmit}>
          <label className="label">Name</label>
          <br />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label className="label">Email</label>
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="label">Password</label>
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="send-button">
            Check
          </button>
          <p>{result}</p>
        </form>
      </div>
    </div>
  );
}

export default App;
