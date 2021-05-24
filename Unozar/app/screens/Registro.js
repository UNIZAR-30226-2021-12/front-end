import React from "react";
import { Button, StyleSheet, View, Text, TextInput } from "react-native";


class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alias: "",
      email: "",
      firstPassword: "",
      secondPassword: "",
	  id: "",
	  token: '',
    };
	
  }
registroylogin = async () => {
	await this.registerHandler()
	await this.login()
};
registerHandler = async () => {
	if (this.state.email.length < 6) {
	  alert("Debe ingresar el correo");
	  return;
	}
	if (this.state.firstPassword.length < 6) {
	  alert("Debe ingresar la contraseña");
	  return;
	}
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		email: this.state.email,
		alias: this.state.alias,
		password: this.state.firstPassword,
	  }),
	};
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/create', requestOptions);
	data = await response.json();
	statusCode = await response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await console.log('CREADO CON PASS: '+this.state.firstPassword)
		await this.setState({ email: data.email })
	}
};
login = async () => {
	if (this.state.email.length < 6) {
	  alert("Debe ingresar el correo");
	  return;
	}
	if (this.state.firstPassword.length < 6) {
	  alert("Debe ingresar la contraseña");
	  return;
	}
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		email: this.state.email,
		password: this.state.firstPassword,
	  }),
	};
	let data;
	let response;
	let statusCode
	await console.log('LOGEANDO CON PASS: '+this.state.firstPassword)
	response = await fetch(`https://unozar.herokuapp.com/player/authentication`, requestOptions)
	data = await response.json();
	statusCode = await response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		
		await this.setState({ playerId: data.id });
		await this.setState({ token: data.token});
		await this.props.navigation.push("MenuPrincipal", {playerId: this.state.playerId, token: this.state.token })
	}
};
  render() {
    return (
	<>
      <View style={styles.screen}>
        <View style={styles.formContainer}>
		<form>
          <Text> Alias </Text>
          <TextInput
            style={styles.input}
            onChangeText={(alias) => this.setState({ alias })}
          />
		  
          <Text> Correo </Text>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@unizar.es"
            onChangeText={(email) => this.setState({ email })}
          />
          <Text> Contraseña </Text>
          <TextInput
            ref={(input) => {
              this.pass1Input = input;
            }}
            style={styles.input}
            onChangeText={(firstPassword) => this.setState({ firstPassword })}
            secureTextEntry={true}
          />
          <Text> Repetir contraseña </Text>
          <TextInput
            ref={(input) => {
              this.pass2Input = input;
            }}
            style={styles.input}
            onChangeText={(secondPassword) => this.setState({ secondPassword })}
            secureTextEntry={true}
          />
          <View style={styles.buttonReg}>
            <Button
              title="Registrarse"
              onPress={() => this.registroylogin()}
            />
          </View>
		  </form>
        </View>
        <View style={styles.logContainer}>
          <Text style={styles.logText}> ¿Ya está registrado? </Text>
          <View style={styles.buttonLog}>
            <Button
              onPress={() => this.props.navigation.push("Inicio")}
              title="Login"
            />
          </View>
        </View>
      </View>
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
});

export default Registro;
