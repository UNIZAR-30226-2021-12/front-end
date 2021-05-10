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
	  dataId: "",
    };
	
  }
  returnData = () => {
	  return this.state.data;
  }
  registerHandler = () => {
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
        alias: this.state.alias,
        password: this.state.password,
      }),
    };

    fetch(`https://unozar.herokuapp.com/player/create`, requestOptions)
      .then(
	  function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(responseData) {
			//this.setState({ dataId: responseData});
			console.log(responseData);
      });
    })
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
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry={true}
          />
          <Text> Repetir contraseña </Text>
          <TextInput
            ref={(input) => {
              this.pass2Input = input;
            }}
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry={true}
          />
          <View style={styles.buttonReg}>
            <Button
              title="Registrarse"
              onPress={() => this.registerHandler()}
            />
          </View>
		  </form>
        </View>
        <View style={styles.logContainer}>
          <Text style={styles.logText}> ¿Ya está registrado? </Text>
          <View style={styles.buttonLog}>
            <Button
              onPress={() => this.props.navigation.navigate("Inicio")}
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
