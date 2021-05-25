export default async function deleteHandler(token) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  };
  const response = await fetch(
    "https://unozar.herokuapp.com/player/delete",
    requestOptions
  );
  const statusCode = response.status;
  if (statusCode != 200) {
    console.log("Error deletePlayer. Status: " + statusCode);
    return -1;
  } else {
    console.log("Usuario eliminado");
    return 0;
  }
}
