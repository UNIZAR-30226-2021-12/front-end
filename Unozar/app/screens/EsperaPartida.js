import React from "react";
import { Alert, Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Timer , ScrollView } from "react-native";
import { Menu } from 'primereact/menu';

class EsperaPartida extends React.Component {
  constructor(props) {
    super(props);
	const { token } = this.props.route.params;
	const { miId } = this.props.route.params;
	this.state = {
		miId: miId,
		token: token,
		gameId: '',
		maxPlayers: 2,
		gameStarted: '',
		playerId1: 'undefined',
		nombreJugador1: 'Gonzalo',
		playerId2: 'undefined',
		nombreJugador2: '',
		playerId3: 'undefined',
		nombreJugador3: '',
		playerId4: 'undefined',
		nombreJugador4: '',
		estado: 0,
		jugadores: 0,
    };
  }
componentDidMount(){
	this.timer1 = setInterval(() => this.estados(), 2000);
}

estados = async () => {
		
		if(this.state.estado==0){
			await console.log('ESTADO ACTUAL: '+this.state.estado);
			await this.readHandler();
			if(await this.state.gameStarted==true){
				clearInterval(this.timer1);
				await this.props.navigation.navigate("Partida", { token: this.state.token});
			}
			await this.setState({ estado: 0})
		}else if(this.state.estado==2){
			clearInterval(this.timer1);
			await this.startHandler();
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
	if( await data.status != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token });	
		await console.log("start " + this.state.token);
		await this.props.navigation.navigate("Partida", { token: this.state.token});
	}
};	
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
	
	if( await data.status != 200 ){
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
		if( await this.state.playerId1 != 'undefined' || await this.state.playerId2 != 'undefined' 
			|| await this.state.playerId3 != 'undefined' || await this.state.playerId4 != 'undefined'){
			await this.readPlayerHandler();
		}
		if(await this.state.jugdores==0){
			await this.setState({ jugadores: this.state.maxPlayers });
		}
		await console.log('readHandler[' + this.state.gameId,this.state.maxPlayers,this.state.gameStarted,this.state.token,this.state.playerId1,this.state.playerId2,this.state.playerId3,this.state.playerId4 +']');
	}
};
readPlayerHandler = async () => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.playerId1
      }),
	};
	const requestOptions2 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.playerId2
      }),
	};
	const requestOptions3 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.playerId3
      }),
	};
	const requestOptions4 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.playerId4
      }),
	};
	let data;
	let response;
	if(this.state.playerId1!='undefined'&&this.state.nombreJugador1==''){
		response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions1);
		data = await response.json();
		if( await data.status != 200 ){
			clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
		}else{
			await this.setState({ nombreJugador1: data.alias });
			await this.setState({ jugadores: this.state.jugadores-1})
		}
	}else if(this.state.playerId2!='undefined'&&this.state.nombreJugador2==''){
		response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions2);
		data = await response.json();
		if( await data.status != 200 ){
			clearInterval(this.timer1);
			console.log('¡¡¡ERROR FETCH!!!')
		}else{
			await this.setState({ nombreJugador2: data.alias });
			await this.setState({ jugadores: this.state.jugadores-1})
		}
	}else if(this.state.playerId3!='undefined'&&this.state.nombreJugador3==''){
		response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions3);
		data = await response.json();
		if( await data.status != 200 ){
			clearInterval(this.timer1);
			console.log('¡¡¡ERROR FETCH!!!')
		}else{
			await this.setState({ nombreJugador3: data.alias });
			await this.setState({ jugadores: this.state.jugadores-1})
		}
	}else if(this.state.playerId4!='undefined'&&this.state.nombreJugador4==''){
		response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions3);
		data = await response.json();
		if( await data.status != 200 ){
			clearInterval(this.timer1);
			console.log('¡¡¡ERROR FETCH!!!')
		}else{
			await this.setState({ nombreJugador4: data.alias });
			await this.setState({ jugadores: this.state.jugadores-1})
		}
	}

}
 render() {
		return (
		<>
			<View style={styles.screen}>
				<View style={styles.square1}>
						<View style={styles.containerParticipantes}>
								

							{this.state.miId!=this.state.playerId1 &&
								<Text style={styles.textoTitulo}> ESPERANDO A QUE {this.state.nombreJugador1} EMPIEZE PARTIDA... </Text>	
							}
							<Text style={styles.textoTitulo}> FALTAN {this.state.jugadores} JUGADORES </Text>	
							<Text style={styles.textoId}> Jugador 1: {this.state.nombreJugador1} </Text>
							{this.state.playerId2!='undefined' &&
								<Text style={styles.textoId}> Jugador 2: {this.state.nombreJugador2} </Text>
							}
							{this.state.playerId3!='undefined' &&
								<Text style={styles.textoId}> Jugador 3: {this.state.nombreJugador3} </Text>
							}
							{this.state.playerId4!='undefined' &&
								<Text style={styles.textoId}> Jugador 4: {this.state.nombreJugador4} </Text>
							}
							{this.state.miId==this.state.playerId1 &&
								<Button title="EMPEZAR PARTIDA"  color="#40d81b" onPress={() => this.setState({ estado: 2 })}/>
							}
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
});

export default EsperaPartida;