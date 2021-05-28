import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Cabecera from "../components/Cabecera";
import readPlayer from "../functions/readPlayer";
import refreshToken from "../functions/refreshToken";

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.Cabecera = React.createRef();
    this.state = {
      show: false,
      token: this.props.route.params.token,
      miId: this.props.route.params.miId,
      avatarId: "0",
      boardId: "0",
      cardsId: "0",
      avatares: [],
      tableros: [],
      dorsos: [],
      restart: 0,
      money: 0,
      unlockedAvatars: [],
      unlockedBoards: [],
      unlockedCards: [],
      español: this.props.route.params.español,
    };
  }

  readHandler = async () => {
    await this.refreshHandler();
    const data = await readPlayer(this.state.miId);

    this.setState({ avatarId: data.avatarId });
    this.setState({ boardId: data.boardId });
    this.setState({ cardsId: data.cardsId });
    this.setState({ money: data.money });
    this.setState({ unlockedAvatars: data.unlockedAvatars });
    this.setState({ unlockedBoards: data.unlockedBoards });
    this.setState({ unlockedCards: data.unlockedCards });
    console.log("avatares: " + this.state.unlockedAvatars);
    let igual = false;
    for (let i = 0; i < 5; i++) {
      if (i != 1) {
        for (let j = 0; j < this.state.unlockedAvatars.length; j++) {
          if (this.state.unlockedAvatars[j] == i) {
            igual = true;
            break;
          }
        }
        if (!igual) {
          this.state.avatares.push(i);
        }
        igual = false;
      }
    }
    igual = false;
    await console.log("tableros: " + this.state.unlockedBoards);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < this.state.unlockedBoards.length; j++) {
        if (this.state.unlockedBoards[j] == i) {
          igual = true;
          break;
        }
      }
      if (!igual) {
        this.state.tableros.push(i);
      }
      igual = false;
    }
    igual = false;
    await console.log("dorsos: " + this.state.unlockedCards);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < this.state.unlockedCards.length; j++) {
        if (this.state.unlockedCards[j] == i) {
          igual = true;
          break;
        }
      }
      if (!igual) {
        this.state.dorsos.push(i);
      }
      igual = false;
    }
    await console.log("avatares: " + this.state.avatares);
    await console.log("tableros: " + this.state.tableros);
    await console.log("dorsos: " + this.state.dorsos);
    await this.setState({ restart: this.state.restart + 1 });
  };
  componentDidMount() {
    console.log("miId: " + this.state.miId);
    console.log("token: " + this.state.token);
    this.readHandler();
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
  desbloquearAvatar = async (i) => {
    await this.refreshHandler();
    const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unlockableId: this.state.avatares[i],
        token: this.state.token,
      }),
    };
    console.log("avatar i: " + i);
    if (this.state.money < 250) {
      alert(
        (this.state.español && "No tienes suficiente dinero") ||
          "You don't have enough money"
      );
      return;
    }
    let data;
    let response;
    let statusCode;
    response = await fetch(
      "https://unozar.herokuapp.com/player/unlockAvatar",
      requestOptions1
    );
    data = await response.json();
    statusCode = await response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ token: data.token });
      await this.setState({ avatares: [] });
      await this.setState({ tableros: [] });
      await this.setState({ dorsos: [] });
      await this.readHandler();
      await this.setState({ restart: this.state.restart + 1 });
      this.Cabecera.current.updateToken(data.token);
    }
  };
  desbloquearDorso = async (i) => {
    await this.refreshHandler();
    const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unlockableId: this.state.dorsos[i],
        token: this.state.token,
      }),
    };
    console.log("dorso id:" + this.state.dorsos[i]);
    if (this.state.money < 750) {
      alert(
        (this.state.español && "No tienes suficiente dinero") ||
          "You don't have enough money"
      );
      return;
    }
    let data;
    let response;
    let statusCode;
    response = await fetch(
      "https://unozar.herokuapp.com/player/unlockCards",
      requestOptions1
    );
    data = await response.json();
    statusCode = await response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ token: data.token });
      await this.setState({ avatares: [] });
      await this.setState({ tableros: [] });
      await this.setState({ dorsos: [] });
      await this.readHandler();
      await this.setState({ restart: this.state.restart + 1 });
      this.Cabecera.current.updateToken(data.token);
    }
  };
  desbloquearTablero = async (i) => {
    await this.refreshHandler();
    const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unlockableId: this.state.tableros[i],
        token: this.state.token,
      }),
    };
    console.log("tablero id:" + this.state.tableros[i]);
    if (this.state.money < 500) {
      alert(
        (this.state.español && "No tienes suficiente dinero") ||
          "You don't have enough money"
      );
      return;
    }
    let data;
    let response;
    let statusCode;
    response = await fetch(
      "https://unozar.herokuapp.com/player/unlockBoard",
      requestOptions1
    );
    data = await response.json();
    statusCode = await response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ token: data.token });
      await this.setState({ avatares: [] });
      await this.setState({ tableros: [] });
      await this.setState({ dorsos: [] });
      await this.readHandler();
      await this.setState({ restart: this.state.restart + 1 });
      this.Cabecera.current.updateToken(data.token);
    }
  };
  addMoney = async () => {
    await this.refreshHandler();
    const requestOptions1 = {
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
      "https://unozar.herokuapp.com/player/addMoney",
      requestOptions1
    );
    await this.setState({ avatares: [] });
    await this.setState({ tableros: [] });
    await this.setState({ dorsos: [] });
    await this.readHandler();
    await this.setState({ restart: this.state.restart + 1 });
  };
  verAvatares = () => {
    let table = [];
    for (let i = 0; i < this.state.avatares.length; i++) {
      table.push(
        <TouchableOpacity
          key={i}
          style={styles.touchable}
          activeOpacity={0.5}
          onPress={() => {
            if (
              window.confirm(
                (this.state.español &&
                  "¿Desea comprar este avatar por 250 monedas?") ||
                  "Do you wish to buy this avatar for 250 coins?"
              )
            ) {
              this.desbloquearAvatar(i);
            }
          }}
        >
          <Image
            key={i}
            style={styles.avatarLista}
            source={require("../assets/avatares/" +
              this.state.avatares[i] +
              ".png")}
          />
        </TouchableOpacity>
      );
    }
    return table;
  };
  verTableros = () => {
    let table = [];
    for (let i = 0; i < this.state.tableros.length; i++) {
      table.push(
        <TouchableOpacity
          key={i}
          style={styles.touchable}
          activeOpacity={0.5}
          onPress={() => {
            if (
              window.confirm(
                (this.state.español &&
                  "¿Desea comprar este tablero por 500 monedas?") ||
                  "Do you wish to buy this board for 500 coins?"
              )
            ) {
              this.desbloquearTablero(i);
            }
          }}
        >
          <Image
            key={i}
            style={styles.tableroLista}
            source={require("../assets/tableros/" +
              this.state.tableros[i] +
              ".png")}
          />
        </TouchableOpacity>
      );
    }
    return table;
  };
  verDorsos = () => {
    let table = [];
    for (let i = 0; i < this.state.dorsos.length; i++) {
      table.push(
        <TouchableOpacity
          key={i}
          style={styles.touchable}
          activeOpacity={0.5}
          onPress={() => {
            if (
              window.confirm(
                (this.state.español &&
                  "¿Desea comprar este reverso de carta por 750 monedas?") ||
                  "Do you wish to buy this card back for 750 coins?"
              )
            ) {
              this.desbloquearDorso(i);
            }
          }}
        >
          <Image
            key={i}
            style={styles.dorsoLista}
            source={require("../assets/dorsos/" +
              this.state.dorsos[i] +
              ".png")}
          />
        </TouchableOpacity>
      );
    }
    return table;
  };

  changeLanguage = () => {
    this.setState({ español: !this.state.español });
  };

  render() {
    return (
      <>
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
          <View style={styles.screen}>
            {(this.state.español && (
              <Text style={styles.textTitulo}>TIENDA</Text>
            )) || <Text style={styles.textTitulo}>SHOP</Text>}
            {(this.state.español && (
              <Text style={styles.textTitulo}>Dinero: {this.state.money}</Text>
            )) || (
              <Text style={styles.textTitulo}>Dinero: {this.state.money}</Text>
            )}
            <View style={styles.avatar_desbloqueables}>
              <View style={styles.avatarContainer}>
                {(this.state.español && (
                  <Text style={styles.textAvatar}>Avatar actual</Text>
                )) || <Text style={styles.textAvatar}>Current avatar</Text>}
                <Image
                  style={styles.avatarPerfil}
                  source={require("../assets/avatares/" +
                    this.state.avatarId +
                    ".png")}
                />
                {(this.state.español && (
                  <Text style={styles.textAvatar}>Tablero actual</Text>
                )) || <Text style={styles.textAvatar}>Current board</Text>}
                <Image
                  style={styles.tableroPerfil}
                  source={require("../assets/tableros/" +
                    this.state.boardId +
                    ".png")}
                />
                {(this.state.español && (
                  <Text style={styles.textAvatar}>Dorso actual</Text>
                )) || <Text style={styles.textAvatar}>Current card back</Text>}
                <Image
                  style={styles.dorsoPerfil}
                  source={require("../assets/dorsos/" +
                    this.state.cardsId +
                    ".png")}
                />
              </View>
              <View style={styles.containerDesbloqueables}>
                <View>
                  {this.state.unlockedAvatars.length != 4 && (
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      {(this.state.español && (
                        <Text style={styles.textAvatar}>
                          Avatares desbloqueables (250 monedas)
                        </Text>
                      )) || (
                        <Text style={styles.textAvatar}>
                          Unlockable avatars (250 coins)
                        </Text>
                      )}
                      <View
                        key={this.state.restart}
                        style={styles.containerListaAvatares}
                      >
                        <ScrollView style={{ alignSelf: "center" }} horizontal>
                          {this.verAvatares()}
                        </ScrollView>
                      </View>
                    </View>
                  )}
                </View>
                <View>
                  {this.state.unlockedBoards.length != 3 && (
                    <>
                      {(this.state.español && (
                        <Text style={styles.textAvatar}>
                          Tableros desbloqueables (500 monedas)
                        </Text>
                      )) || (
                        <Text style={styles.textAvatar}>
                          Unlockable boards (500 coins)
                        </Text>
                      )}
                      <View
                        key={this.state.restart}
                        style={styles.containerListaTableros}
                      >
                        <ScrollView style={{ alignSelf: "center" }} horizontal>
                          {this.verTableros()}
                        </ScrollView>
                      </View>
                    </>
                  )}
                </View>
                <View>
                  {this.state.unlockedCards.length != 5 && (
                    <>
                      {(this.state.español && (
                        <Text style={styles.textAvatar}>
                          Dorsos desbloqueables (750 monedas)
                        </Text>
                      )) || (
                        <Text style={styles.textAvatar}>
                          Unlockable card backs (750 coins)
                        </Text>
                      )}
                      <View
                        key={this.state.restart}
                        style={styles.containerListaDorsos}
                      >
                        <ScrollView style={{ alignSelf: "center" }} horizontal>
                          {this.verDorsos()}
                        </ScrollView>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Cabecera>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
  textAvatar: {
    alignSelf: "center",
    fontStyle: "Roboto",
    fontSize: 18,
    marginTop: 15,
  },
  textTitulo: {
    fontStyle: "Roboto",
    fontSize: 24,
  },
  avatarContainer: {
    alignSelf: "center",
    width: "30%",
    alignSelf: "center",
  },
  menu: {
    position: "absolute",
    top: 20,
    left: 1200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  avatarPerfil: {
    alignSelf: "center",
    height: 141,
    width: 134,
    resizeMode: "contain",
  },
  dorsoPerfil: {
    alignSelf: "center",
    resizeMode: "contain",
    height: 150,
    width: 120,
  },
  tableroPerfil: {
    alignSelf: "center",
    resizeMode: "contain",
    height: 140,
    width: 200,
  },
  avatarLista: {
    flex: 1,
    height: 141,
    width: 134,
    resizeMode: "contain",
    alignSelf: "center",
  },
  touchable: {
    flex: 1,
    padding: 10,
  },
  containerListaAvatares: {
    width: 1000,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  avatar_desbloqueables: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  containerDesbloqueables: {
    flexDirection: "column",
    alignContent: "center",
  },
  containerListaTableros: {
    width: 1000,
    alignSelf: "center",
    alignContent: "center",
  },
  containerListaDorsos: {
    width: 1000,
    alignSelf: "center",
    alignContent: "center",
  },
  tableroLista: {
    flex: 1,
    height: 140,
    width: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  dorsoLista: {
    flex: 1,
    height: 120,
    width: 90,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default Perfil;
