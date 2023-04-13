import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [psword, setPsword] = useState("");
  const [formValid, setFormValid] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  const getTokenLocalStorage = () => {
    return localStorage.getItem("JWT");
  };

  const token = getTokenLocalStorage();
  if (token) {
    axios
      .get(`${apiUrl}todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        window.location.href = "/todo";
      })
      .catch(() => {
        localStorage.removeItem("JWT");
      });
  }

  useEffect(() => {
    if (token) {
      axios
        .get(`${apiUrl}todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          window.location.href = "/todo";
        })
        .catch(() => {
          localStorage.removeItem("JWT");
        });
    }
  }, [apiUrl, token]);

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

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post(
        `${apiUrl}auth/signup`,
        { email: email, password: psword },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.status === 201) window.location.href = "/signin";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
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
                  <button
                    className="btn btn-danger btn-block"
                    data-testid="signup-button"
                    disabled={formValid}
                    onClick={handleSignUp}
                  >
                    회원가입
                  </button>
                )}
              </>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
