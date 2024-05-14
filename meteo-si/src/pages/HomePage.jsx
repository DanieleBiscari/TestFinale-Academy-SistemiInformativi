import React from "react";
import image1 from "../assets/img/img1.png";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <h1 className="text-center mb-4">Come funziona questa app</h1>
      <div className="d-flex flex-column justify-content-center align-items-center gap-4 align-items-center ">
        <div className="d-flex flex-wrap justify-content-center">
          <p className="pCustom">
            Andando nella sezione meteo è possibile inserire la latitudine e la
            longitudine della tua città per poter ottenere i dati metereologici
          </p>
          <img src={image1} alt="sole con nuovola e pioggia" width={400} />
        </div>

        <div className="d-flex flex-wrap justify-content-center">
          <p className="pCustom">I dati vengono aggiornati in tempo reale</p>
          <i className="fontCustom bi bi-clock"></i>
        </div>

        <div className="d-flex flex-wrap justify-content-center">
          <p className="pCustom">salva i tuoi dati dentro il Database</p>
          <i className="fontCustom bi bi-database"></i>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
