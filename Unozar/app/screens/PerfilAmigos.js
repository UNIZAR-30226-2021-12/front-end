import React from "react";
import { Button, StyleSheet, View, Text, TextInput, Image } from "react-native";
import { Menu } from "primereact/menu";
import { Linking } from "react-native";
import qs from "qs";
import Cabecera from "../components/Cabecera";
import refreshToken from "../functions/refreshToken";
class PerfilAmigos extends React.Component {
  constructor(props) {
    super(props);
	this.Cabecera = React.createRef();
	const { miId } = this.props.route.params;
	const { token } = this.props.route.params;
	const { invitar } = this.props.route.params;
	const { gameId } = this.props.route.params;
	const { idJugadorInvitar } = this.props.route.params;
	const { amigo } = this.props.route.params;
	const { español } = this.props.route.params;
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
		nombreJugador: '',
		subject: 'Invitación partida Unozar',
		body: this.nombreJugador+' desea invitarle a una partida de Unozar: '+gameId,
		cc: '',
		bcc: '',
		idJugadorInvitar: idJugadorInvitar,
		amigo: amigo,
		español: español,
		numBots: numBots,
		maxPlayers: maxPlayers,
    };
}
mailto = () => {
    var url;
    url = 'mailto:' + this.state.email;
    url += '?subject=' + this.state.subject;
    url += '&body=' + this.state.body;
    window.open(url);
}
readYo = async () => {
	await this.refreshHandler();
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		miId: this.state.miId
      }),
	};
	let response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions);
	let data = await response.json();
	let statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
	console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ nombreJugador: data.alias });
	}
}	
invitar = () => {
	this.mailto()
	this.props.navigation.push("EsperaPartida" , { token: this.state.token, miId: this.state.miId, español: this.state.español, numBots: this.state.numBots, gameId: this.state.gameId, invitar: this.state.invitar, maxPlayers: this.state.maxPlayers} )
}
refreshHandler = async () => {
    const token = await refreshToken(this.state.token);
    if (token !== -1) {
      this.setState({ token: token });
      this.Cabecera.current.updateToken(token);
    } else {
      alert(
        (this.state.español && "Su sesion ha expirado") ||
          "Your session has expired"
      );
      this.props.navigation.navigate("Inicio", {
        español: this.state.español,
      });
    }
  };
readHandler = async (i) => {
	await this.refreshHandler();
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
	await this.refreshHandler();
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
		await this.props.navigation.push("Amigos", { token: this.state.token, miId: this.state.miId, gameId: this.state.gameId, invitar: true, nombreJugador1: this.state.nombreJugador1, español: this.state.español, numBots: this.state.numBots, gameId: this.state.gameId});
	}		
};

componentDidMount(){
	console.log('Jugador invitado: '+this.state.idJugadorInvitar)
	this.readHandler(this.state.idJugadorInvitar)
}

  render() {
    return (
	<>
		<Cabecera
          ref={this.Cabecera}
          style={{ position: "absolute" }}
          params={{
            token: this.state.token,
            miId: this.state.miId,
            español: this.state.español,
          }}
          navigation={this.props.navigation}
        >
		<View style={styles.screen}>
			<View style={styles.formContainer}>
					<Image style={styles.avatar} source={require('../assets/avatares/'+this.state.avatarId+'.png')} />
					<Text style={styles.texto}> {this.state.alias} {this.state.email} </Text>
					<Text style={styles.texto}> {this.state.idJugadorInvitar} </Text>
					<Text style={styles.texto}> Partidas públicas </Text>
					<Text style={styles.texto}> J: {this.state.publicTotal} W: {this.state.publicWins}</Text>
					<Text style={styles.texto}> Partidas privadas </Text>
					<Text style={styles.texto}> J: {this.state.privateTotal} W: {this.state.privateWins}</Text>
					{this.state.invitar &&
						<Button title="Invitar amigo" onPress={() => this.invitar() } />
					}
					{!this.state.invitar&&
					<>
						<Button title="Eliminar amigo" onPress={() => this.deleteAmigo()} />
						</>
					}
			</View>
		</View>
		</Cabecera>
		</>
    );
  }
}

const styles = StyleSheet.create({
  screen: { backgroundColor: "#b6eb5f",
    flex: 1, },
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
