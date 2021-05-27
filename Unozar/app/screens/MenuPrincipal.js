import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  Timer,
} from "react-native";
import Cabecera from "../components/Cabecera";
import readPlayer from "../functions/readPlayer";
import refreshToken from "../functions/refreshToken";

export default class MenuPrincipal extends Component {
  constructor(props) {
    super(props);
    this.Cabecera = React.createRef();
    this.state = {
      show1: false,
      show2: false,
      show3: false,
      isprivate: false,
      maxPlayers: 2,
      numBots: 0,
      alias: null,
      password: null,
      email: null,
      miId: this.props.route.params.miId,
      token: this.props.route.params.token,
      gameId: "",
      gameStarted: false,
      playersIds: [],
      gift: "",
      giftClaimedToday: false,
      español: this.props.route.params.español,
      bet: 0,
    };
  }
  componentDidMount() {
    console.log(this.state.miId);
    this.readHandler();
    this.refreshHandler();
    //let timer = setInterval(() => alert("aux"), 3000);
  }
  refreshHandler = async () => {
    const token = await refreshToken(this.state.token);
    if (token !== -1) {
      this.setState({ token: token });
      this.Cabecera.current.updateToken(token);
    } else {
      alert(
        (this.state.español && "Su sesion ha expirado") ||
          "Your session has expired"
      );
      this.props.navigation.navigate("Inicio", {
        español: this.state.español,
      });
    }
  };
  readHandler = async () => {
    const data = await readPlayer(this.state.miId);
    if (data !== -1) {
      this.setState({ giftClaimedToday: data.giftClaimedToday });
      if (!this.state.giftClaimedToday) {
        this.ruleta();
      }
    }
  };
  crearPartida = async () => {
    if (!(this.state.bet >= 0)) {
      alert("La apuesta no es un valor numérico");
      return;
    } else if (this.state.numBots >= this.state.maxPlayers) {
      alert("Al menos tiene que haber un jugador no bot en partida");
      return;
    } else if (this.state.numBots > 0 && !this.state.isprivate) {
      alert("No puedes añadir bots a una partida privada");
      return;
    } else if (this.state.isprivate && this.state.bet > 0) {
      // ??????????????????
      alert("No puedes añadir apuesta a una partida privada");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isPrivate: this.state.isprivate,
        maxPlayers: this.state.maxPlayers,
        numBots: this.state.numBots,
        token: this.state.token,
        bet: this.state.bet,
      }),
    };
    let data;
    let response;
    response = await fetch(
      "https://unozar.herokuapp.com/game/create",
      requestOptions
    );
    data = await response.json();
    await this.setState({ token: data.token });
    await console.log("entrado " + this.state.token);
    if (this.state.maxPlayers - this.state.numBots != this.state.maxPlayers) {
      const requestOptions1 = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: this.state.token,
        }),
      };
      response = await fetch(
        "https://unozar.herokuapp.com/game/start",
        requestOptions1
      );
      data = await response.json();
      await this.setState({ token: data.token });
      await console.log("start " + this.state.token);
      this.props.navigation.push("Partida", {
        token: this.state.token,
        miId: this.state.miId,
        español: this.state.español,
      });
    } else {
      this.props.navigation.push("EsperaPartida", {
        token: this.state.token,
        miId: this.state.miId,
        numBots: this.state.numBots,
        español: this.state.español,
        maxPlayers: this.state.maxPlayers,
      });
    }
  };

  joinPartida = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: this.state.gameId,
        token: this.state.token,
      }),
    };
    console.log("GAME ID PRIVATE: " + this.state.gameId);
    let data;
    let response;
    await console.log("intentando entrar " + this.state.token);
    response = await fetch(
      "https://unozar.herokuapp.com/game/joinPrivate",
      requestOptions
    );
    data = await response.json();
    await this.setState({ token: data.token });
    await console.log("joineado " + this.state.token);
    await this.props.navigation.push("EsperaPartida", {
      token: this.state.token,
      miId: this.state.miId,
      numBots: this.state.numBots,
      español: this.state.español,
    });
  };
  joinPartidaPublica = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numPlayers: this.state.maxPlayers,
        token: this.state.token,
      }),
    };
    console.log("GAME ID: PUBLIC");
    let data;
    let response;
    await console.log("intentando entrar " + this.state.token);
    response = await fetch(
      "https://unozar.herokuapp.com/game/joinPublic",
      requestOptions
    );
    data = await response.json();
    await this.setState({ token: data.token });
    await console.log("joineado " + this.state.token);
    await this.props.navigation.push("EsperaPartida", {
      token: this.state.token,
      miId: this.state.miId,
    });
  };
  salirHandler = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: this.state.token,
      }),
    };
    let data;
    const response = await fetch(
      "https://unozar.herokuapp.com/game/quit",
      requestOptions
    );
    data = await response.json();
    await this.setState({ token: data.token });
    console.log("salido");
  };
  ruleta = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: this.state.token,
      }),
    };
    let data;
    let response;
    let statusCode;
    response = await fetch(
      "https://unozar.herokuapp.com/player/getDailyGift",
      requestOptions
    );
    data = await response.json();
    statusCode = response.status;
    if ((await statusCode) != 200) {
      console.log("Error ruleta");
    } else {
      await this.setState({ gift: data.gift });
      await this.setState({ token: data.token });
      await alert("Has ganado " + this.state.gift + " monedas");
    }
  };

  changeLanguage = () => {
    this.setState({ español: !this.state.español });
  };

  render() {
    return (
      <>
        <View style={styles.screen}>
          <Cabecera
            ref={this.Cabecera}
            style={{ position: "absolute" }}
            params={{
              token: this.state.token,
              miId: this.state.miId,
              español: this.state.español,
            }}
            navigation={this.props.navigation}
            updateParent={this.changeLanguage}
          >
            <View style={styles.tituloContainer}>
              {(this.state.español && (
                <Text style={styles.titulo}>
                  {"    "}MENU PRINCIPAL{"    "}
                </Text>
              )) || (
                <Text style={styles.titulo}>
                  {"    "}MAIN MENU{"    "}
                </Text>
              )}
            </View>
            <View style={styles.joincrear}>
              <View style={styles.joins}>
                <View style={{ flex: 1 }}>
                  {(this.state.español && (
                    <Text style={styles.titulo2}>
                      Unirse a partida con código
                    </Text>
                  )) || (
                    <Text style={styles.titulo2}>Join a game with code</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder={
                      (this.state.español && "Código partida") || "Game code"
                    }
                    onChangeText={(gameId) => this.setState({ gameId })}
                  />
                  <View style={{ width: "50%", alignSelf: "center" }}>
                    <Button
                      title={
                        (this.state.español && "Entrar a partida") ||
                        "Join game"
                      }
                      onPress={() => this.joinPartida()}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  {(this.state.español && (
                    <Text style={styles.titulo2}>Unirse a partida pública</Text>
                  )) || <Text style={styles.titulo2}>Join a public game</Text>}
                  <View style={{ width: "50%", alignSelf: "center" }}>
                    <Button
                      title={
                        (this.state.español && "Entrar a partida") ||
                        "Join game"
                      }
                      onPress={() => this.joinPartida()}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, alignSelf: "center", width: "100%" }}>
                {(this.state.español && (
                  <Text style={styles.titulo3}>Crear partida</Text>
                )) || <Text style={styles.titulo3}>Create game</Text>}

                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    width: "40%",
                  }}
                >
                  {(this.state.español && (
                    <Text
                      style={{ fontStyle: "Roboto", fontSize: 15, flex: 1 }}
                    >
                      Jugadores totales:{" "}
                    </Text>
                  )) || (
                    <Text
                      style={{ fontStyle: "Roboto", fontSize: 15, flex: 1 }}
                    >
                      Total players:{" "}
                    </Text>
                  )}

                  {(this.state.maxPlayers > 2 && (
                    <View style={{ flex: 1 }}>
                      <Button
                        title="-"
                        onPress={() => {
                          if (
                            this.state.numBots ===
                            this.state.maxPlayers - 1
                          ) {
                            this.setState({
                              numBots: this.state.numBots - 1,
                            });
                          }
                          this.setState({
                            maxPlayers: this.state.maxPlayers - 1,
                          });
                        }}
                      />
                    </View>
                  )) || (
                    <View style={{ flex: 1 }}>
                      <Button title="-" disabled={true} />
                    </View>
                  )}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontStyle: "Roboto",
                        fontSize: 15,
                      }}
                    >
                      {this.state.maxPlayers}
                    </Text>
                  </View>

                  {(this.state.maxPlayers < 4 && (
                    <View style={{ flex: 1 }}>
                      <Button
                        title="+"
                        onPress={() =>
                          this.setState({
                            maxPlayers: this.state.maxPlayers + 1,
                          })
                        }
                      />
                    </View>
                  )) || (
                    <View style={{ flex: 1 }}>
                      <Button title="+" disabled={true} />
                    </View>
                  )}
                </View>

                {this.state.isprivate && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      width: "40%",
                    }}
                  >
                    {(this.state.español && (
                      <Text
                        style={{ fontStyle: "Roboto", fontSize: 15, flex: 1 }}
                      >
                        Numero de bots:{" "}
                      </Text>
                    )) || (
                      <Text
                        style={{ fontStyle: "Roboto", fontSize: 15, flex: 1 }}
                      >
                        Number of bots:{" "}
                      </Text>
                    )}

                    {(this.state.numBots > 0 && (
                      <View style={{ flex: 1 }}>
                        <Button
                          title="-"
                          onPress={() =>
                            this.setState({ numBots: this.state.numBots - 1 })
                          }
                        />
                      </View>
                    )) || (
                      <View style={{ flex: 1 }}>
                        <Button title="-" disabled={true} />
                      </View>
                    )}
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontStyle: "Roboto",
                          fontSize: 15,
                        }}
                      >
                        {this.state.numBots}
                      </Text>
                    </View>

                    {(this.state.numBots < this.state.maxPlayers - 1 && (
                      <View style={{ flex: 1 }}>
                        <Button
                          title="+"
                          onPress={() =>
                            this.setState({ numBots: this.state.numBots + 1 })
                          }
                        />
                      </View>
                    )) || (
                      <View style={{ flex: 1 }}>
                        <Button title="+" disabled={true} />
                      </View>
                    )}
                  </View>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    width: "40%",
                    marginTop: 10,
                  }}
                >
                  <View style={{ flex: 3 }}>
                    <Button
                      title={
                        (this.state.español &&
                          ((this.state.isprivate && "Hacer pública") ||
                            "Hacer privada")) ||
                        (this.state.isprivate && "Make public") ||
                        "Make private"
                      }
                      onPress={() =>
                        this.setState({ isprivate: !this.state.isprivate })
                      }
                    />
                  </View>
                  <Text style={{ fontStyle: "Roboto", fontSize: 15, flex: 1 }}>
                    {" "}
                    {(this.state.español &&
                      ((this.state.isprivate && "Partida privada") ||
                        "Partida pública")) ||
                      (this.state.isprivate && "Private game") ||
                      "Public game"}
                  </Text>
                </View>

                {!this.state.isprivate && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      width: "40%",
                      marginTop: 10,
                    }}
                  >
                    {(this.state.español && (
                      <Text
                        style={{ fontStyle: "Roboto", fontSize: 15, flex: 1 }}
                      >
                        Apuesta:{" "}
                      </Text>
                    )) || (
                      <Text
                        style={{ fontStyle: "Roboto", fontSize: 15, flex: 1 }}
                      >
                        Bet:{" "}
                      </Text>
                    )}
                    <TextInput
                      style={{
                        borderColor: "black",
                        borderWidth: 1,
                        flex: 3,
                      }}
                      placeholder={
                        (this.state.español && "Cantidad a apostar") ||
                        "Amount to bet"
                      }
                      onChangeText={(bet) => this.setState({ bet })}
                    />
                  </View>
                )}
                <View
                  style={{ width: "40%", alignSelf: "center", marginTop: 10 }}
                >
                  <Button
                    title={
                      (this.state.español && "Crear Partida") || "Create game"
                    }
                    onPress={() => this.crearPartida()}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: "10%", marginTop: 40, alignSelf: "center" }}>
              <Button title="Salir Juego" onPress={() => this.salirHandler()} />
            </View>
          </Cabecera>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: { backgroundColor: "#ffffff", flex: 1 },
  menu: {
    position: "absolute",
    top: 20,
    left: 1200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  tituloContainer: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "30%",
    marginTop: 15,
    marginBottom: 20,
  },
  titulo: {
    fontStyle: "Roboto",
    fontSize: 30,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    color: "white",
    backgroundColor: "#2196F3",
    fontWeight: "Bold",
  },
  titulo2: {
    fontStyle: "Roboto",
    fontSize: 21,
    alignSelf: "center",
  },
  titulo3: {
    fontStyle: "Roboto",
    fontSize: 21,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  buttonMas1: {
    alignSelf: "center",
    width: "30%",
  },
  joins: {
    flex: 1,
    flexDirection: "row",
  },
  joinCrear: {
    flex: 1,
    flexDirection: "column",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 25,
    padding: 10,
    width: "50%",
    alignSelf: "center",
  },
});
