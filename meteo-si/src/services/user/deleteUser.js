import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export async function deleteUser() {
  const jwt = Cookies.get("jwt");
  
  try {
    const tokenDecoded = jwtDecode(jwt);
    const { email } = tokenDecoded;
    const emailJson = { email: email };

    const response = await fetch("http://localhost:8080/api/user/delete", {
      method: "DELETE",
      body: JSON.stringify(emailJson),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + jwt,
      },
    });

    Cookies.remove("jwt");
    return response.ok;
  } catch (error) {
    return false;
  }
}
