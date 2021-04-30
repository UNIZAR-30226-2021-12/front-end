import React from "react";
import { Button, StyleSheet, View, Text, TextInput } from "react-native";
import { Menu } from 'primereact/menu';

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		show: false,
    };
	this.items = [
					{
						label: 'Atras',
						icon: 'pi pi-user',
						command: () => {this.setState({show: false}), this.props.navigation.goBack()}
					},
					{
						label: 'Amigos',
						icon: 'pi pi-users',
						command: () => {alert("Amigos")}
					},
					{
						label: 'Cerrar Sesion',
						icon: 'pi pi-power-off',
						command: () => {this.setState({show:false}), this.props.navigation.navigate("Inicio")}
					}
					
		];
	}

	hide(){
		this.setState({showMenu: !this.state.showMenu})
		
	}
	
  render() {
	const { user } = this.props.route.params;
	const { pass } = this.props.route.params;  
    return (
		<View style={styles.screen}>
			<View style={styles.menu}>
					<div>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
				<button icon="pi pi-bars" onClick={() => this.setState({ show: !this.state.show })}><i className="fa fa-bars"></i></button>
				{ this.state.show && (
					<Menu model={this.items} />
				)}
				</div>  
			</View>
			<View style={styles.formContainer}>
				
				<View style={styles.titulo}>
					<Text> Perfil </Text>
				</View>
				<View>
					<Text> Nombre:  </Text>
				</View>
				<View>
					<Text> Correo: {JSON.stringify(user).slice(1, -1)} </Text>
				</View>
				<View>
					<Text> Partidas Jugadas:  </Text>
				</View>
				<View>
					<Text> Partidas Ganadas:  </Text>
				</View>
				<View>
					<Text> Partidas Perdidas:  </Text>
				</View>
			</View>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
  titulo: {
	  fontSize: 50,
	right: 200,
	
  },
  formContainer: {
    alignSelf: "center",
    width: "30%",
    justifyContent: "center",
    alignContent: "center",
  },
  menu :{
	position: 'absolute', 
	top: 20,
	left: 1200
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

export default Perfil;
