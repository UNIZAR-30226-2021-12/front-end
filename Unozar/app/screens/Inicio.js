import React, { Component } from "react";
import { Button, StyleSheet, View, Alert, TextInput, Text } from "react-native";

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  loginHandler = () => {
    if (this.state.email.length < 6) {
      alert("Debe ingresar el correo");
      return;
    }
    if (this.state.password.length < 6) {
      alert("Debe ingresar la contraseña");
      return;
    }
    console.log(this.state.email);
    console.log(this.state.password);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };

    fetch(`http://localhost:8080/player/authentication`, requestOptions)
      .then(async (response) => {
        const data = JSON.stringify(response);
        console.log(data);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          alert("El correo electrónico o la contraseña no son válidos");
          this.setState({ password: "" });
          this.textInput.clear();
          return Promise.reject(error);
        }

        this.props.navigation.navigate("MenuPrincipal");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.formContainer}>
          <View>
            <Text>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@unizar.es"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <View>
            <Text>Contraseña</Text>
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
              <Button title="Login" onPress={() => this.loginHandler()} />
            </View>
          </View>
        </View>
        <View style={styles.regContainer}>
          <Text style={styles.regText}> ¿No está registrado? </Text>
          <View style={styles.buttonReg}>
            <Button
              onPress={() => this.props.navigation.navigate("Registro")}
              title="Registrarse"
            />
          </View>
        </View>
      </View>
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
});
