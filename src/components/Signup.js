import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [psword, setPsword] = useState("");
  const [formValid, setFormValid] = useState(true);

  const emailHandleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (e.target.value.includes("@") && psword.length >= 8) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };

  const pswordHandleChange = (e) => {
    e.preventDefault();
    setPsword(e.target.value);
    if (e.target.value.length >= 8 && email.includes("@")) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };

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
                <Link to="/signin">이미 회원이신가요?</Link>
              </p>
            </div>
            <>
              {formValid ? (
                <button
                  className="btn btn-danger btn-block"
                  data-testid="signup-button"
                  disabled={formValid}
                >
                  회원가입
                </button>
              ) : (
                <Link to="/signin">
                  <button
                    className="btn btn-danger btn-block"
                    data-testid="signup-button"
                    disabled={formValid}
                  >
                    회원가입
                  </button>
                </Link>
              )}
            </>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
