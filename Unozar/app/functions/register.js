export default async function register(params) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: params.email,
      alias: params.alias,
      password: params.password,
    }),
  };
  const response = await fetch(
    "https://unozar.herokuapp.com/player/create",
    requestOptions
  );
  const statusCode = response.status;
  if (statusCode != 200) {
    console.log("Error register. Status: " + statusCode);
    return -1;
  } else {
    const data = await response.json();
    console.log("Register");
    return data;
  }
}
