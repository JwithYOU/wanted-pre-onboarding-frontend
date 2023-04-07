import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
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
                <Link to="/Signup">아직 회원이 아니신가요?</Link>
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              data-testid="signin-button"
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
