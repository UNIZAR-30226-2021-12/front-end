import React, { Component } from "react";
import { Button, StyleSheet, View, Alert, TextInput, Text } from "react-native";

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
	  data: [],
	  playerId: "5",
	  token: "5",
    };
	this.login=this.login.bind(this)
  }
  
	log = () => {
		console.log(this.state.email);
		console.log(this.state.password);
		console.log(this.state.playerId);
		console.log(this.state.token);
	};
	loginHandler = async () => {

		await this.login();
		await this.log();
		this.props.navigation.navigate("MenuPrincipal", { user: this.state.email, pass: this.state.password, playerId: this.state.playerId, token: this.state.token })
	};
  login = async () => {
    if (this.state.email.length < 6) {
      alert("Debe ingresar el correo");
      return;
    }
    if (this.state.password.length < 6) {
      alert("Debe ingresar la contraseña");
      return;
    }
    

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };
	let datas;
     const response = await fetch(`https://unozar.herokuapp.com/player/authentication`, requestOptions)
	datas = await response.json();
	await this.setState({ playerId: datas.id });
	await this.setState({ token: datas.token});
  };

	refreshHandler = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: "",
      }),
    };

    fetch(`https://unozar.herokuapp.com/player/refreshToken`, requestOptions)
      .then(
	  function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
		
      });
    })
  };
  render() {
	  <login callback={this.addid} />
    return (
      <View style={styles.screen}>
        <View style={styles.formContainer}>
		<form>
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
              <Button title="Login" onPress={() => this.loginHandler()} 
									/*onPress={() => this.props.navigation.navigate("MenuPrincipal", { user: this.state.email, pass: this.state.password })}*//>
            </View>
          </View>
		  </form>
        </View>
        <View style={styles.regContainer}>
          <Text style={styles.regText}> ¿No está registrado? </Text>
          <View style={styles.buttonReg}>
            <Button
              onPress={() => this.props.navigation.navigate("Registro")}
              title="Registrarse"
            />
          </View>
		  <View style={styles.buttonLog}>
              <Button title="Logger" onPress={() => this.log()}/>
            </View>
			<Button title="Partida" onPress={() => this.props.navigation.navigate("Partida", { token: this.state.token})}/>
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
