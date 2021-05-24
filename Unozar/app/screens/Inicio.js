import React, { Component } from "react";
import { Button, StyleSheet, View, Alert, TextInput, Text } from "react-native";

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "prueba",
      password: "",
	  data: [],
	  playerId: "1",
	  token: "2",
    };
  }
  
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
	let data;
	let response;
	let statusCode
	response = await fetch(`https://unozar.herokuapp.com/player/authentication`, requestOptions)
	data = await response.json();
	statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ playerId: data.id });
		await this.setState({ token: data.token});
		await this.props.navigation.push("MenuPrincipal", { playerId: this.state.playerId, token: this.state.token })
	}
};

  render() {
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
              <Button title="Login" onPress={() => this.login()} 
									/*onPress={() =>this.props.navigation.push("MenuPrincipal", { pass: this.state.password, playerId: this.state.playerId, token: this.state.token })}*//>
            </View>
          </View>
		  </form>
        </View>
        <View style={styles.regContainer}>
          <Text style={styles.regText}> ¿No está registrado? </Text>
          <View style={styles.buttonReg}>
            <Button
              onPress={() => this.props.navigation.push("Registro")}
              title="Registrarse"
            />
          </View>
		  <View style={styles.buttonLog}>
              <Button title="Logger" onPress={() => this.log()}/>
            </View>
			<Button title="Partida" onPress={() => this.props.navigation.push("Partida", { token: this.state.token})}/>
			<Button title="EsperaPartida" onPress={() => this.props.navigation.push("EsperaPartida", { token: this.state.token, miId: this.state.playerId})}/>
			<Button title="ListaAmigos" onPress={() => this.props.navigation.push("Amigos", { token: this.state.token, miId: this.state.playerId})}/>
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
