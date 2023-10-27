import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './index.css';
import { Link } from 'react-router-dom';

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
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const handleFormSubmit = async (data) => {
    try {
      const x = await axios.post('http://localhost:3000/posts', {
        id: Number(data.id),
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log('x', x);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <label className="label">ID</label>
          <br />
          <input type="number" placeholder="id" {...register('id')} />
          <br />
          <label className="label">Name</label>
          <br />
          <input type="text" placeholder="name" {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
          <br />
          <label className="label">Email</label>
          <br />
          <input type="text" placeholder="Email" {...register('email')} />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <br />
          <label className="label">Password</label>
          <br />
          <input type="text" placeholder="Password" {...register('password')} />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <br />
          <label className="label">Confirm Password</label>
          <br />
          <input
            type="text"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
          <br />
          <button type="submit" className="send-button">
            {isSubmitting ? 'loading...' : 'Check'}
          </button>
        </form>
        <Link to="/login">
          <p className="have-account">Do you have an account?</p>
        </Link>
      </div>
    </div>
  );
}
export default Signup;
