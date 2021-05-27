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
import Cabecera from "../components/Cabecera";
import refreshToken from "../functions/refreshToken";
import updatePlayer from "../functions/updatePlayer";
import authentication from "../functions/authentication";

class CambiarContrasenya extends React.Component {
  constructor(props) {
    super(props);
    this.Cabecera = React.createRef();
    this.state = {
      español: this.props.route.params.español,
      token: this.props.route.params.token,
      playerId: this.props.route.params.playerId,
      email: this.props.route.params.email,
      avatarId: this.props.route.params.avatarId,
      boardId: this.props.route.params.boardId,
      cardsId: this.props.route.params.cardsId,
      oldPass: "",
      newPass: "",
    };
  }

  updatePassHandler = async () => {
    const par = {
      email: this.state.email,
      password: this.state.oldPass,
    };
    const resp = await authentication(par);
    if (resp === -1) {
      alert(
        (this.state.español && "Contraseña incorrecta") || "Incorrect password"
      );
      return -1;
    }
    const params = {
      token: resp.token,
      password: this.state.newPass,
      avatarId: this.state.avatarId,
      boardId: this.state.boardId,
      cardsId: this.state.cardsId,
    };
    const token = await updatePlayer(params);
    if (token !== -1) {
      this.props.navigation.push("Perfil", {
        token: token,
        playerId: this.state.playerId,
        español: this.state.español,
      });
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
    this.refreshHandler();
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
          <View style={styles.formContainer}>
            {(this.state.español && <Text>Contraseña actual</Text>) || (
              <Text>Current password</Text>
            )}
            <TextInput
              style={styles.input}
              onChangeText={(oldPass) => this.setState({ oldPass })}
              secureTextEntry={true}
            />
            <View>
              {(this.state.español && <Text>Nueva contraseña</Text>) || (
                <Text>New password</Text>
              )}
              <TextInput
                style={styles.input}
                onChangeText={(newPass) => this.setState({ newPass })}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.botones}>
              <View style={styles.botonConfirmarView}>
                <Button
                  title={
                    (this.state.español && "Cambiar contraseña") ||
                    "Change password"
                  }
                  onPress={() => this.updatePassHandler()}
                />
              </View>
              <View style={styles.botonCancelarView}>
                <Button
                  title={(this.state.español && "Cancelar") || "Cancel"}
                  color="red"
                  onPress={() =>
                    this.props.navigation.push("Perfil", {
                      token: this.state.token,
                      playerId: this.state.playerId,
                      español: this.state.español,
                    })
                  }
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
  formContainer: {
    marginTop: 10,
    alignSelf: "center",
    width: "30%",
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 25,
    padding: 10,
    width: "100%",
    backgroundColor: "white",
  },
  botones: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    width: "100%",
    flex: 1,
  },
  botonConfirmarView: {
    flex: 1,
    paddingHorizontal: 30,
  },
  botonCancelarView: {
    flex: 1,
    paddingHorizontal: 30,
  },
});

export default CambiarContrasenya;
