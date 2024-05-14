export async function getUserWeather(email) {
    const jwt = Cookies.get("jwt");

    try {
      const response = await fetch(
        "http://localhost:8080/api/weather/getAll",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt
          },
        }
      );
      const data = await response.json()

      return data;
    } catch (error) {
      return false;
    }
  }