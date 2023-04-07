import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-5">
          <form>
            <h3 className="text-center">Sign Up</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                data-testid="email-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                data-testid="password-input"
              />
            </div>
            <div className="form-group">
              <p>
                <Link to="/Signin">이미 회원이신가요?</Link>
              </p>
            </div>
            <button
              className="btn btn-danger btn-block"
              data-testid="signup-button"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
