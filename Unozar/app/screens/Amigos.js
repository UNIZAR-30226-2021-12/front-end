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
import { Menu } from "primereact/menu";
import CustomText from "../assets/idioma/CustomText.js";
import Cabecera from "../components/Cabecera";

class Amigos extends React.Component {
  constructor(props) {
    super(props);
    const { token } = this.props.route.params;
    const { playerId } = this.props.route.params;
    const { gameId } = this.props.route.params;
    const { invitar } = this.props.route.params;
    const { nombreJugador1 } = this.props.route.params;
    const { español } = this.props.route.params;
    const { CustomTextLocal } = this.props.route.params;
    const { numBots } = this.props.route.params;
    const { maxPlayers } = this.props.route.params;
    this.state = {
      restart: 1,
      playerId: playerId,
      token: token,
      invitar: invitar,
      gameId: gameId,
      nombreJugador1: nombreJugador1,
      friendId: "",
      friendIds: [],
      alias: [],
      emails: [],
      avatarIds: [],
      español: español,
      CustomTextLocal: CustomTextLocal,
      numBots: numBots,
      maxPlayers: maxPlayers,
    };
  }
  addFriend = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: this.state.token,
        friendId: this.state.friendId,
      }),
    };
    let data;
    let response;
    let statusCode;
    response = await fetch(
      "https://unozar.herokuapp.com/player/addFriend",
      requestOptions
    );
    data = await response.json();
    statusCode = response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ token: data.token });
      console.log("Amigo añadido");
      await this.readFriends();
      await this.setState({ restart: this.state.restart + 1 });
      await console.log("token amigos: " + this.state.token);
    }
  };
  readFriends = async () => {
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
      "https://unozar.herokuapp.com/player/readFriends",
      requestOptions
    );
    data = await response.json();
    statusCode = response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ token: data.token });
      await this.setState({ alias: data.alias });
      await this.setState({ emails: data.emails });
      await this.setState({ avatarIds: data.avatarIds });
      await this.setState({ friendIds: data.friendIds });
      await console.log("token amigos: " + this.state.token);
      await console.log(
        "READFRIENDS :[" +
          this.state.token +
          ", " +
          this.state.friendIds +
          ", " +
          this.state.alias +
          ", " +
          this.state.emails +
          ", " +
          this.state.avatarIds +
          "]"
      );
    }
  };
  auxiliar = async () => {
    await this.readFriends();
  };
  verAmigo = async (i) => {
    if (this.state.invitar) {
      console.log("Con amigos");
      this.props.navigation.push("PerfilAmigos", {
        token: this.state.token,
        playerId: this.state.playerId,
        gameId: this.state.gameId,
        invitar: this.state.invitar,
        nombreJugador1: this.state.nombreJugador1,
        idJugadorInvitar: this.state.friendIds[i],
        español: this.state.español,
        CustomTextLocal: this.state.CustomTextLocal,
        numBots: this.state.numBots,
        maxPlayers: this.state.maxPlayers,
      });
    } else {
      this.props.navigation.push("Perfil", {
        token: this.state.token,
        playerId: this.state.playerId,
        gameId: this.state.gameId,
        invitar: this.state.invitar,
        nombreJugador1: this.state.nombreJugador1,
        idJugadorInvitar: this.state.friendIds[i],
        español: this.state.español,
        CustomTextLocal: this.state.CustomTextLocal,
      });
    }
  };
  componentDidMount() {
    console.log("hola");
    console.log("token amigos: " + this.state.token);
    this.auxiliar();
  }
  verListaAmigos = () => {
    let table = [];
    let i = 0;
    //console.log('LOGIN :{['+this.state.token+'], ['+this.state.friendIds+'], ['+this.state.alias+'], ['+this.state.emails+'], ['+this.state.avatarIds+']}')
    for (let aux = 0; aux < this.state.friendIds.length; aux += 2) {
      if (aux + 1 == this.state.friendIds.length) {
        table.push(
          <View style={styles.containerDosAmigos}>
            <TouchableOpacity
              key={i}
              style={styles.cartaTouchable}
              activeOpacity={0.5}
              onPress={() => this.verAmigo(aux)}
            >
              <Image
                key={i}
                style={styles.avatar}
                source={require("../assets/avatares/" +
                  this.state.avatarIds[aux] +
                  ".png")}
              />
            </TouchableOpacity>
            <View key={i + 1} style={styles.containerAmigos}>
              <Text key={-i} style={styles.texto}>
                {" "}
                {this.state.alias[aux]} {this.state.emails[aux]}{" "}
              </Text>
              <Text key={-(i + 1)} style={styles.texto}>
                {" "}
                {this.state.friendIds[aux]}{" "}
              </Text>
            </View>
          </View>
        );
      } else {
        table.push(
          <View style={styles.containerDosAmigos}>
            <TouchableOpacity
              key={i}
              style={styles.cartaTouchable}
              activeOpacity={0.5}
              onPress={() => this.verAmigo(aux)}
            >
              <Image
                key={i}
                style={styles.avatar}
                source={require("../assets/avatares/" +
                  this.state.avatarIds[aux] +
                  ".png")}
              />
            </TouchableOpacity>
            <View key={i + 1} style={styles.containerAmigos}>
              <Text key={-i} style={styles.texto}>
                {" "}
                {this.state.alias[aux]} {this.state.emails[aux]}{" "}
              </Text>
              <Text key={-(i + 1)} style={styles.texto}>
                {" "}
                {this.state.friendIds[aux]}{" "}
              </Text>
            </View>

            <TouchableOpacity
              key={i + 2}
              style={styles.cartaTouchable}
              activeOpacity={0.5}
              onPress={() => this.verAmigo(aux + 1)}
            >
              <Image
                key={i + 2}
                style={styles.avatar}
                source={require("../assets/avatares/" +
                  this.state.avatarIds[aux + 1] +
                  ".png")}
              />
            </TouchableOpacity>
            <View key={i + 3} style={styles.containerAmigos}>
              <Text key={-(i + 2)} style={styles.texto}>
                {" "}
                {this.state.alias[aux + 1]} {this.state.emails[aux + 1]}{" "}
              </Text>
              <Text key={-(i + 3)} style={styles.texto}>
                {" "}
                {this.state.friendIds[aux + 1]}{" "}
              </Text>
            </View>
          </View>
        );
      }
      i += 4;
    }

    return table;
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
            CustomTextLocal: this.state.CustomTextLocal,
          }}
          navigation={this.props.navigation}
        >
          <View style={styles.screen}>
            <View style={styles.square1}>
              <View style={styles.containerLista}>
                <ScrollView>{this.verListaAmigos()}</ScrollView>
              </View>
            </View>
            <View key={this.state.restart} style={styles.buttonAñadir}>
              <TextInput
                style={styles.input}
                placeholder="Id amigo"
                onChangeText={(friendId) => this.setState({ friendId })}
              />
              <Button title="Añadir amigo" onPress={() => this.addFriend()} />
            </View>
          </View>
        </Cabecera>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
  containerLista: {
    width: 1255,
    height: 350,
    flexDirection: "column",
  },
  avatar: {
    resizeMode: "contain",
    height: 150,
    width: 120,
  },
  texto: {
    fontStyle: "Roboto",
    fontSize: 18,
  },
  square1: {
    width: 1260,
    height: 350,
    backgroundColor: "rgba(140, 200, 60, 0.4)",
  },
  containerAmigos: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  containerDosAmigos: {
    flex: 1,
    flexDirection: "row",
  },
  buttonAñadir: {
    top: 50,
    width: "30%",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 25,
    padding: 10,
    width: "100%",
  },
  menu: {
    position: "absolute",
    top: 20,
    left: 1200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default Amigos;
