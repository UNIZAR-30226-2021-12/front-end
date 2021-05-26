import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Menu } from "primereact/menu";
import Cabecera from "../components/Cabecera";
import updatePlayer from "../functions/updatePlayer";
import refreshToken from "../functions/refreshToken";

class EditarUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.Cabecera = React.createRef();
    this.state = {
      español: this.props.route.params.español,
      CustomTextLocal: this.props.route.params.CustomTextLocal,
      token: this.props.route.params.token,
      alias: this.props.route.params.alias,
      emailViejo: this.props.route.params.email,
      email: null,
      id: this.props.route.params.id,
      avatarId: this.props.route.params.avatarId,
      boardId: this.props.route.params.boardId,
      cardsId: this.props.route.params.cardsId,
      unlockedAvatars: this.props.route.params.unlockedAvatars,
      unlockedBoards: this.props.route.params.unlockedBoards,
      unlockedCards: this.props.route.params.unlockedCards,
    };
  }

  updateHandler = async () => {
    const params = {
      token: this.state.token,
      alias: this.state.alias,
      email: this.state.email,
      avatarId: this.state.avatarId,
      boardId: this.state.boardId,
      cardsId: this.state.cardsId,
    };
    const token = await updatePlayer(params);
    if (token !== -1) {
      this.props.navigation.push("Perfil", {
        token: token,
        id: this.state.id,
        español: this.state.español,
        CustomTextLocal: this.state.CustomTextLocal,
      });
    }
  };

  refreshHandler = async () => {
    const token = await refreshToken(this.state.token);
    if (token !== -1) {
      this.setState({ token: token });
      this.Cabecera.current.updateToken(token);
    } else {
      alert("Su sesion ha expirado");
      this.props.navigation.navigate("Inicio", {
        español: this.state.español,
        CustomTextLocal: this.state.CustomTextLocal,
      });
    }
  };

  componentDidMount() {
    this.refreshHandler();
  }

  componentDIdUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  verAvatares = () => {
    let table = [];
    for (let i = 0; i < this.state.unlockedAvatars.length; i++) {
      table.push(
        <TouchableOpacity
          key={i}
          style={styles.touchable}
          activeOpacity={0.5}
          onPress={() => {
            this.state.avatarId = i;
          }}
        >
          <Image
            key={i}
            style={styles.avatarLista}
            source={require("../assets/avatares/" +
              this.state.unlockedAvatars[i] +
              ".png")}
          />
        </TouchableOpacity>
      );
    }
    return table;
  };
  verTableros = () => {
    let table = [];
    for (let i = 0; i < this.state.unlockedBoards.length; i++) {
      table.push(
        <TouchableOpacity
          key={i}
          style={styles.touchable}
          activeOpacity={0.5}
          onPress={() => this.setState({ boardId: i })}
        >
          <Image
            key={i}
            style={styles.tableroLista}
            source={require("../assets/tableros/" +
              this.state.unlockedBoards[i] +
              ".png")}
          />
        </TouchableOpacity>
      );
    }
    return table;
  };
  verDorsos = () => {
    let table = [];
    for (let i = 0; i < this.state.unlockedCards.length; i++) {
      table.push(
        <TouchableOpacity
          key={i}
          style={styles.touchable}
          activeOpacity={0.5}
          onPress={() => this.this.setState({ cardsId: i })}
        >
          <Image
            key={i}
            style={styles.dorsoLista}
            source={require("../assets/dorsos/" +
              this.state.unlockedCards[i] +
              ".png")}
          />
        </TouchableOpacity>
      );
    }
    return table;
  };

  render() {
    return (
      <View style={styles.screen}>
        <Cabecera
          ref={this.Cabecera}
          params={{
            token: this.state.token,
            playerId: this.state.id,
            español: this.state.español,
            CustomTextLocal: this.state.CustomTextLocal,
          }}
          navigation={this.props.navigation}
        >
          <View style={styles.formContainer}>
            <Text>Alias</Text>
            <TextInput
              style={styles.input}
              value={this.state.alias}
              onChangeText={(alias) => this.setState({ alias })}
            />
            <View>
              <Text>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                value={this.state.emailViejo}
                onChangeText={(email) => {
                  this.setState({ email });
                  this.setState({ emailViejo: email });
                }}
              />
            </View>
            <Text style={styles.ScrollViewText}>Seleccione un avatar</Text>
            <ScrollView horizontal style={styles.scrollViews}>
              {this.verAvatares()}
            </ScrollView>
            <Text style={styles.ScrollViewText}>Seleccione un tablero</Text>
            <ScrollView horizontal style={styles.scrollViews}>
              {this.verTableros()}
            </ScrollView>
            <Text style={styles.ScrollViewText}>
              Seleccione un reverso de carta
            </Text>
            <ScrollView horizontal style={styles.scrollViews}>
              {this.verDorsos()}
            </ScrollView>

            <View style={styles.botones}>
              <View style={styles.botonConfirmarView}>
                <Button
                  title="Confirmar"
                  onPress={() => this.updateHandler()}
                  style={styles.botonConfirmar}
                />
              </View>
              <View style={styles.botonCancelarView}>
                <Button
                  key={this.state.token}
                  title="Cancelar"
                  color="red"
                  onPress={() => {
                    this.props.navigation.push("Perfil", {
                      token: this.state.token,
                      id: this.state.id,
                      español: this.state.español,
                      CustomTextLocal: this.state.CustomTextLocal,
                    });
                  }}
                  style={styles.botonCancelar}
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
  touchable: {
    flex: 1,
  },
  avatarLista: {
    flex: 1,
    height: 141,
    width: 134,
    resizeMode: "contain",
  },
  tableroLista: {
    flex: 1,
    height: 120,
    width: 200,
    resizeMode: "contain",
  },
  dorsoLista: {
    flex: 1,
    height: 140,
    width: 90,
    resizeMode: "contain",
  },
  scrollViews: {
    alignSelf: "center",
  },
  ScrollViewText: {
    alignSelf: "center",
    marginTop: 10,
  },
});

export default EditarUsuario;
