export async function register(authUser) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/register",
        {
          method: "POST",
          body: JSON.stringify(authUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.ok;
    } catch (error) {
      return false;
    }
  }