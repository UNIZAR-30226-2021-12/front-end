export default async function refreshToken(token) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token,
    }),
  };
  const response = await fetch(
    "https://unozar.herokuapp.com/player/refreshToken",
    requestOptions
  );
  const statusCode = response.status;
  if (statusCode != 200) {
    console.log("Error refreshToken. Status: " + statusCode);
    return -1;
  } else {
    const data = await response.json();
    console.log("Refresh token");
    return data.token;
  }
}
