import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [psword, setPsword] = useState("");
  const [formValid, setFormValid] = useState(true);
  // const [jwt, setJwt] = useState("");

  const jwt = localStorage.getItem("JWT");
  // useEffect(() => {
  //   setJwt(localStorage.getItem("JWT"));
  //   if (jwt) {
  //     return (window.location.href = "/todo");
  //   }
  // }, [jwt]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        { email: email, password: psword },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          localStorage.setItem("JWT", res.data.access_token);
          window.location.href = "/todo";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {jwt ? (
        (window.location.href = "/todo")
      ) : (
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
                    <Link to="/signup">아직 회원이 아니신가요?</Link>
                  </p>
                </div>
                <>
                  {formValid ? (
                    <button
                      className="btn btn-danger btn-block"
                      data-testid="signin-button"
                      disabled={formValid}
                    >
                      로그인
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-block"
                      data-testid="signin-button"
                      disabled={formValid}
                      onClick={handleSubmit}
                    >
                      로그인
                    </button>
                  )}
                </>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
