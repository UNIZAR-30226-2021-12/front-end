import React from "react";
import { Alert, Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Timer , ScrollView } from "react-native";
import { Menu } from 'primereact/menu';
import {RNRestart} from 'react-native-restart';

class Partida extends React.Component {
  constructor(props) {
    super(props);
	const { token } = this.props.route.params;
	this.state = {
		mano: [],
		gameId: '',
		maxPlayers: '',
		gameStarted: false,
		token: token,
		nombreJugador1: "Gonzalo1",
		numCartasJugador1: '',
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
		cartaColor: '',
		restart: 1,
		topDiscard: '../assets/cartas/reverso.png',
		turn: 0,
		gamePaused: '',
		estado: 1,
		showColor: false,
		hasSaidUnozar: false,
    };
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
	await this.setState({ nombreJugador2:this.state.playerId2});
	await this.setState({ nombreJugador3:this.state.playerId3});
	await this.setState({ nombreJugador4:this.state.playerId4});
	console.log('readHandler[' + this.state.gameId,this.state.maxPlayers,this.state.gameStarted,this.state.token,this.state.playerId1,this.state.playerId2,this.state.playerId3,this.state.playerId4 +']');
};
playCardHandler = async () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token,
		cardToPlay: this.state.carta,
		hasSaidUnozar: this.state.hasSaidUnozar,
		colorSelected: this.state.cartaColor,
      }),
    };
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/playCard', requestOptions);
	data = await response.json();
	await this.setState({ token: data.token });
	await this.setState({hasSaidUnozar: false });
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
	await console.log('ROBAR TOKEN: '+this.state.token)
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
	await this.setState({ mano: data.playerCards });
	await this.setState({ turn: data.turn });
	await this.setState({ playersIds: data.playersIds });
	await this.setState({ gamePaused: data.gamePaused });
	await this.setState({ numCartasJugador1: this.state.mano.length });
	await this.setState({ restart: this.state.restart+1 })
	await this.setState({ numCartasJugador1: datos.playerNumCards[0]})
	await this.setState({ numCartasJugador2: datos.playerNumCards[1]})
	await this.setState({ numCartasJugador3: datos.playerNumCards[2]})
	await this.setState({ numCartasJugador4: datos.playerNumCards[3]})
	await console.log('readGameResponse [' + 'READ TOKEN: '+this.state.token,this.state.maxPlayers,data.topDiscard,this.state.mano,this.state.turn,this.state.playersIds,this.state.playersNumCards,this.state.gamePaused +']');
}	

	estados = () => {
		
		if(this.state.estado==0){
			console.log('ESTADO TOKEN: '+this.state.token)
		}else if(this.state.estado==1){
			console.log('ESTADO ACTUAL: '+this.state.estado);
			console.log('PLAYERID1: '+this.state.playerId1)
			this.gameResponseHandler();
			
			this.setState({ estado: 0})
		}else if(this.state.estado==2){
			console.log('ESTADO ACTUAL: '+this.state.estado);
			this.playCardHandler();
			this.setState({ estado: 1})
			let timer2 = setTimeout(() => this.gameResponseHandler(), 61000);
		}else if(this.state.estado==3){
			console.log('ESTADO ACTUAL: '+this.state.estado);
			this.robarCardHandler();
			this.setState({ estado: 1})
			let timer2 = setTimeout(() => this.gameResponseHandler(), 61000);
		}	
	}
	componentDidMount(){
		//this.readHandler();
		//let timer1 = setInterval(() => this.estados(), 2000);
		this.createMano();
		
	}
	createMano = () => {
		this.state.mano[0]='XX4'
		this.state.mano[1]='XXC'
		this.state.mano[2]='1RX'
		this.state.mano[3]='1BX'
		this.state.mano[4]='1YX'
		this.state.mano[5]='1GX'
		this.state.mano[6]='XR2'
		this.state.mano[7]='XB2'
		this.state.mano[8]='XY2'
		this.state.mano[9]='XG2'
		this.state.mano[10]='XRR'
		this.state.mano[11]='XBR'
		this.state.mano[12]='XYR'
		this.state.mano[13]='XGR'
		this.state.mano[14]='XRS'
		this.state.mano[15]='XBS'
		this.state.mano[16]='XYS'
		this.state.mano[17]='XGS'
		this.state.numCartasJugador1=this.state.mano.length;
		this.setState({ restart: this.state.restart+1 })
	 };
	verMano = () => {
		let table = []
		for(let i = 0; i< this.state.mano.length; i++){
			table.push(<TouchableOpacity key={this.state.mano[i]+i} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() =>this.seleccionarCarta(i)}>
					<Image  key={this.state.mano[i]+i} style={styles.cartaMano} source={require('../assets/cartas/'+this.state.mano[i]+'.png')} />
				</TouchableOpacity>)
		}
		
		return table;
	};
	
	seleccionarCarta(i) {
		this.setState({ cartaSeleccionada: true })
		this.setState({ carta: i })
		
		if(this.state.mano[i]=="XXC" || this.state.mano[i]=="XX4"){
			console.log(this.state.mano[i])
			alert('Selecciona un color');
			this.setState({ showColor: true })
		}else{
			this.setState({ showColor: false })
		}
	}
	ponerCarta(){
		if(this.state.mano[this.state.carta]!="XXC" || this.state.mano[this.state.carta]!="XX4"){
			this.setState({ cartaColor: this.state.mano[this.state.carta].slice(1,2) })
		}
		this.setState({ topDiscard: this.state.mano[this.state.carta]})
		this.setState({ estado: 2 })
		this.setState({ showColor: false })		
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
								<View key={this.state.restart} style={styles.containerTablero}>
									
									<Image  style={styles.deck} source={require('../assets/cartas/reverso.png')} />
									<Image  style={styles.carta} source={require('../assets/cartas/reverso.png')} />
									<View style={styles.containerColor}>
										{this.state.showColor &&
											<>
											<Button title="Rojo" color="#f71313" onPress={() => this.setState({ cartaColor: 'R'})}/>
											<Button title="Azul" color="#1385f7" onPress={() => this.setState({ cartaColor: 'B'})}/>
											<Button title="Amarillo" color="#f4f713" onPress={() => this.setState({ cartaColor: 'Y'})}/>
											<Button title="Verde" color="#47f713" onPress={() => this.setState({ cartaColor: 'V'})}/>
											</>
										}
									</View>
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
									{this.state.showColor &&
										<Text style={styles.sizeText}> Color carta: {this.state.cartaColor}</Text>
									}
								</View>
								<View style={styles.containerBotones}>
									<Button title="PONER CARTA" disabled={!this.state.cartaSeleccionada&&this.state.turn==1} color="#e1a81a" onPress={() => this.ponerCarta()}/>
									<Button title="ROBAR CARTA" disabled={this.state.turn==1}color="#e1a81a" onPress={() => this.setState({ estado: 3})}/>
									<Button title="UNOZAR" color="#40d81b" onPress={() => this.setState({ hasSaidUnozar: true })}/>
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
  containerColor: {
	flexDirection: 'column', 
	left: 500,	
	top:50,
  },
});

export default Partida;
