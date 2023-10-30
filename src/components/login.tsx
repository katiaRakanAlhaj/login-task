import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userApi } from '../api/api';
import { TLogin } from '../api/interfaces';
import { schema_login } from './schema/shcema';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: yupResolver(schema_login),
    defaultValues: { email: '', name: '', password: '' },
  });
  const [login, setLogin] = useState('');
  const handleFormSubmit = async (data: TLogin) => {
    try {
      const response = await userApi.getUsers();
      const user = response.find((user) => {
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
    <div className="flex">
      <div className="flex-1">
        <div className="container">
          <h1 className="text-green-600 text-center text-4xl mt-12">
            Sign in to Account
          </h1>
          <hr className="mt-4  bg-green-600" />
          <div className="flex mt-4 cursor-pointer">
            <svg
              className="w-6 h-6 mx-4 text-green-400 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
            </svg>
            <svg
              className="w-6 h-6  text-green-400 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <svg
              className="w-6 h-6 mx-4 text-green-400  fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
            </svg>
          </div>
          <form className="mt-1" onSubmit={handleSubmit(handleFormSubmit)}>
            <label className="block mb-1 text-sm font-medium text-green-600 dark:text-white">
              Name
            </label>
            <input
              className="block w-96 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="text"
              placeholder="name"
              {...register('name')}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
            <label className="block mb-1 mt-3 text-sm font-medium text-green-600 dark:text-white">
              Email
            </label>
            <input
              className="block w-96 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="text"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <label className="block mb-1 mt-3 text-sm font-medium text-green-600 dark:text-white">
              Password
            </label>
            <input
              className="block w-96 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="text"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <button
              type="submit"
              className="mt-6 w-36 h-12 text-center justify-center   font-medium text-white focus:outline-none bg-green-600 rounded-full border border-green-600"
            >
              Login
            </button>
            <p className="mt-2  text-green-600 font-bold">{login}</p>
          </form>
        </div>
      </div>

      <div className="flex-2">
        <div className="background">
          <h1 className="text-white text-4xl	">Hello, Friend</h1>
          <hr className="mt-4" />
          <p className="mt-2 text-white">
            Fill up personal information and
            <br />
            start journey with us
          </p>
          <button
            type="submit"
            className="mt-6 w-36 h-12 text-center justify-center   font-medium text-white focus:outline-none bg-green-600 rounded-full border border-green-600"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
