import React from "react";
import { Alert, Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Timer , ScrollView } from "react-native";
import { Menu } from 'primereact/menu';
import CustomText from '../assets/idioma/CustomText.js' 

class EsperaPartida extends React.Component {
  constructor(props) {
    super(props);
	const { token } = this.props.route.params;
	const { miId } = this.props.route.params;
	const { numBots } = this.props.route.params;
	const { gameId } = this.props.route.params;
	const { español } = this.props.route.params;
	const { CustomTextLocal } = this.props.route.params;
	const { nombreJugador1 } = this.props.route.params;
	const { maxPlayers } = this.props.route.params
	this.state = {
		miId: miId,
		token: token,
		gameId: gameId,
		maxPlayers: maxPlayers,
		gameStarted: '',
		playerId1: 'undefined',
		nombreJugador1: nombreJugador1,
		playerId2: 'undefined',
		nombreJugador2: '',
		playerId3: 'undefined',
		nombreJugador3: '',
		playerId4: 'undefined',
		nombreJugador4: '',
		estado: 0,
		jugadores: 1,
		numBots: numBots,
		bet: '',
		money: 0,
		español: español,
		CustomTextLocal: CustomTextLocal,
    };
  }
componentDidMount(){
	this.readYo()
	this.timer1 = setInterval(() => this.estados(), 2000);
}

estados = async () => {
		
		if(this.state.estado==0){
			await console.log('ESTADO ACTUAL: '+this.state.estado);
			await this.readHandler();
			if(await this.state.gameStarted==true){
				clearInterval(this.timer1);
				console.log('PASANDO ID: '+this.state.miId)
				await this.props.navigation.push("Partida", { token: this.state.token, miId: this.state.miId, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal});
			}
			await this.setState({ estado: 0})
		}else if(this.state.estado==2){
			clearInterval(this.timer1);
			await this.startHandler();
		}else if(this.state.estado==3){
			await clearInterval(this.timer1);
			await this.salirSala()
		}else if(this.state.estado==4){
			clearInterval(this.timer1)
			this.props.navigation.push("Amigos", { token: this.state.token, miId: this.state.miId, gameId: this.state.gameId, invitar: true, nombreJugador1: this.state.nombreJugador1, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal, numBots: this.state.numBots, gameId: this.state.gameId, maxPlayers: this.state.maxPlayers})
		}
	}
startHandler = async () =>{
	const requestOptions1 = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		token: this.state.token
	  }),
	};
	let response = await fetch('https://unozar.herokuapp.com/game/start', requestOptions1)
	let data = await response.json();
	let statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token });	
		await console.log("start " + this.state.token);
		await this.props.navigation.push("Partida", { token: this.state.token, miId: this.state.miId, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal});
	}
};
readYo = async () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: this.state.miId
      }),
	};
	let response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions);
	let data = await response.json();
	let statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
	console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ nombreJugador1: data.alias });
		await this.setState({ money: data.money });
		await console.log('dinero: '+this.state.money)
	}
}	
readHandler = async () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token
      }),
    };
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/readRoom', requestOptions);
	data = await response.json();
	let statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ gameId: data.gameId });
		await this.setState({ maxPlayers: data.maxPlayers });
		await this.setState({ gameStarted: data.gameStarted });
		await this.setState({ token: data.token });
		await this.setState({ playerId1: data.playersIds[0] });
		await this.setState({ playerId2: data.playersIds[1] });
		await this.setState({ playerId3: data.playersIds[2] });
		await this.setState({ playerId4: data.playersIds[3] });
		await this.setState({ bet: data.bet });
		await console.log('dinero: '+this.state.money+' bet: '+this.state.bet)
		if( await this.state.money<this.state.bet){
			await alert('No tienes suficiente dinero para esta sala')
			await this.salirSala()
		}
		await this.readPlayerHandler();
		await console.log('readHandler[' + this.state.gameId,this.state.maxPlayers,this.state.gameStarted,this.state.token,this.state.playerId1,this.state.playerId2,this.state.playerId3,this.state.playerId4 +']');
	}
};
readPlayerHandler = async () => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: this.state.playerId1
      }),
	};
	const requestOptions2 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: this.state.playerId2
      }),
	};
	const requestOptions3 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: this.state.playerId3
      }),
	};
	const requestOptions4 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: this.state.playerId4
      }),
	};
	let data;
	let response;
	let statusCode
	console.log('PLAYER IDS:['+this.state.playerId1+', '+this.state.playerId2+', '+this.state.playerId3+' ,'+this.state.playerId4+']')
	if(this.state.maxPlayers>=2&&this.state.playerId1!='EMPTY'&&this.state.playerId1!='BOT'&&this.state.nombreJugador1==''){
		response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions1);
		data = await response.json();
		statusCode = response.status;
		console.log('READ PLAYER 1')
		if( await statusCode != 200 ){
			clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
		}else{
			await this.setState({ nombreJugador1: data.alias });
			await this.setState({ jugadores: this.state.jugadores+1})
		}
	}else if(this.state.playerId1=='EMPTY'){
		await this.setState({ nombreJugador1: '' });
	}
	if(this.state.maxPlayers>=2&&this.state.playerId2!='EMPTY'&&this.state.playerId2!='BOT'&&this.state.nombreJugador2==''){
		response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions2);
		data = await response.json()
		statusCode = response.status;
		console.log('READ PLAYER 2')
		if( await statusCode != 200 ){
			clearInterval(this.timer1);
			console.log('¡¡¡ERROR FETCH!!!')
		}else{
			await this.setState({ nombreJugador2: data.alias });
			await this.setState({ jugadores: this.state.jugadores+1})
		}
	}else if(this.state.playerId2=='EMPTY'){
		await this.setState({ nombreJugador2: '' });
	}
	if(this.state.maxPlayers>=3&&this.state.playerId3!='EMPTY'&&this.state.playerId3!='BOT'&&this.state.nombreJugador3==''){
		response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions3);
		data = await response.json();
		statusCode = response.status;
		console.log('READ PLAYER 3')
		if( await statusCode != 200 ){
			clearInterval(this.timer1);
			console.log('¡¡¡ERROR FETCH!!!')
		}else{
			await this.setState({ nombreJugador3: data.alias });
			await this.setState({ jugadores: this.state.jugadores+1})
		}
	}else if(this.state.playerId3=='EMPTY'){
		await this.setState({ nombreJugador3: '' });
	}
	if(this.state.maxPlayers==4&&this.state.playerId4!='EMPTY'&&this.state.nombreJugador4==''){
		response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions3);
		data = await response.json();
		statusCode = response.status;
		console.log('READ PLAYER 4')
		if( await statusCode != 200 ){
			clearInterval(this.timer1);
			console.log('¡¡¡ERROR FETCH!!!')
		}else{
			await this.setState({ nombreJugador4: data.alias });
			await this.setState({ jugadores: this.state.jugadores+1})
		}
	}else if(this.state.playerId4=='EMPTY'){
		await this.setState({ nombreJugador4: '' });
	}

}
salirSala = async () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token
      }),
    };
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/quit', requestOptions);
	data = await response.json();
	let statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token });
		await console.log('salir');
		await this.props.navigation.push("MenuPrincipal", { token: this.state.token, playerId: this.state.miId, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal});
	}
};


 render() {
		return (
		<>
			<View style={styles.screen}>
				<View style={styles.square1}>
						<View style={styles.containerParticipantes}>
								

							{this.state.miId!=this.state.playerId1 &&
								<Text style={styles.textoTitulo}>{this.state.CustomTextLocal.esperandoACreador1} {this.state.nombreJugador1} {this.state.CustomTextLocal.esperandoACreador2}</Text>	
								
							}
							{this.state.miId==this.state.playerId1 &&
								<Text style={styles.textoTitulo}>{this.state.CustomTextLocal.faltanJugadores1} {(this.state.maxPlayers-this.state.numBots)-this.state.jugadores} {this.state.CustomTextLocal.faltanJugadores2}</Text>	
							}
							<Text style={styles.textoId}> {this.state.CustomTextLocal.jugador1}: {this.state.nombreJugador1} </Text>
							{(this.state.maxPlayers-this.state.numBots)>=2 &&
								<Text style={styles.textoId}> {this.state.CustomTextLocal.jugador2}: {this.state.nombreJugador2} </Text>
							}
							{(this.state.maxPlayers-this.state.numBots)>=3 &&
								<Text style={styles.textoId}> {this.state.CustomTextLocal.jugador3}: {this.state.nombreJugador3} </Text>
							}
							{(this.state.maxPlayers-this.state.numBots)==4 &&
								<Text style={styles.textoId}> {this.state.CustomTextLocal.jugador4}: {this.state.nombreJugador4} </Text>
							}
							{this.state.miId==this.state.playerId1 && this.state.jugadores==this.state.maxPlayers && 
								<Button title={this.state.CustomTextLocal.empezarPartida}  color="#40d81b" onPress={() => this.setState({ estado: 2 })}/>
							}
							<View  style={styles.boton}>
								{this.state.jugadores!=this.maxPlayers &&
									<Button title={this.state.CustomTextLocal.invitarAmigo} onPress={() => this.setState({ estado: 4})} />
								}
								<Button title={this.state.CustomTextLocal.salir} onPress={() => this.setState({ estado: 3}) }/>
							</View>
						</View>
				</View>
			</View>
		</>
		);
  }
}

const styles = StyleSheet.create({
  screen: { padding: 0 },
  square1: {
    width: 1358,
    height: 500,
    backgroundColor:'rgba(140, 200, 60, 0.4)',
  },
  containerParticipantes: {
	flex: 1,
    flexDirection: 'column',  
	justifyContent: 'flex-start',
	alignItems: "center",
  },
  textoTitulo: {
	  lineHeight: 100,
	  fontStyle: "Roboto",
	  fontSize: 38
  },
  textoId: {
	  
	  lineHeight: 100,
	  fontStyle: "Roboto",
	  fontSize: 30
  },
  boton: {
	width: "30%",
    alignSelf: "center",  
  }
});

export default EsperaPartida;
