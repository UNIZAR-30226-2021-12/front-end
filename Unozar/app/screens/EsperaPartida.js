import React from "react";
import { Alert, Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Timer , ScrollView } from "react-native";
import { Menu } from 'primereact/menu';

class EsperaPartida extends React.Component {
  constructor(props) {
    super(props);
	const { token } = this.props.route.params;
	this.state = {
		token: token,
		gameId: '',
		maxPlayers: 2,
		gameStarted: '',
		playerId1: '',
		nombreJugador1: 'a',
		playerId2: '',
		nombreJugador2: '',
		playerId3: '',
		nombreJugador3: '',
		playerId4: '',
		nombreJugador4: '',
		estado: 1,
		jugadores: 0,
    };
  }
componentDidMount(){
	let timer1 = setInterval(() => this.estados(), 2000);
}
estados = () => {
		
		if(this.state.estado==0){
			console.log('ESTADO TOKEN: '+this.state.token)
		}else if(this.state.estado==1){
			console.log('ESTADO ACTUAL: '+this.state.estado);
			this.readHandler();
			this.setState({ estado: 0})
		}else if(this.state.estado==2){
			this.startHandler();
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
	response = await fetch('https://unozar.herokuapp.com/game/start', requestOptions1)
	data = await response.json();
	await this.setState({ token: data.token });	
	await console.log("start " + this.state.token);
	this.props.navigation.navigate("Partida", { token: this.state.token});
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
	await this.setState({ gameId: data.gameId });
	await this.setState({ maxPlayers: data.maxPlayers });
	await this.setState({ gameStarted: data.gameStarted });
	await this.setState({ token: data.token });
	await this.setState({ playerId1: data.playersIds[0] });
	await this.setState({ playerId2: data.playersIds[1] });
	await this.setState({ playerId3: data.playersIds[2] });
	await this.setState({ playerId4: data.playersIds[3] });
	await this.setState({ nombreJugador1:this.state.playerId1});
	await this.setState({ nombreJugador2:this.state.playerId2});
	await this.setState({ nombreJugador3:this.state.playerId3});
	await this.setState({ nombreJugador4:this.state.playerId4});
	/*if(playerId1!=''){await this.setState({ jugadores: this.state.jugadores+1});}
	else if(playerId2!=''){await this.setState({ jugadores: this.state.jugadores+1});}
	else if(playerId3!=''){await this.setState({ jugadores: this.state.jugadores+1});}
	else if(playerId4!=''){await this.setState({ jugadores: this.state.jugadores+1});}*/
	console.log('readHandler[' + this.state.gameId,this.state.maxPlayers,this.state.gameStarted,this.state.token,this.state.playerId1,this.state.playerId2,this.state.playerId3,this.state.playerId4 +']');
};
 render() {
		return (
		<>
			<View style={styles.screen}>
				<View style={styles.square1}>
						<View style={styles.containerParticipantes}>
							<Text style={styles.textoTitulo}> ESPERANDO JUGADORES... 
								{this.state.nombreJugador2=='' && this.state.maxPlayers>=2&& <Text style={styles.textoId}> 2 </Text>}
								{this.state.nombreJugador3=='' && this.state.maxPlayers>=3&& <Text style={styles.textoId}> 3 </Text>}
								{this.state.nombreJugador4=='' && this.state.maxPlayers==4 && <Text style={styles.textoId}> 4 </Text>}
							</Text>	
							<Text style={styles.textoId}> Jugador 1: {this.state.nombreJugador1} </Text>
							{this.state.nombreJugador2!='' &&
								<Text style={styles.textoId}> Jugador 2: {this.state.nombreJugador2} </Text>
							}
							{this.state.nombreJugador3!='' &&
								<Text style={styles.textoId}> Jugador 3: {this.state.nombreJugador3} </Text>
							}
							{this.state.nombreJugador4!='' &&
								<Text style={styles.textoId}> Jugador 4: {this.state.nombreJugador4} </Text>
							}
							{this.state.maxPlayers==4 &&
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
