import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export async function login(authUser, setUser) {
  try {
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      body: JSON.stringify(authUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const tokenDecoded = jwtDecode(data.token);
    const { nome, cognome, email, isLogged } = tokenDecoded;

    if (response.ok) {
      const userToSee = {
        firstName: nome,
        lastName: cognome,
        email: email,
        logged: isLogged,
      };
      Cookies.set("jwt", data.token, { expires: new Date(data.ttl) });
      setUser(userToSee);
    }
    return response.ok;
  } catch (error) {
    return false;
  }
}