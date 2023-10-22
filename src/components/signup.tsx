import { Link } from 'react-router-dom';

function SignUp(): JSX.Element {
  return (
    <div className="sign-container">
      <div className="sign-form">
        <form>
          <label className="label">Email</label>
          <br />
          <input type="email" placeholder="Email" />
          <br />
          <label className="label">Password</label>
          <br />
          <input type="password" placeholder="Password" />
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
