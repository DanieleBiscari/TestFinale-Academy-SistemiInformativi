export async function getWeatherData(latitude, longitude) {
    try {
      const response = await fetch(
        // "https://api.open-meteo.com/v1/forecast?latitude=38.132&longitude=13.3356&current=temperature_2m,relative_humidity_2m,apparent_temperature",
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json()

      return data;
    } catch (error) {
      return false;
    }
  }