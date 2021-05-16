import React from "react";
import { Alert, Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Timer , ScrollView } from "react-native";
import { Menu } from 'primereact/menu';

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
		topDiscard: 'reverso',
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
	if( await data.status != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ nombreJugador2: data.alias });	
	}
	response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions2);
	data = await response.json();
	if( await data.status != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ nombreJugador3: data.alias });
	}
	response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions3);
	data = await response.json();
	if( await data.status != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ nombreJugador4: data.alias });
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
		await this.setState({ nombreJugador2:this.state.playerId2});
		await this.setState({ nombreJugador3:this.state.playerId3});
		await this.setState({ nombreJugador4:this.state.playerId4});
		console.log('readHandler[' + this.state.gameId,this.state.maxPlayers,this.state.gameStarted,this.state.token,this.state.playerId1,this.state.playerId2,this.state.playerId3,this.state.playerId4 +']');
	}
};
playCardHandler = async () => {
	console.log('PONER CARTA: '+ this.state.mano[this.state.carta]);
	if(this.state.mano[this.state.carta]=="XXC"){
		this.setState({ cartaColor: this.state.mano[this.state.carta].slice(1,2) })
		this.state.topDiscard='X'+this.state.cartaColor+'C'
	}else if(this.state.mano[this.state.carta]=="XX4"){
		this.setState({ cartaColor: this.state.mano[this.state.carta].slice(1,2) })
		this.state.topDiscard='X'+this.state.cartaColor+'C'
	}else{
		this.setState({ topDiscard: this.state.mano[this.state.carta]})
		this.setState({ cartaColor: this.state.mano[this.state.carta].slice(1,2) })
	}
	this.setState({ showColor: false })	
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
	if( await data.status != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token });
		await this.setState({hasSaidUnozar: false });
	}
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
	if( await data.status != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token });
		await this.setState({ numCartasJugador1: this.state.numCartasJugador1 + 1 })
		await console.log('ROBAR TOKEN: '+this.state.token)
	}
}
salirHandler = async () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token
      }),
    };
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/quit', requestOptions)
	data = await response.json();
	if( await data.status != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token});
		console.log("salido");
	}
};
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
	if( await data.status != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token });
		await this.setState({ maxPlayers: data.maxPlayers });
		await this.setState({ topDiscard: data.topDiscard });
		await this.setState({ mano: data.playerCards });
		await this.setState({ turn: data.turn });
		await this.setState({ playersIds: data.playersIds });
		await this.setState({ gamePaused: data.gamePaused });
		await this.setState({ numCartasJugador1: this.state.mano.length });
		if(await this.state.playersNumcards[0]!= data.playersNumcards[0] || await this.state.playersNumcards[1]!= data.playersNumcards[1]
		   || await this.state.playersNumcards[2]!= data.playersNumcards[2] || await this.state.playersNumcards[3]!= data.playersNumcards[3]){
				await this.setState({ restart: this.state.restart+1 })   
		}
		await this.setState({ numCartasJugador1: data.playersNumCards[0]})
		await this.setState({ numCartasJugador2: data.playersNumCards[1]})
		await this.setState({ numCartasJugador3: data.playersNumCards[2]})
		await this.setState({ numCartasJugador4: data.playersNumCards[3]})
		
		await console.log('readGameResponse [' + 'READ TOKEN: '+this.state.token,this.state.maxPlayers,data.topDiscard,this.state.mano,this.state.turn,this.state.playersIds,this.state.playersNumCards,this.state.gamePaused +']');
	}
}	

	estados = async () => {
		
		if(this.state.estado==0){
			await console.log('ESTADO TOKEN0: '+this.state.token)
		}else if(this.state.estado==1){ //Leer sala
			await console.log('ESTADO ACTUAL: '+this.state.estado);
			await this.gameResponseHandler();
			/*if(this.state.turn!=0){
				let timer2 = await setTimeout(() => this.gameResponseHandler(), 61000);
			}*/
			await this.setState({ estado: 0})
		}else if(this.state.estado==2){ // Jugar carta
			await console.log('ESTADO ACTUAL: '+this.state.estado);
			await this.playCardHandler();
			await console.log('ESTADO TOKEN TRAS JUGAR CARTA: '+this.state.token)
			await this.setState({ estado: 1})
		}else if(this.state.estado==3){ //Robar carta
			await console.log('ESTADO ACTUAL: '+this.state.estado);
			await this.robarCardHandler();
			await this.setState({ estado: 1})
			//let timer2 = await setTimeout(() => this.gameResponseHandler(), 61000);
		}		
	}
	componentDidMount(){
		this.readHandler();
		this.timer1 = setInterval(() => this.estados(), 2000);
		//this.createMano();
		
	}
	createMano = () => {
		this.state.mano[0]='XX4'
		this.state.mano[1]='XXC'
		this.state.mano[2]='1RX'
		this.state.mano[3]='1BX'
		this.state.mano[4]='1YX'
		this.state.mano[5]='1GX'
		this.state.mano[6]='1RX'
		this.state.mano[7]='2BX'
		this.state.mano[8]='2YX'
		this.state.mano[9]='2GX'
		this.state.mano[10]='2RX'
		this.state.mano[11]='3BX'
		this.state.mano[12]='3YX'
		this.state.mano[13]='3GX'
		this.state.mano[14]='3RX'
		this.state.mano[15]='4BX'
		this.state.mano[16]='4YX'
		this.state.mano[17]='4GX'
		this.state.mano[18]='4RX'
		this.state.mano[19]='5BX'
		this.state.mano[20]='5YX'
		this.state.mano[21]='5GX'
		this.state.mano[22]='5RX'
		this.state.mano[23]='6BX'
		this.state.mano[24]='6YX'
		this.state.mano[25]='6GX'
		this.state.mano[26]='6RX'
		this.state.mano[27]='7BX'
		this.state.mano[28]='7YX'
		this.state.mano[29]='7GX'
		this.state.mano[30]='7RX'
		this.state.mano[31]='8BX'
		this.state.mano[32]='8YX'
		this.state.mano[33]='8GX'
		this.state.mano[34]='8RX'
		this.state.mano[35]='9BX'
		this.state.mano[36]='9YX'
		this.state.mano[37]='9GX'
		this.state.mano[38]='XR2'
		this.state.mano[39]='XB2'
		this.state.mano[40]='XY2'
		this.state.mano[41]='XG2'
		this.state.mano[42]='XRR'
		this.state.mano[43]='XBR'
		this.state.mano[44]='XYR'
		this.state.mano[45]='XGR'
		this.state.mano[46]='XRS'
		this.state.mano[47]='XBS'
		this.state.mano[48]='XYS'
		this.state.mano[49]='XGS'
		this.state.mano[50]='9RX'
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
									<Image style={styles.carta} source={require('../assets/cartas/'+this.state.topDiscard+'.png')} />
									<View style={styles.containerColor}>
										{this.state.showColor &&
											<>
											<Button title="Rojo" color="#f71313" onPress={() => this.setState({ cartaColor: 'R'})}/>
											<Button title="Azul" color="#1385f7" onPress={() => this.setState({ cartaColor: 'B'})}/>
											<Button title="Amarillo" color="#f4f713" onPress={() => this.setState({ cartaColor: 'Y'})}/>
											<Button title="Verde" color="#47f713" onPress={() => this.setState({ cartaColor: 'G'})}/>
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
									<Button title="PONER CARTA" disabled={!this.state.cartaSeleccionada&&this.state.turn==1} color="#e1a81a" onPress={() => this.setState({ estado: 2 })}/>
									<Button title="ROBAR CARTA" color="#e1a81a" onPress={() => this.setState({ estado: 3})}/>
									<Button title="UNOZAR" color="#40d81b" onPress={() => this.setState({ hasSaidUnozar: true })}/>
									<Button title="READ GAME" color="#40d81b" onPress={() => this.gameResponseHandler()}/>
									<Button title="SALIR" color="#40d81b" onPress={() => this.salirHandler()}/>
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
