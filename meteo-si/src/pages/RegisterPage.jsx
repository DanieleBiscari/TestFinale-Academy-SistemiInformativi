import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { validateRegisterField } from "../services/auth/validateRegisterField";
import { register } from "../services/auth/register";

const RegisterPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [validationObj, setValidationObj] = useState({
    name: true,
    lastName: true,
    email: true,
    emailValid: true,
    password: true,
    passwordRepeat: true,
  });
  const [authUser, setAuthUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const validateObj = validateRegisterField(authUser);
    if (Object.values(validateObj).some((value) => value === false)) {
      setValidationObj(validateObj);
      return;
    }

    const ok = await register(authUser);
    if (ok) {
      setAuthUser({
        name: "",
        lastName: "",
        email: "",
        password: "",
        passwordRepeat: "",
      });
      navigate("/login");
      return;
    }

    const newObj = { ...validateObj, emailValid: false };
    setValidationObj(newObj);
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    const newObj = { ...authUser, [id]: value };
    setAuthUser(newObj);
  }

  return (
    <div className="flexCentered pb-5 ">
      <div className="registerContainer container-fluid d-flex flex-column align-items-center gap-2 justify-content-center rounded-2 ">

        <h1 className="">Registrati</h1>

        <form
          onSubmit={handleSubmit}
          className="loginForm d-flex flex-column justify-content-center align-items-center gap-5"
        >
          <div className="w-100">
            <div className="d-flex gap-3 mb-4">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={authUser.name}
                  className={
                    "form-control " + (validationObj.name ? "" : "is-invalid")
                  }
                  id="name"
                  aria-describedby="inserisci il tuo nome"
                  placeholder="es. Mario"
                />
                <div id="name" className="invalid-feedback">
                  Inserisci un nome dai 4 ai 20 caratteri
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Cognome</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={authUser.lastName}
                  className={
                    "form-control " +
                    (validationObj.lastName ? "" : "is-invalid")
                  }
                  id="lastName"
                  aria-describedby="inserisci il tuo cognome"
                  placeholder="es. Rossi"
                />
                <div id="lastName" className="invalid-feedback">
                  Inserisci un cognome dai 4 ai 20 caratteri
                </div>
              </div>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={authUser.email}
                className={
                  "form-control " +
                  (validationObj.email && validationObj.emailValid
                    ? ""
                    : "is-invalid")
                }
                id="email"
                aria-describedby="inserisci la tua email"
                placeholder="Inserisci email"
              />
              <div id="email" className="invalid-feedback">
                {validationObj.emailValid ? "" : "email già registrata"}
                {validationObj.email ? "" : "inserisci una email valida"}
              </div>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={handleInputChange}
                value={authUser.password}
                className={
                  "form-control " + (validationObj.password ? "" : "is-invalid")
                }
                id="password"
                aria-describedby="inserisci la tua password"
                placeholder="Password"
              />
              <div id="password" className="invalid-feedback">
                La tua password deve contenere una lettera maiuscola, una
                minuscola, un carattere speciale e deve essere lunga dai 6-20
                caratteri
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="passwordRepeat">Ripeti Password</label>
              <input
                type="password"
                onChange={handleInputChange}
                value={authUser.passwordRepeat}
                className={
                  "form-control " +
                  (validationObj.passwordRepeat ? "" : "is-invalid")
                }
                id="passwordRepeat"
                aria-describedby="inserisci la tua password"
                placeholder="Password"
              />
              <div id="passwordRepeat" className="invalid-feedback">
                Le password non coincidono
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 ">
            Registrati
          </button>
        </form>

        <div className="text-center lh-base  ">
          sei già registrato? <br /> effettua il{" "}
          <span className="linkAuth">
            <NavLink to={"/login"}> Login</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
