import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Password must only contain characters and numbers'
    )
    .min(6, 'Password must be at least 6 characters'),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [login, setLogin] = useState('');
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:3000/posts');
      const user = response.data.find((user) => {
        return user.email === data.email && user.password === data.password;
      });
      if (user) {
        setLogin('Login successful');
      } else {
        setLogin('Login falied');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-form">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <label className="label">Name</label>
          <br />
          <input type="text" placeholder="Name" {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
          <br />
          <label className="label">Email</label>
          <br />
          <input type="text" placeholder="Email" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <br />
          <label className="label">Password</label>
          <br />
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <br />
          <button className="login-button" type="submit">
            Login
          </button>
          <p>{login}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
