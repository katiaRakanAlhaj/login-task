import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './index.css';
import { Data } from '../interface/data';

function Login(): JSX.Element {
  const [data, setData] = useState<Data | undefined>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <br />
          <label className="label">Email</label>
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <br />
          <label className="label">Password</label>
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <br />
          <label className="label">Confirm Password</label>
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          <button type="submit" className="send-button">
            Check
          </button>
          <p>{result}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
