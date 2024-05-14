export function getLinksName(user) {
  let linksName;
  if (user?.logged) {
    linksName = [
      {
        nome: "Home",
        to: "/",
      },
      {
        nome: "Meteo",
        to: "/meteo",
      },
    ];
  } else {
    linksName = [
      {
        nome: "Home",
        to: "/",
      },
    ];
  }

  return linksName;
}
