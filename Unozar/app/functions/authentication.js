export default async function authentication(params) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: params.email,
      password: params.password,
    }),
  };
  const response = await fetch(
    "https://unozar.herokuapp.com/player/authentication",
    requestOptions
  );
  const statusCode = response.status;
  if (statusCode != 200) {
    console.log("Error authentication. Status: " + statusCode);
    return -1;
  } else {
    const data = await response.json();
    console.log("Autentificacion");
    return { id: data.id, token: data.token };
  }
}
