export default async function readPlayer(id) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      playerId: id,
    }),
  };
  const response = await fetch(
    "https://unozar.herokuapp.com/player/read",
    requestOptions
  );
  const statusCode = response.status;
  if (statusCode != 200) {
    console.log("Error readPlayer. Status: " + statusCode);
    return -1;
  }else if (statusCode == 410 ){
	console.log('LOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLLOLOL')
  }	  else {
    const data = await response.json();
    console.log("lectura perfil");
    return data;
  }
}
