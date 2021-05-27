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
class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.Cabecera = React.createRef();
    this.state = {
      show: false,
      token: this.props.route.params.token,
      playerId: this.props.route.params.playerId,
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
    const data = await readPlayer(this.state.playerId);

    this.setState({ avatarId: data.avatarId });
    this.setState({ avatarId: data.boardId });
    this.setState({ avatarId: data.cardsId });
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
    console.log("playerId: " + this.state.playerId);
    console.log("token: " + this.state.token);
    this.readHandler();
  }

  desbloquearAvatar = async (i) => {
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
          onPress={() => this.desbloquearAvatar(i)}
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
          onPress={() => this.desbloquearTablero(i)}
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
          onPress={() => this.desbloquearDorso(i)}
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
            playerId: this.state.playerId,
            español: this.state.español,
          }}
          navigation={this.props.navigation}
          updateParent={this.changeLanguage}
        >
          <View style={styles.screen}>
            {(this.state.español && (
              <Text style={styles.textTitulo}>TIENDA</Text>
            )) || <Text style={styles.textTitulo}>SHOP</Text>}
            <Text style={styles.textTitulo}>{this.state.money}</Text>
            <View style={styles.avatar_desbloqueables}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatarPerfil}
                  source={require("../assets/avatares/" +
                    this.state.avatarId +
                    ".png")}
                />
                {(this.state.español && (
                  <Text style={styles.textAvatar}>Avatar actual</Text>
                )) || <Text style={styles.textAvatar}>Current avatar</Text>}
                <Image
                  style={styles.dorsoPerfil}
                  source={require("../assets/dorsos/" +
                    this.state.cardsId +
                    ".png")}
                />
                {(this.state.español && (
                  <Text style={styles.textAvatar}>Dorso actual</Text>
                )) || <Text style={styles.textAvatar}>Current card back</Text>}
                <Image
                  style={styles.tableroPerfil}
                  source={require("../assets/tableros/" +
                    this.state.boardId +
                    ".png")}
                />
                {(this.state.español && (
                  <Text style={styles.textAvatar}>Tablero actual</Text>
                )) || <Text style={styles.textAvatar}>Current board</Text>}
              </View>
              <View style={styles.containerDesbloqueables}>
                <View>
                  {this.state.unlockedAvatars.length != 4 && (
                    <>
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
                        <ScrollView horizontal>{this.verAvatares()}</ScrollView>
                      </View>
                    </>
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
                        <ScrollView horizontal>{this.verTableros()}</ScrollView>
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
                        <ScrollView horizontal>{this.verDorsos()}</ScrollView>
                      </View>
                    </>
                  )}
                </View>
                <Button title="Añadir Dinero" onPress={() => this.addMoney()} />
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
    alignSelf: "left",
    fontStyle: "Roboto",
    fontSize: 18,
  },
  textTitulo: {
    fontStyle: "Roboto",
    fontSize: 24,
  },
  avatarContainer: {
    alignSelf: "left",
    width: "30%",
  },
  menu: {
    position: "absolute",
    top: 20,
    left: 1200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  avatarPerfil: {
    alignSelf: "left",
    height: 141,
    width: 134,
    resizeMode: "contain",
  },
  dorsoPerfil: {
    alignSelf: "left",
    resizeMode: "contain",
    height: 150,
    width: 120,
  },
  tableroPerfil: {
    alignSelf: "left",
    resizeMode: "contain",
    height: 140,
    width: 200,
  },
  avatarLista: {
    flex: 1,
    height: 141,
    width: 134,
    resizeMode: "contain",
  },
  touchable: {
    flex: 1,
  },
  containerListaAvatares: {
    width: 1000,
  },
  avatar_desbloqueables: {
    flexDirection: "row",
  },
  containerDesbloqueables: {
    flexDirection: "column",
  },
  containerListaTableros: {
    width: 1000,
  },
  containerListaDorsos: {
    width: 1000,
  },
  tableroLista: {
    flex: 1,
    height: 140,
    width: 200,
    resizeMode: "contain",
  },
  dorsoLista: {
    flex: 1,
    height: 120,
    width: 90,
    resizeMode: "contain",
  },
});

export default Perfil;
