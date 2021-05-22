import React from "react";
import { Button, StyleSheet, View, Text, TextInput,Image } from "react-native";
import { Menu } from 'primereact/menu';

class Perfil extends React.Component {
  constructor(props) {
    super(props);
	const { miId } = this.props.route.params;
	const { token } = this.props.route.params;
    this.state = {
		show: false,
		miId: miId,
		token: token,
		alias: 'a',
		email: 'b',
		privateWins: 1,
		privateTotal: 2,
		publicWins: 3,
		publicTotal: 4,
		avatarId: '7',
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
						command: () => {this.setState({show: false}), this.props.navigation.navigate("Amigos", { token: this.state.token, miId: this.state.miId})}
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
readHandler = async () => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: miId
      }),
	};
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions1);
	data = await response.json();
	statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ alias: data.alias});
		await this.setState({ email: data.email});
		await this.setState({ publicTotal: data.publicTotal});
		await this.setState({ publicWins: data.publicWins});
		await this.setState({ privateTotal: data.privateTotal});
		await this.setState({ privateWins: data.privateWins});
		await this.setState({ avatarId: data.avatarId});
		console.log('lectura perfil')
	}
};
componentDidMount(){
	//this.readHandler();
}
  render() {
    return (
	<>
		<View style={styles.screen}>
			<View style={styles.formContainer}>
					<Image style={styles.avatar} source={require('../assets/avatares/'+this.state.avatarId+'.png')} />
					<Text style={styles.texto}> {this.state.alias} {this.state.email} </Text>
					<Text style={styles.texto}> {this.state.miId} </Text>
					<Text style={styles.texto}> Partidas públicas </Text>
					<Text style={styles.texto}> J: {this.state.publicTotal} W: {this.state.publicWins}</Text>
					<Text style={styles.texto}> Partidas privadas </Text>
					<Text style={styles.texto}> J: {this.state.privateTotal} W: {this.state.privateWins}</Text>
			</View>
		</View>
		<View style={styles.menu}>
					<div>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
				<button icon="pi pi-bars" onClick={() => this.setState({ show: !this.state.show })}><i className="fa fa-bars"></i></button>
				{ this.state.show && (
					<Menu model={this.items} />
				)}
				</div>  
		</View>
		</>
    );
  }
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
  texto: {
	alignSelf: "center",
	fontStyle: "Roboto",
	fontSize: 18
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
	left: 1200,
	backgroundColor:'rgba(255, 255, 255, 0.7)',
  },
  avatar: {
	alignSelf: "center",
	resizeMode: "contain",
	height: 150,
	width: 120 
  },
});

export default Perfil;
