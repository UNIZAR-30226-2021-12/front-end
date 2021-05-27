import React from "react";
import { Button, StyleSheet, View, Text, TextInput } from "react-native";
import Cabecera from "../components/CabeceraInicio";
import authentication from "../functions/authentication";
import register from "../functions/register";
class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alias: "",
      email: "",
      password: "",
      secondPassword: "",
      playerId: 0,
      token: 0,
      español: this.props.route.params.español,
    };
  }
  registroylogin = async () => {
    await this.registerHandler();
    await this.login();
  };
  registerHandler = async () => {
    if (this.state.alias.length < 1) {
      alert(
        (this.state.español && "Debe ingresar un alias") ||
          "You must enter an alias"
      );
      return;
    }
    if (this.state.alias.length > 15) {
      alert(
        (this.state.español && "El alias no puede exceder los 15 caracteres") ||
          "The alias can't exceed 15 characters"
      );
      return;
    }
    if (this.state.email.length < 1) {
      alert(
        (this.state.español && "Debe ingresar un correo") ||
          "You must enter an email"
      );
      return;
    }
    if (
      !this.state.email.match(
        /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
      )
    ) {
      alert(
        (this.state.español && "El correo ingresado no es valido") ||
          "The email is not valid"
      );
      return;
    }
    if (this.state.password.length < 1) {
      alert(
        (this.state.español && "Debe ingresar una contraseña") ||
          "You must enter a password"
      );
      return;
    }
    const data = await register({
      email: this.state.email,
      alias: this.state.alias,
      password: this.state.password,
    });
    console.log(data);
  };

  login = async () => {
    if (this.state.email.length < 1) {
      alert(
        (this.state.español && "Debe ingresar el correo") ||
          "You must enter an email"
      );
      return;
    }
    if (this.state.password.length < 1) {
      alert(
        (this.state.español && "Debe ingresar la contraseña") ||
          "You must enter a password"
      );
      return;
    }
    const data = await authentication({
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({ playerId: data.id });
    this.setState({ token: data.token });
    console.log("Inicio playerId: " + this.state.playerId);
    this.props.navigation.push("MenuPrincipal", {
      playerId: this.state.playerId,
      token: this.state.token,
      español: this.state.español,
    });
  };

  changeLanguage = () => {
    this.setState({ español: !this.state.español });
  };

  render() {
    return (
      <>
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
          <View style={styles.screen}>
            <View style={styles.formContainer}>
              <Text>Alias</Text>
              <TextInput
                style={styles.input}
                placeholder={
                  (this.state.español && "Tu alias aparecerá en el juego") ||
                  "Your alias will show in the game"
                }
                onChangeText={(alias) => this.setState({ alias })}
              />

              {(this.state.español && <Text>Correo electrónico</Text>) || (
                <Text>Email</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder={
                  (this.state.español && "ejemplo@unizar.es") ||
                  "example@unizar.es"
                }
                onChangeText={(email) => this.setState({ email })}
              />
              {(this.state.español && <Text>Contraseña</Text>) || (
                <Text>Password</Text>
              )}
              <TextInput
                ref={(input) => {
                  this.pass1Input = input;
                }}
                style={styles.input}
                onChangeText={(password) => this.setState({ password })}
                secureTextEntry={true}
              />
              {(this.state.español && <Text>Repetir contraseña</Text>) || (
                <Text>Repeat password</Text>
              )}
              <TextInput
                ref={(input) => {
                  this.pass2Input = input;
                }}
                style={styles.input}
                onChangeText={(secondPassword) =>
                  this.setState({ secondPassword })
                }
                secureTextEntry={true}
              />
              <View style={styles.buttonReg}>
                <Button
                  title={(this.state.español && "Registrarse") || "Register"}
                  onPress={() => this.registroylogin()}
                />
              </View>
            </View>
            <View style={styles.logContainer}>
              {(this.state.español && (
                <Text style={styles.logText}>¿Ya está registrado?</Text>
              )) || (
                <Text style={styles.logText}>You already have an account?</Text>
              )}
              <View style={styles.buttonLog}>
                <Button
                  onPress={() =>
                    this.props.navigation.push("Inicio", {
                      español: this.state.español,
                    })
                  }
                  title={(this.state.español && "Iniciar Sesión") || "Sign in"}
                />
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
  formContainer: {
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
  },
  buttonReg: {
    top: 10,
  },
  logContainer: {
    top: 20,
    flex: 1,
    justifyContent: "center",
  },
  logText: {
    alignSelf: "center",
    padding: 10,
  },
  buttonLog: {
    width: "30%",
    alignSelf: "center",
  },
  menu: {
    position: "absolute",
    top: 20,
    left: 1200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default Registro;
