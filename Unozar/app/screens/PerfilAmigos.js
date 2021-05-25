import React from "react";
import { Button, StyleSheet, View, Text, TextInput,Image } from "react-native";
import { Menu } from 'primereact/menu';
import { Linking } from 'react-native';
import qs from 'qs';
import CustomText from '../assets/idioma/CustomText.js' 

class PerfilAmigos extends React.Component {
  constructor(props) {
    super(props);
	const { miId } = this.props.route.params;
	const { token } = this.props.route.params;
	const { invitar } = this.props.route.params;
	const { gameId } = this.props.route.params;
	const { nombreJugador1 } = this.props.route.params;
	const { idJugadorInvitar } = this.props.route.params;
	const { amigo } = this.props.route.params;
	const { español } = this.props.route.params;
	const { CustomTextLocal } = this.props.route.params;
	const { numBots } = this.props.route.params;
	const { maxPlayers } = this.props.route.params
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
		avatarId: '3',
		invitar: invitar,
		nombreJugador1: nombreJugador1,
		subject: 'Invitación partida Unozar',
		body: nombreJugador1+' desea invitarle a una partida de Unozar: '+gameId,
		cc: '',
		bcc: '',
		idJugadorInvitar: idJugadorInvitar,
		amigo: amigo,
		español: español,
		CustomTextLocal: CustomTextLocal,
		numBots: numBots,
		maxPlayers: maxPlayers,
    };
	this.items = [
					{
						label: 'MenuPrincipal',
						icon: 'pi pi-user',
						command: () => {this.setState({show: false}), this.props.navigation.push("MenuPrincipal" , { token: this.state.token, playerId: this.state.miId, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal} )}
					},
					{
						label: 'Amigos',
						icon: 'pi pi-users',
						command: () => {this.setState({show: false}), this.props.navigation.push("Amigos", { token: this.state.token, miId: this.state.miId, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal})}
					},
					{
						label: 'Tienda',
						icon: 'pi pi-users',
						command: () => {this.setState({show1: false}), this.props.navigation.push("Tienda" , { token: this.state.token, miId: this.state.miId, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal} )}
					},
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
					{
						label: 'Cerrar Sesion',
						icon: 'pi pi-power-off',
						command: () => {this.setState({show:false}), this.props.navigation.push("Inicio")}
					}
					
		];
	}

	hide(){
		this.setState({showMenu: !this.state.showMenu})
		
	}
mailto = () => {
    var url;
    url = 'mailto:' + this.state.email;
    url += '?subject=' + this.state.subject;
    url += '&body=' + this.state.body;
    window.open(url);
}
invitar = () => {
	this.mailto()
	this.props.navigation.push("EsperaPartida" , { token: this.state.token, miId: this.state.miId, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal, numBots: this.state.numBots, gameId: this.state.gameId, invitar: this.state.invitar, nombreJugador1: this.state.nombreJugador1, maxPlayers: this.state.maxPlayers} )
}
readHandler = async (i) => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: i
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
deleteAmigo = async () => {
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		token: this.state.token,
		friendId: this.state.idJugadorInvitar
	  }),
	};
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/deleteFriend', requestOptions)
	data = await response.json();
	statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token});
		await this.props.navigation.push("Amigos", { token: this.state.token, miId: this.state.miId, gameId: this.state.gameId, invitar: true, nombreJugador1: this.state.nombreJugador1, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal, numBots: this.state.numBots, gameId: this.state.gameId});
	}		
};

componentDidMount(){
	console.log('Jugador invitado: '+this.state.idJugadorInvitar)
	this.readHandler(this.state.idJugadorInvitar)
}

  render() {
    return (
	<>
		<View style={styles.screen}>
			<View style={styles.formContainer}>
					<Image style={styles.avatar} source={require('../assets/avatares/'+this.state.avatarId+'.png')} />
					<Text style={styles.texto}> {this.state.alias} {this.state.email} </Text>
					{!this.state.amigo &&
					<Text style={styles.texto}> {this.state.miId} </Text>
					}
					{this.state.amigo &&
					<Text style={styles.texto}> {this.state.idJugadorInvitar} </Text>
					}
					<Text style={styles.texto}> Partidas públicas </Text>
					<Text style={styles.texto}> J: {this.state.publicTotal} W: {this.state.publicWins}</Text>
					<Text style={styles.texto}> Partidas privadas </Text>
					<Text style={styles.texto}> J: {this.state.privateTotal} W: {this.state.privateWins}</Text>
					{this.state.invitar &&
						<Button title="Invitar amigo" onPress={() => this.invitar() } />
					}
					{!this.state.invitar&&
						<Button title="Eliminar amigo" onPress={() => this.deleteAmigo()} />
					}
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

export default PerfilAmigos;
