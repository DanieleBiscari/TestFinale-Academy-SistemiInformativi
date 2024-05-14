import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import { logout } from "../services/auth/logout";
import { deleteUser } from "../services/user/deleteUser";
import Cookies from "js-cookie";

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function handleClickLogout() {
    logout();
    navigate("/login");
    location.reload();
  }

  async function handleClickDelete() {
    await deleteUser();
    navigate("/");
    location.reload();
  }


  return (
    <div className="container-lg d-flex flex-column  justify-content-center align-items-center gap-3">
      {showModal && (
        <>
          <div
            onClick={() => {
              setShowModal(false);
            }}
            className="overlay"
          ></div>
          <ConfirmModal
            title={"Stato Eliminazione"}
            bodyText={"Sei sicuro di voler eliminare il tuo account?"}
            closeText={"annulla"}
            confirmText={"elimina"}
            setShowModal={setShowModal}
            confirmEffect={handleClickDelete}
          ></ConfirmModal>
        </>
      )}
      <i className="profileIcon bi bi-person-circle"></i>
      <div>
        <p>
          <b>Nome</b>: {user.firstName}
        </p>
        <p>
          <b>Cognome</b>: {user.lastName}
        </p>
        <p>
          <b>Email</b>: {user.email}
        </p>
      </div>

      <div>
        <button onClick={handleClickLogout} className="btn btn-warning me-4 ">
          logout
        </button>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="btn btn-danger"
        >
          elimina
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
