import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Menu } from "primereact/menu";
import { withNavigation } from "react-navigation";
import Cabecera from "../components/Cabecera";
import readPlayer from "../functions/readPlayer";
import deletePlayer from "../functions/deletePlayer";
import refreshToken from "../functions/refreshToken";

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      español: this.props.route.params.español,
      CustomTextLocal: this.props.route.params.CustomTextLocal,
      token: this.props.route.params.token,
      alias: "",
      email: "",
      id: this.props.route.params.id,
      publicTotal: 0,
      publicWins: 0,
      privateTotal: 0,
      privateWins: 0,
      avatarId: 0,
      boardId: 0,
      cardsId: 0,
      money: 0,
      unlockedAvatars: [],
      unlockedBoards: [],
      unlockedCards: [],
    };
  }

  deleteHandler = async () => {
    const status = await deletePlayer(this.state.token);
    if (status !== -1) {
      this.props.navigation.navigate("Inicio", {
        español: this.state.español,
        CustomTextLocal: this.state.CustomTextLocal,
      });
    }
  };

  readHandler = async () => {
    const data = await readPlayer(this.state.id);
    if (data !== -1) {
      this.setState({ alias: data.alias });
      this.setState({ email: data.email });
      this.setState({ id: data.id });
      this.setState({ publicTotal: data.publicTotal });
      this.setState({ publicWins: data.publicWins });
      this.setState({ privateTotal: data.privateTotal });
      this.setState({ privateWins: data.privateWins });
      this.setState({ avatarId: data.avatarId });
      this.setState({ boardId: data.boardId });
      this.setState({ cardsId: data.cardsId });
      this.setState({ money: data.money });
      this.setState({ unlockedAvatars: data.unlockedAvatars });
      this.setState({ unlockedBoards: data.unlockedBoards });
      this.setState({ unlockedCards: data.unlockedCards });
    }
  };

  refreshHandler = async () => {
    const token = await refreshToken(this.state.token);
    if (token !== -1) {
      this.setState({ token: token });
    } else {
      alert("Su sesion ha expirado");
      this.props.navigation.navigate("Inicio", {
        español: this.state.español,
        CustomTextLocal: this.state.CustomTextLocal,
      });
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      console.log("hola");
      this.readHandler();
      this.refreshHandler();
    });
  }

  componentDIdUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={styles.screen}>
        <Cabecera
          params={{
            token: this.state.token,
            playerId: this.state.id,
            español: this.state.español,
            CustomTextLocal: this.state.CustomTextLocal,
          }}
          navigation={this.props.navigation}
        >
          <View style={styles.body}>
            <View style={styles.formContainer}>
              <View style={styles.tituloView}>
                <Text style={styles.titulo}>Perfil</Text>
              </View>

              <Image
                style={styles.avatar}
                source={require("../assets/avatares/" +
                  this.state.avatarId +
                  ".png")}
              />
              <Text style={styles.textoCampos}>
                {" "}
                Alias:{" "}
                <Text style={styles.textoInterior}>{this.state.alias}</Text>
              </Text>
              <Text style={styles.textoCampos}>
                {" "}
                Correo:{" "}
                <Text style={styles.textoInterior}>{this.state.email}</Text>
              </Text>
              <Text style={styles.textoCampos}>
                {" "}
                Id: <Text style={styles.textoInterior}>
                  {this.state.id}
                </Text>{" "}
              </Text>
              <Text style={styles.textoCampos}>
                {" "}
                Partidas publicas jugadas:{" "}
                <Text style={styles.textoInterior}>
                  {this.state.publicTotal}
                </Text>
              </Text>
              <Text style={styles.textoCampos}>
                {" "}
                Partidas publicas ganadas:{" "}
                <Text style={styles.textoInterior}>
                  {this.state.publicWins}
                </Text>
              </Text>
              <Text style={styles.textoCampos}>
                {" "}
                Partidas privadas jugadas:{" "}
                <Text style={styles.textoInterior}>
                  {this.state.privateTotal}
                </Text>
              </Text>
              <Text style={styles.textoCampos}>
                {" "}
                Partidas privadas ganadas:{" "}
                <Text style={styles.textoInterior}>
                  {this.state.privateWins}
                </Text>
              </Text>
              <View style={styles.customsContainer}>
                {/*------------------------------------------------------------------ */}
              </View>
              <View style={styles.botonEditar}>
                <Button
                  title="Editar perfil"
                  onPress={() =>
                    this.props.navigation.push("EditarUsuario", this.state)
                  }
                />
              </View>
              <View style={styles.botonEditar}>
                <Button
                  title="Cambiar contraseña"
                  onPress={() =>
                    this.props.navigation.push("CambiarContrasenya", this.state)
                  }
                />
              </View>
              <View style={styles.botonEliminar}>
                <Button
                  title="Eliminar cuenta"
                  color="red"
                  onPress={() => {
                    if (
                      window.confirm(
                        "Esta a punto de eliminar su cuenta, ¿Seguro que desea continuar?"
                      )
                    )
                      this.deleteHandler();
                  }}
                />
              </View>
            </View>
          </View>
        </Cabecera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#b6eb5f",
    flex: 1,
  },
  body: {
    padding: 50,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  titulo: {
    right: 20,
    fontSize: 50,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    color: "#0800ff",
  },
  tituloView: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "Cochin",
    fontWeight: "Bold",
  },
  avatar: {
    resizeMode: "contain",
    alignSelf: "center",
    height: 150,
    width: 120,
  },
  textoCampos: {
    fontWeight: "bold",
  },
  textoInterior: { fontWeight: "normal" },
  botonEditar: {
    marginTop: 10,
  },
  customsContainer: {
    flexDirection: "row",
  },
  botonEliminar: {
    marginTop: 10,
    color: "red",
  },
});

export default Perfil;
