import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { validateLoginField } from "../services/auth/validateLoginField";
import { login } from "../services/auth/login";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ isValid, setIsValid ] = useState(true);
  const [authUser, setAuthUser] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = validateLoginField(authUser);

    if(!isValid){
      setIsValid(false)
      return
    }

    const ok = await login(authUser, setUser);
    if (ok) {
      setAuthUser({
        email: "",
        password: "",
      });
      navigate("/");
      return
    }

    setIsValid(false)
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    const newObj = { ...authUser, [id]: value };
    setAuthUser(newObj);
  }


  return (
    <div className="flexCentered pb-5 ">
      <div className="loginContainer container-fluid d-flex flex-column align-items-center gap-2 justify-content-center rounded-2 ">
        <h1>Accedi</h1>

        <form
          onSubmit={handleSubmit}
          className="loginForm d-flex flex-column justify-content-center align-items-center gap-4"
        >
          <div className="w-100 d-flex flex-column gap-3">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={authUser.email}
                onChange={handleInputChange}
                className={"form-control " + (isValid ? "" : "is-invalid")}
                id="email"
                aria-describedby="inserisci la tua email"
                placeholder="Inserisci email"
              />
              <div id="email" className="invalid-feedback">
                Password o Email non validi
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={authUser.password}
                onChange={handleInputChange}
                className={"form-control " + (isValid ? "" : "is-invalid")}
                id="password"
                aria-describedby="inserisci la tua password"
                placeholder="Password"
              />
              <div id="password" className="invalid-feedback">
                Password o Email non validi
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 ">
            Login
          </button>
        </form>

        <div>
          oppure{" "}
          <span className="linkAuth">
            <NavLink to={"/register"}>Registrati</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
