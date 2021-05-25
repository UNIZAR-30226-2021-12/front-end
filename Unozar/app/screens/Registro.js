import React from "react";
import { Button, StyleSheet, View, Text, TextInput } from "react-native";
import CustomText from '../assets/idioma/CustomText.js' 
import { Menu } from 'primereact/menu';
class Registro extends React.Component {
  constructor(props) {
    super(props);
	const { español } = this.props.route.params;
	const { CustomTextLocal } = this.props.route.params;
    this.state = {
      alias: "",
      email: "",
      firstPassword: "",
      secondPassword: "",
	  id: 5,
	  token: 10,
	  español: español,
	  CustomTextLocal: CustomTextLocal,
    };
	this.items = [
					{
						label: 'Cambiar idioma',
						icon: 'pi pi-user',
						command: () => {if(this.state.español){
											this.setState({español: false})
											this.state.CustomTextLocal.setLanguage('en');
										}else{
											this.setState({español: true})
											this.state.CustomTextLocal.setLanguage('es');
										}
							
							}
					},
		];
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
		await this.props.navigation.push("MenuPrincipal", {playerId: this.state.playerId, token: this.state.token, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal })
	}
};
  render() {
    return (
	<>
      <View style={styles.screen}>
        <View style={styles.formContainer}>
		<form>
          <Text> {this.state.CustomTextLocal.alias} </Text>
          <TextInput
            style={styles.input}
			placeholder={this.state.CustomTextLocal.nombre}
            onChangeText={(alias) => this.setState({ alias })}
          />
		  
          <Text> {this.state.CustomTextLocal.mail} </Text>
          <TextInput
            style={styles.input}
            placeholder={this.state.CustomTextLocal.ejemploMail}
            onChangeText={(email) => this.setState({ email })}
          />
          <Text> {this.state.CustomTextLocal.pass} </Text>
          <TextInput
            ref={(input) => {
              this.pass1Input = input;
            }}
            style={styles.input}
            onChangeText={(firstPassword) => this.setState({ firstPassword })}
            secureTextEntry={true}
          />
          <Text> {this.state.CustomTextLocal.repetirPass} </Text>
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
              title={this.state.CustomTextLocal.registro}
              onPress={() => this.registroylogin()}
			  /*onPress={() =>this.props.navigation.push("MenuPrincipal", {playerId: this.state.playerId, token: this.state.token, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal })}*/
            />
          </View>
		  </form>
        </View>
        <View style={styles.logContainer}>
          <Text style={styles.logText}> ¿Ya está registrado? </Text>
          <View style={styles.buttonLog}>
            <Button
              onPress={() => this.props.navigation.push("Inicio", {español: this.state.español, CustomTextLocal: this.state.CustomTextLocal})}
              title={this.state.CustomTextLocal.login}
            />
          </View>
        </View>
		<View style={styles.menu}>
					<div>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <button icon="pi pi-bars" onClick={() => this.setState({ show1: !this.state.show1 })}><i className="fa fa-bars"></i></button>
                { this.state.show1 && (
					<Menu model={this.items} />
                )}
				</div>  
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
  menu :{
	position: 'absolute', 
	top: 20,
	left: 1200,
	backgroundColor:'rgba(255, 255, 255, 0.7)',
  },
});

export default Registro;
