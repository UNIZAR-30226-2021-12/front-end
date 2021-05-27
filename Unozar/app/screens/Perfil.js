import React from "react";
import { Button, StyleSheet, View, Text, Image } from "react-native";
import Cabecera from "../components/Cabecera";
import readPlayer from "../functions/readPlayer";
import deletePlayer from "../functions/deletePlayer";
import refreshToken from "../functions/refreshToken";

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.Cabecera = React.createRef();
    this.state = {
      español: this.props.route.params.español,
      token: this.props.route.params.token,
      alias: "",
      email: "",
      playerId: this.props.route.params.playerId,
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
      });
    }
  };

  readHandler = async () => {
    const data = await readPlayer(this.state.playerId);
    if (data !== -1) {
      this.setState({ alias: data.alias });
      this.setState({ email: data.email });
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

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      this.readHandler();
      this.refreshHandler();
    });
  }

  componentDIdUnmount() {
    this.focusListener.remove();
  }

  changeLanguage = () => {
    this.setState({ español: !this.state.español });
  };

  render() {
    return (
      <View style={styles.screen}>
        <Cabecera
          ref={this.Cabecera}
          params={{
            token: this.state.token,
            playerId: this.state.playerId,
            español: this.state.español,
          }}
          navigation={this.props.navigation}
          updateParent={this.changeLanguage}
        >
          <View style={styles.body}>
            <View style={styles.formContainer}>
              <View style={styles.tituloView}>
                {(this.state.español && (
                  <Text style={styles.titulo}>
                    {"    "}Perfil{"    "}
                  </Text>
                )) || (
                  <Text style={styles.titulo}>
                    {"    "}Profile{"    "}
                  </Text>
                )}
              </View>

              <Image
                style={styles.avatar}
                source={require("../assets/avatares/" +
                  this.state.avatarId +
                  ".png")}
              />
              <Text style={styles.textoCampos}>
                Alias:{" "}
                <Text style={styles.textoInterior}>{this.state.alias}</Text>
              </Text>

              {(this.state.español && (
                <Text style={styles.textoCampos}>
                  Correo:{" "}
                  <Text style={styles.textoInterior}>{this.state.email}</Text>
                </Text>
              )) || (
                <Text style={styles.textoCampos}>
                  Email:{" "}
                  <Text style={styles.textoInterior}>{this.state.email}</Text>
                </Text>
              )}

              <Text style={styles.textoCampos}>
                Id:{" "}
                <Text style={styles.textoInterior}>{this.state.playerId}</Text>{" "}
              </Text>

              {(this.state.español && (
                <Text style={styles.textoCampos}>
                  Partidas publicas jugadas:{" "}
                  <Text style={styles.textoInterior}>
                    {this.state.publicTotal}
                  </Text>
                </Text>
              )) || (
                <Text style={styles.textoCampos}>
                  Public games played:{" "}
                  <Text style={styles.textoInterior}>
                    {this.state.publicTotal}
                  </Text>
                </Text>
              )}

              {(this.state.español && (
                <Text style={styles.textoCampos}>
                  Partidas publicas ganadas:{" "}
                  <Text style={styles.textoInterior}>
                    {this.state.publicWins}
                  </Text>
                </Text>
              )) || (
                <Text style={styles.textoCampos}>
                  Public games won:{" "}
                  <Text style={styles.textoInterior}>
                    {this.state.publicWins}
                  </Text>
                </Text>
              )}

              {(this.state.español && (
                <Text style={styles.textoCampos}>
                  Partidas privadas jugadas:{" "}
                  <Text style={styles.textoInterior}>
                    {this.state.privateTotal}
                  </Text>
                </Text>
              )) || (
                <Text style={styles.textoCampos}>
                  Private games played:{" "}
                  <Text style={styles.textoInterior}>
                    {this.state.privateTotal}
                  </Text>
                </Text>
              )}

              {(this.state.español && (
                <Text style={styles.textoCampos}>
                  Partidas privadas ganadas:{" "}
                  <Text style={styles.textoInterior}>
                    {this.state.privateWins}
                  </Text>
                </Text>
              )) || (
                <Text style={styles.textoCampos}>
                  Private games won:{" "}
                  <Text style={styles.textoInterior}>
                    {this.state.privateWins}
                  </Text>
                </Text>
              )}

              {(this.state.español && (
                <Text style={styles.textoCampos}>
                  Dinero:{" "}
                  <Text style={styles.textoInterior}>{this.state.money}</Text>
                </Text>
              )) || (
                <Text style={styles.textoCampos}>
                  Money:{" "}
                  <Text style={styles.textoInterior}>{this.state.money}</Text>
                </Text>
              )}

              <View style={styles.customsContainer}>
                <View>
                  {(this.state.español && (
                    <Text style={styles.textoCampos}>Tablero actual:</Text>
                  )) || <Text style={styles.textoCampos}>Current board:</Text>}
                  <Image
                    style={styles.avatar}
                    source={require("../assets/tableros/" +
                      this.state.boardId +
                      ".png")}
                  />
                </View>
                <View>
                  {(this.state.español && (
                    <Text style={styles.textoCampos}>
                      Reverso de carta actual:
                    </Text>
                  )) || (
                    <Text style={styles.textoCampos}>Current card back:</Text>
                  )}
                  <Image
                    style={styles.avatar}
                    source={require("../assets/dorsos/" +
                      this.state.cardsId +
                      ".png")}
                  />
                </View>
              </View>
              <View style={styles.botonEditar}>
                <Button
                  title={
                    (this.state.español && "Editar perfil") || "Edit profile"
                  }
                  onPress={() =>
                    this.props.navigation.push("EditarUsuario", this.state)
                  }
                />
              </View>
              <View style={styles.botonEditar}>
                <Button
                  title={
                    (this.state.español && "Cambiar contraseña") ||
                    "Change password"
                  }
                  onPress={() =>
                    this.props.navigation.push("CambiarContrasenya", this.state)
                  }
                />
              </View>
              <View style={styles.botonEliminar}>
                <Button
                  title={
                    (this.state.español && "Eliminar cuenta") ||
                    "Delete account"
                  }
                  color="red"
                  onPress={() => {
                    if (
                      window.confirm(
                        (this.state.español &&
                          "Esta a punto de eliminar su cuenta. ¿Seguro que desea continuar?") ||
                          "You are about to delete your account. Are you sure you want to proceed?"
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
    color: "white",
    backgroundColor: "#2196F3",
    width: "100%",
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
