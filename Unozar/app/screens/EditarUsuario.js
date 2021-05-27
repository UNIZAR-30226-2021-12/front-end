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
import Cabecera from "../components/Cabecera";
import updatePlayer from "../functions/updatePlayer";
import refreshToken from "../functions/refreshToken";

class EditarUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.Cabecera = React.createRef();
    this.state = {
      español: this.props.route.params.español,
      token: this.props.route.params.token,
      alias: this.props.route.params.alias,
      emailInput: this.props.route.params.email,
      emailViejo: this.props.route.params.email,
      miId: this.props.route.params.miId,
      avatarId: this.props.route.params.avatarId,
      boardId: this.props.route.params.boardId,
      cardsId: this.props.route.params.cardsId,
      unlockedAvatars: this.props.route.params.unlockedAvatars,
      unlockedBoards: this.props.route.params.unlockedBoards,
      unlockedCards: this.props.route.params.unlockedCards,
    };
  }

  updateHandler = async () => {
    if (this.state.alias.length > 15) {
      alert(
        (this.state.español && "El alias no puede exceder los 15 caracteres") ||
          "The alias can't exceed 15 characters"
      );
      return;
    }
    let newEmail = null;
    if (this.state.emailInput !== this.state.emailViejo) {
      newEmail = this.state.emailInput;
    }
    const params = {
      token: this.state.token,
      alias: this.state.alias,
      email: newEmail,
      avatarId: this.state.avatarId,
      boardId: this.state.boardId,
      cardsId: this.state.cardsId,
    };
    const token = await updatePlayer(params);
    if (token !== -1) {
      this.props.navigation.push("Perfil", {
        token: token,
        miId: this.state.miId,
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
            this.state.avatarId = this.state.unlockedAvatars[i];
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
          onPress={() => (this.state.boardId = this.state.unlockedBoards[i])}
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
          onPress={() => (this.state.cardsId = this.state.unlockedCards[i])}
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
            miId: this.state.miId,
            español: this.state.español,
          }}
          navigation={this.props.navigation}
          updateParent={this.changeLanguage}
        >
          <View style={styles.formContainer}>
            <Text>Alias</Text>
            <TextInput
              style={styles.input}
              value={this.state.alias}
              onChangeText={(alias) => this.setState({ alias })}
            />
            <View>
              {(this.state.español && <Text>Correo electrónico</Text>) || (
                <Text>Email</Text>
              )}
              <TextInput
                style={styles.input}
                value={this.state.emailInput}
                onChangeText={(email) => {
                  this.setState({ emailInput: email });
                }}
              />
            </View>
            {(this.state.español && (
              <Text style={styles.ScrollViewText}>Seleccione un avatar</Text>
            )) || <Text style={styles.ScrollViewText}>Select an avatar</Text>}
            <ScrollView horizontal style={styles.scrollViews}>
              {this.verAvatares()}
            </ScrollView>
            {(this.state.español && (
              <Text style={styles.ScrollViewText}>Seleccione un tablero</Text>
            )) || <Text style={styles.ScrollViewText}>Select a board</Text>}
            <ScrollView horizontal style={styles.scrollViews}>
              {this.verTableros()}
            </ScrollView>
            {(this.state.español && (
              <Text style={styles.ScrollViewText}>
                Seleccione un reverso de carta
              </Text>
            )) || <Text style={styles.ScrollViewText}>Select a card back</Text>}
            <ScrollView horizontal style={styles.scrollViews}>
              {this.verDorsos()}
            </ScrollView>

            <View style={styles.botones}>
              <View style={styles.botonConfirmarView}>
                <Button
                  title={(this.state.español && "Confirmar") || "Confirm"}
                  onPress={() => this.updateHandler()}
                  style={styles.botonConfirmar}
                />
              </View>
              <View style={styles.botonCancelarView}>
                <Button
                  key={this.state.token}
                  title={(this.state.español && "Cancelar") || "Cancel"}
                  color="red"
                  onPress={() => {
                    this.props.navigation.push("Perfil", {
                      token: this.state.token,
                      miId: this.state.miId,
                      español: this.state.español,
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
