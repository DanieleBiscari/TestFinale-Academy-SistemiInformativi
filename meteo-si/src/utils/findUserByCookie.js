import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";

export function findUserByCookie(){
    const jwt  = Cookies.get("jwt")
    if(jwt){
        const tokenDecoded = jwtDecode(jwt);
        const { name, lastName, email, isLogged } = tokenDecoded;
        const userToSee = {
            firstName: name,
            lastName: lastName,
            email: email,
            logged: isLogged,
          };
          return userToSee
    }

    return false
}