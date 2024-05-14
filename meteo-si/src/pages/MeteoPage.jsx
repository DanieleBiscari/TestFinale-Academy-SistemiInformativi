import React, { useEffect, useState } from "react";
import { getWeatherData } from "../services/weather/getWeatherData";
import { saveWeatherData } from "../services/weather/saveWeatherData";

const MeteoPage = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    temperatureUnit: "",
    apparentTemperature: null,
    apparentTemperatureUnit: "",
    umidity: null,
    umidityUnit: "",
    latitude: 38.132,
    longitude: 13.3356,
  });
  const [seeSavedConfirm, setSeeSavedConfirm] = useState(false);

  useEffect(() => {
    if (weatherData.latitude && weatherData.longitude) {
      getWeatherData(weatherData.latitude, weatherData.longitude).then(
        (res) => {
          if (res) {
            const newData = {
              temperature: res.current.temperature_2m,
              temperatureUnit: res.current_units.temperature_2m,
              apparentTemperature: res.current.apparent_temperature,
              apparentTemperatureUnit: res.current_units.apparent_temperature,
              umidity: res.current.relative_humidity_2m,
              umidityUnit: res.current_units.relative_humidity_2m,
              latitude: weatherData.latitude,
              longitude: weatherData.longitude,
            };
            setWeatherData(newData);
          }
        }
      );
    }
  }, [weatherData.latitude, weatherData.longitude]);

  function handleClick() {
    const ok = saveWeatherData(weatherData);
    if (ok) {
      setSeeSavedConfirm(true);
      setTimeout(() => {
        setSeeSavedConfirm(false);
      }, 5000);
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="text-center mb-5">Verifica il Meteo</h1>
      <div className="d-flex flex-column  justify-content-center align-items-center gap-4">
        <input
          placeholder="latitudine"
          defaultValue={38.132}
          type="number"
          onChange={(e) =>
            setWeatherData({ ...weatherData, latitude: e.target.value })
          }
        />
        <input
          placeholder="longitudine"
          defaultValue={13.3356}
          type="number"
          onChange={(e) =>
            setWeatherData({ ...weatherData, longitude: e.target.value })
          }
        />
        <div>
          <p>
            temperatura:{" "}
            <b>
              {weatherData.temperature}
              {weatherData.temperatureUnit}
            </b>
          </p>
          <p>
            temperatura percepita:{" "}
            <b>
              {weatherData.apparentTemperature}
              {weatherData.apparentTemperatureUnit}
            </b>
          </p>
          <p>
            umidità:{" "}
            <b>
              {weatherData.umidity}
              {weatherData.umidityUnit}
            </b>
          </p>
        </div>

        <div className="d-flex justify-content-center flex-column align-items-center gap-2">
          <button className="btn btn-primary" onClick={handleClick}>
            salva le informazioni sul db
          </button>
          {seeSavedConfirm && (
            <div
              className="alert alert-success d-flex  justify-content-center align-items-center "
              role="alert"
            >
              <i className="fs-3 bi bi-check"></i> dati salvati correttamente
            </div>
          )}
        </div>
      </div>

      {/* <form
        onSubmit={handleSubmit}
        className="loginForm d-flex flex-column "
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
      </form> */}
    </div>
  );
};

export default MeteoPage;
