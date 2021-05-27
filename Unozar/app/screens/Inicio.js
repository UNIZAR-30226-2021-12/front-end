import React, { Component } from "react";
import { Button, StyleSheet, View, Alert, TextInput, Text } from "react-native";
import Cabecera from "../components/CabeceraInicio";
import authentication from "../functions/authentication";

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "prueba",
      password: "",
	  data: [],
	  miId: "1",
	  token: "2",
	  show1: false,
	  español: this.props.route.params.español,
    };
  }
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
    if (data !== -1) {
      this.setState({ miId: data.id });
      this.setState({ token: data.token });
      this.props.navigation.push("MenuPrincipal", {
        miId: this.state.miId,
        token: this.state.token,
        español: this.state.español,
      });
    } else {
      alert(
        (this.state.español && "Correo o contraseña incorrectos") ||
          "Incorrect email or password"
      );
    }
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
				<form>
				  <View>
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
				  </View>
				  <View>
					 {(this.state.español && <Text>Contraseña</Text>) || (
						<Text>Password</Text>
					  )}
					<TextInput
						ref={(input) => {
						  this.textInput = input;
						}}
						style={styles.input}
						onChangeText={(password) => this.setState({ password })}
						secureTextEntry={true}
					  />
				  </View>
				  <View style={styles.container}>
					<View style={styles.buttonLog}>
					  <Button
					  title={(this.state.español && "Iniciar Sesión") || "Sign in"}
					  onPress={() => this.login()}
					/>
					</View>
				  </View>
				  </form>
				</View>
				<View style={styles.regContainer}>
				  {(this.state.español && (
					  <Text style={styles.regText}>¿No está registrado?</Text>
					)) || (
					  <Text style={styles.regText}>You don't have an account?</Text>
					)}
				  <View style={styles.buttonReg}>
					<Button
						onPress={() => this.props.navigation.push("Registro")}
						title={(this.state.español && "Registrarse") || "Register"}
						onPress={() =>
						  this.props.navigation.push("Registro", {
							español: this.state.español,
						  })
						}
					  />
				  </View>
				</View>
			</Cabecera>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  screen: { backgroundColor: "#ffffff", flex: 1 },
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
  buttonLog: {
    top: 10,
  },
  regContainer: {
    top: 20,
    flex: 1,
    justifyContent: "center",
  },
  regText: {
    alignSelf: "center",
    padding: 10,
  },
  buttonReg: {
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
