import Cookies from "js-cookie"

export async function saveWeatherData(data){
    const jwt = Cookies.get("jwt")
    
    try {
      const response = await fetch(
        "http://localhost:8080/api/weather/save",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
          }
        }
      )

      return response.ok
    } catch (error) {
      return false
    }
  }