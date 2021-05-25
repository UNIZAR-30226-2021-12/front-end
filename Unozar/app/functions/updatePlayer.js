export default async function updatePlayer(params) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: params.token,
      alias: params.alias,
      email: params.email,
      password: params.password,
      avatarId: params.avatarId,
      boardId: params.boardId,
      cardsId: params.cardsId,
    }),
  };
  const response = await fetch(
    "https://unozar.herokuapp.com/player/update",
    requestOptions
  );
  const statusCode = response.status;
  if (statusCode != 200) {
    console.log("Error updatePlayer. Status: " + statusCode);
    return -1;
  } else {
    const data = await response.json();
    console.log("Usuario actualizado");
    return data.token;
  }
}
