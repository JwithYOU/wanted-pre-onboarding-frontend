import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [psword, setPsword] = useState("");
  const [validation, setValidation] = useState(true);

  const emailHandleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const pswordHandleChange = (e) => {
    e.preventDefault();
    setPsword(e.target.value);
  };

  const isEmailValid = email.includes("@");
  const isPswordValid = psword.length >= 8;
  const isFormValid = isEmailValid && isPswordValid;

  const handleSubmit = (e) => {};

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-5">
          <form>
            <h3 className="text-center">Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={emailHandleChange}
                className="form-control"
                placeholder="Enter email"
                data-testid="email-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={psword}
                onChange={pswordHandleChange}
                className="form-control"
                placeholder="Enter password"
                data-testid="password-input"
              />
            </div>

            <div className="form-group">
              <p>
                <Link to="/Signup">아직 회원이 아니신가요?</Link>
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              data-testid="signin-button"
              disabled={!isFormValid}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
