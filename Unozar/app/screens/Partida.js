import React from "react";
import { Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Timer , ScrollView } from "react-native";
import { Menu } from 'primereact/menu';
import {RNRestart} from 'react-native-restart';

class Partida extends React.Component {
  constructor(props) {
    super(props);
	const cartas = ["cambio_color_base.png","cambio_color_amarillo.png", "cambio_color_azul.png","cambio_color_rojo.png","cambio_color_azul.png","cambio_sentido_amarillo.png","cambio_sentido_azul.png","cambio_sentido_rojo.png","cambio_sentido_verde.png","cero_amarillo.png","cero_azul.png","cero_verde.png","cero_rojo.png","cinco_amarillo.png","cinco_azul.png","cinco_rojo.png","cinco_verde.png","cuatro_amarillo.png","cuatro_azul.png","cuatro_rojo.png","cuatro_verde.png","dos_amarillo.png","dos_azul.png","dos_rojo.png","dos_verde.png","mas_cuatro_base.png","mas_cuatro_amarillo.png","mas_cuatro_azul.png","mas_cuatro_rojo.png","mas_cuatro_verde.png","mas_dos_amarillo.png","mas_dos_azul.png","mas_dos_rojo.png","mas_dos_verde.png","nueve_amarillo.png","nueve_azul.png","nueve_rojo.png","nueve_verde.png","ocho_amarillo.png","ocho_azul.png","ocho_rojo.png","ocho_verde.png","reverso.png","saltar_turno_amarillo.png","saltar_turno_azul.png","saltar_turno_rojo.png","saltar_turno_verde.png","seis_amarillo.png","seis_azul.png","seis_rojo.png","seis_verde.png","siete_amarillo.png","siete_azul.png","siete_rojo.png","siete_verde.png","tres_amarillo.png","tres_azul.png","tres_rojo.png","tres_verde.png","uno_amarillo.png","uno_azul.png","uno_rojo.png","uno_verde.png"];
    let mano = [];
	const { token } = this.props.route.params;
	this.state = {
		cartas,
		mano,
		gameId: '',
		maxPlayers: '',
		gameStarted: false,
		token: token,
		nombreJugador1: "Gonzalo1",
		numCartasJugador1: mano.length,
		playerId1: 1,
		nombreJugador2: "Gonzalo2",
		numCartasJugador2: 0,
		playerId2: 2,
		nombreJugador3: "Gonzalo3",
		numCartasJugador3: 0,
		playerId3: 3,
		nombreJugador4: "Gonzalo4",
		numCartasJugador4: 0,
		playerId4: 4,
		cartaSeleccionada: false,
		carta: '',
		restart: 1,
		topDiscard: '',
		playerCards: [],
		turn: '',
		playersNumCards: [],
		gamePaused: '',
    };
  }
	logger = () => {
		console.log("Mano actual: "+ this.state.mano);
	}
readPlayerHandler = async () => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.playerId2
      }),
	};
	const requestOptions2 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.playerId3
      }),
	};
	const requestOptions3 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.playerId4
      }),
	};
	let data;
	let response;
	response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions1);
	data = await response.json();
	await this.setState({ nombreJugador2: data.alias });
	response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions2);
	data = await response.json();
	await this.setState({ nombreJugador3: data.alias });
	response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions3);
	data = await response.json();
	await this.setState({ nombreJugador4: data.alias });

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
	await this.setState({ gameId: data.gameId });
	await this.setState({ maxPlayers: data.maxPlayers });
	await this.setState({ gameStarted: data.gameStarted });
	await this.setState({ token: data.token });
	await this.setState({ playerId1: data.playersIds[0] });
	await this.setState({ playerId2: data.playersIds[1] });
	await this.setState({ playerId3: data.playersIds[2] });
	await this.setState({ playerId4: data.playersIds[3] });
	console.log('readHandler' + data);
};
playCardHandler = async () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token,
		cardToPlay: this.state.carta,
		hasSaidUnozar: true,
		colorSelected: '',
      }),
    };
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/playCard', requestOptions);
	data = await response.json();
	await this.setState({ token: data.token });
}
robarCardHandler = async () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token,
      }),
    };
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/draw', requestOptions);
	data = await response.json();
	await this.setState({ token: data.token });
	await this.setState({ numCartasJugador1: this.state.numCartasJugador1 + 1 })
}
gameResponseHandler = async () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token,
      }),
    };
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/readGame', requestOptions);
	data = await response.json();
	await this.setState({ token: data.token });
	await this.setState({ maxPlayers: data.maxPlayers });
	await this.setState({ topDiscard: data.topDiscard });
	await this.setState({ playerCards: data.playerCards });
	await this.setState({ turn: data.turn });
	await this.setState({ playersIds: data.playersIds });
	await this.setState({ playersNumCards: data.playersNumCards });
	await this.setState({ gamePaused: datagamePaused });
}	


	componentDidMount(){
		//let timer = setInterval(() => this.createMano(), 3000);
		this.createMano();
		//this.gameResponseHandler();
		this.setState({ nombreJugador2:this.state.playerId2});
		this.setState({ nombreJugador3:this.state.playerId3});
		this.setState({ nombreJugador4:this.state.playerId4});
	}
	createMano = () => {
		for(let i = 0; i< 10; i++){
			this.state.mano[i]=i
		}
		this.state.numCartasJugador1=this.state.mano.length;
	  };
	verMano = () => {
		let table = []
		for(let i = 0; i< this.state.mano.length; i++){
			table.push(<TouchableOpacity key={this.state.mano[i]} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() =>this.seleccionarCarta(i)}>
					<Image  key={this.state.mano[i]} style={styles.cartaMano} source={require('../assets/cartas/'+this.state.cartas[this.state.mano[i]])} />
				</TouchableOpacity>)
		}
		return table;
	};
	seleccionarCarta(i) {
		this.setState({ cartaSeleccionada: true })
		this.setState({ carta: i })
	}
	ponerCarta(){
		this.setState({ numCartasJugador1: this.state.numCartasJugador1-1 })
		this.state.mano.splice(this.state.carta,1);
		console.log(this.state.mano);
		this.setState({ restart: this.state.restart+1 })
		//this.playCardHandler();
	}
  render() {
		return (
		<>
			<View style={styles.screen}>
				<View style={styles.square1}>
					<View style={styles.containerTitulo}>
						<Image  style={styles.icono} source={require('../assets/logos/logo_letra.png')} />
						<View  style={styles.containterText}>
							<Text style={styles.titulo}> UNOZAR </Text> 
						</View>
					</View>
					<View style={styles.containerScreen1}>
						<View style={styles.containerScreen2}>
							<View style={styles.square3}> 
								<View style={styles.containerScreen3}>
									<View style={styles.square5}> 
										<View style={styles.containerScreen4}>
											<Image style={styles.iconoPerson2} source={{ uri: 'https://img.icons8.com/officel/2x/person-male.png' }} />
											<View style={styles.containerScreen5}>
												<Text style={styles.sizeText}> {this.state.nombreJugador2} </Text>
												<Text style={styles.sizeText}> Cartas: {this.state.numCartasJugador2}</Text>
											</View>
										</View>
									</View>
									<View style={styles.square6}> 
										<View style={styles.containerScreen4}>
											<Image style={styles.iconoPerson2} source={{ uri: 'https://img.icons8.com/officel/2x/person-male.png' }} />
											<View style={styles.containerScreen5}>
												<Text style={styles.sizeText}> {this.state.nombreJugador3} </Text>
												<Text style={styles.sizeText}> Cartas: {this.state.numCartasJugador3}</Text>
											</View>
										</View>
									</View>
									<View style={styles.square7}> 
										<View style={styles.containerScreen4}>
											<Image style={styles.iconoPerson2} source={{ uri: 'https://img.icons8.com/officel/2x/person-male.png' }} />
											<View style={styles.containerScreen5}>
												<Text style={styles.sizeText}> {this.state.nombreJugador4} </Text>
												<Text style={styles.sizeText}> Cartas: {this.state.numCartasJugador4}</Text>
											</View>
										</View>
									</View>
								</View>
							</View>
							<View style={styles.square4}> 
								<View style={styles.containerTablero}>
									<Image  style={styles.deck} source={require('../assets/cartas/reverso.png')} />
									<Image  style={styles.carta} source={require('../assets/cartas/cero_amarillo.png')} />
								</View>
							</View>
							<View style={styles.square8}> 
								<View key={this.state.restart} style={styles.containerMano}>
									<ScrollView horizontal  >
										{this.verMano()}
									</ScrollView>
								</View>
							</View>
						</View>
						<View style={styles.square2}> 
							<View style={styles.containerPerfil}>
								<Image style={styles.iconoPerson} source={{ uri: 'https://img.icons8.com/officel/2x/person-male.png' }} />
								<View style={styles.containerInfo}>
									<Text style={styles.sizeText}>{this.state.nombreJugador1}</Text>
									<Text style={styles.sizeText}> Mis cartas: {this.state.numCartasJugador1}</Text>
								</View>
								<View style={styles.containerBotones}>
									<Button title="PONER CARTA" disabled={!this.state.cartaSeleccionada} color="#e1a81a" onPress={() => this.ponerCarta()}/>
									<Button title="ROBAR CARTA" color="#e1a81a" onPress={() => robarCardHandler()}/>
									<Button title="PEDIR UNO" color="#40d81b"/>
									<Button title="PASAR" color="#e41f1f"/>
								</View>
							</View>
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
  titulo: {
	  fontSize: 50,
	right: 200,
	
  },
  containerTitulo: {
	  padding: 10,
	flex: 1,
    flexDirection: 'row',	
  },
  square1: {
    width: 1358,
    height: 60,
    backgroundColor:'rgba(140, 200, 60, 0.4)',
  },
  icono:{
	top: -5,
	width: 50,
    height: 50,
  },
  titulo:{
	  
	  lineHeight: 100,
	  fontStyle: "Roboto",
	  fontSize: 30
  },
  square2: {
	 top: 40,
    width: 240,
    height: 590,
    backgroundColor:'rgba(150, 40, 32, 0.4)',
  },
  iconoPerson: {
	width: 100,
    height: 100,
  },
  containerPerfil: {
	  padding: 50,
	  flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
	alignItems: "center",
  },
  containerInfo: {
	  padding: 30,
  },
  containerBotones: {
	padding: 30,
	flexDirection: 'column',
  },
  sizeText :{
	  fontStyle: "Roboto",
	  fontSize: 20  
  },
  square3 : {
	top: 40,
	width: 1117,
    height: 150,
    
  },
  containerScreen1 :{
	 flexDirection: 'row', 
  },
  containerScreen2: {
	  
  },
  containterText : {
	 top: -28,
  },
  square4: {
	  top: 40,
	width: 1117,
    height: 260,
	 backgroundColor:'rgba(100, 100, 100, 0.4)',   
  },
  containerScreen3: {
	flexDirection: 'row',   
  },
  square5: {
	width: 372.3,
    height: 150,
    backgroundColor:'rgba(145, 20, 20, 0.4)',  
  },
  square6: {
	width: 372.3,
    height: 150,
    backgroundColor:'rgba(20, 145, 20, 0.4)',   
  },
  square7: {
	width: 372.3,
    height: 150,
    backgroundColor:'rgba(20, 20, 145, 0.4)',   
  },
  iconoPerson2: {
	top: 20,
	left: 40,
	width: 100,
    height: 100,  
  },
  containerScreen4: {
	flexDirection: 'row',     
  },
  containerScreen5: {
	top: 40,
	left: 80,
	flexDirection: 'column',     
  },
  square8: {
	top: 40,
	width: 1117,
    height: 180,
	backgroundColor:'rgba(224, 65, 127, 0.4)',    
  },
  deck: {
	top: 50,
	left: 70,
	resizeMode: "contain",
	height: 150,
	width: 200
  },
  containerTablero: {
	 flexDirection: 'row',    
  },
  carta: {
	top: 50,
	left: 250,
	resizeMode: "contain",
	height: 150,
	width: 200  
  },
  containerMano: {
	 top: 15,
	flexDirection: 'row', 
	justifyContent: 'center'
  },
  cartaMano: {
	flex: 1,
	top: 10,
	resizeMode: "contain",
	height: 150,
	width: 120 
  },
  cartaTouchable: {
	 flex: 1,
  },
  
});

export default Partida;
