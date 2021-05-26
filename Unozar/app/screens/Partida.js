import React from "react";
import { Alert, Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Timer , ScrollView, ImageBackground } from "react-native";
import { Menu } from 'primereact/menu';
import CustomText from '../assets/idioma/CustomText.js' 

class Partida extends React.Component {
  constructor(props) {
    super(props);
	const { token } = this.props.route.params;
	const { miId } = this.props.route.params;
	const { español } = this.props.route.params;
	const { CustomTextLocal } = this.props.route.params;
	this.state = {
		miId: miId,
		gameId: '',
		maxPlayers: '',
		gameStarted: false,
		token: token,
		numCartasJugador1: '',
		playerId1: 1,
		numCartasJugador2: 0,
		playerId2: 2,
		numCartasJugador3: 0,
		playerId3: 3,
		numCartasJugador4: 0,
		playerId4: 4,
		jugadores: [],
		avatarJugadores: ['1','0','2','3'],
		turnos: [],
		miTurno: 0,
		turnoJugadores: ['rgba(145, 20, 20, 0.4)','rgba(145, 20, 20, 0.4)','rgba(145, 20, 20, 0.4)','rgba(145, 20, 20, 0.4)'],
		cartaSeleccionada: false,
		carta: '',
		cartaColor: 'R',
		restart: 1,
		topDiscard: '1BX',
		turn: 0,
		gamePaused: '',
		estado: 1,
		showColor: false,
		hasSaidUnozar: false,
		playerNumCards: [0,0,0,0],
		cambiaTurno: [0,1,2,3],
		playerCards: [],
		tablero: '2',
		español: español,
		CustomTextLocal: CustomTextLocal,
		dorso:'0',
    };
  }
readPlayerHandler = async (i,id,turno) => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: id
      }),
	};
	let data;
	let response;
	let statusCode
	await console.log('READ PLAYER [I: '+i+', ID: '+id+']')
	response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions1);
	data = await response.json();
	statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		this.state.jugadores[i]= await data.alias
		this.state.turnos[i]= await turno
		this.state.avatarJugadores[i]= await data.avatarId
		if(this.state.miId=id){
			await this.setState({ tablero: data.boardId });
			await this.setState({ dorso: data.cardsId });
		}
		console.log('JUGADOR: '+data.alias+', TIENE DE TURNO: '+turno)
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
		if(await this.state.maxPlayers ==4){
			await this.setState({ playerId3: data.playersIds[2] });
			await this.setState({ playerId4: data.playersIds[3] });
			if( await this.state.miId==this.state.playerId1 ){
				await this.readPlayerHandler(0,this.state.playerId1,0);
				await this.setState({ miTurno: 0 });
				await this.readPlayerHandler(1,this.state.playerId2,1);
				await this.readPlayerHandler(2,this.state.playerId3,2);
				await this.readPlayerHandler(3,this.state.playerId4,3);
			}else if( await this.state.miId==this.state.playerId2 ){
				await this.readPlayerHandler(0,this.state.playerId2,1);
				await this.readPlayerHandler(1,this.state.playerId3,2);
				await this.setState({ miTurno: 1 });
				await this.readPlayerHandler(2,this.state.playerId4,3);
				await this.readPlayerHandler(3,this.state.playerId1,0);
			}else if( await this.state.miId==this.state.playerId3 ){
				await this.readPlayerHandler(0,this.state.playerId3,2);
				await this.readPlayerHandler(1,this.state.playerId4,3);
				await this.readPlayerHandler(2,this.state.playerId1,0);
				await this.setState({ miTurno: 2 });
				await this.readPlayerHandler(3,this.state.playerId2,1);
			}else if( await this.state.miId==this.state.playerId4 ){
				await this.readPlayerHandler(0,this.state.playerId4,3);
				await this.readPlayerHandler(1,this.state.playerId1,0);
				await this.readPlayerHandler(2,this.state.playerId2,1);
				await this.readPlayerHandler(3,this.state.playerId3,2);
				await this.setState({ miTurno: 3 });
			}
		}else if (await this.state.maxPlayers ==3){
			await this.setState({ playerId3: data.playersIds[2] });
			if( await this.state.miId==this.state.playerId1 ){
				await this.readPlayerHandler(0,this.state.playerId1,0);
				await this.setState({ miTurno: 0 });
				await this.readPlayerHandler(1,this.state.playerId2,1);
				await this.readPlayerHandler(2,this.state.playerId3,2);
			}else if( await this.state.miId==this.state.playerId2 ){
				await this.readPlayerHandler(0,this.state.playerId2,1);
				await this.readPlayerHandler(1,this.state.playerId3,2);
				await this.setState({ miTurno: 1 });
				await this.readPlayerHandler(2,this.state.playerId1,0);
			}else if( await this.state.miId==this.state.playerId3 ){
				await this.readPlayerHandler(0,this.state.playerId3,2);
				await this.readPlayerHandler(1,this.state.playerId1,0);
				await this.setState({ miTurno: 2 });
				await this.readPlayerHandler(2,this.state.playerId2,1);
			}
		}else{
			if( await this.state.miId==this.state.playerId1 ){
				await this.readPlayerHandler(0,this.state.playerId1,0);
				await this.setState({ miTurno: 0 });
				await this.readPlayerHandler(1,this.state.playerId2,1);
			}else if( await this.state.miId==this.state.playerId2 ){
				await this.readPlayerHandler(0,this.state.playerId2,1);
				await this.setState({ miTurno: 1 });
				await this.readPlayerHandler(1,this.state.playerId1,0);
			}
		}
		console.log('readHandler[' + this.state.gameId,this.state.maxPlayers,this.state.gameStarted,this.state.token,this.state.playerId1,this.state.playerId2,this.state.playerId3,this.state.playerId4 +']');
	}
};
playCardHandler = async () => {
	if(this.state.turn!=this.state.miTurno){
		alert('No es tu turno')
		return
	}
	await console.log('PONER CARTA: '+ this.state.playerCards[this.state.carta]);
	if(await this.state.playerCards[this.state.carta]!="XXC" || await this.state.playerCards[this.state.carta]=="XX4"){
		await this.setState({ cartaColor: this.state.playerCards[this.state.carta].slice(1,2) })
	}
	await this.setState({ showColor: false })	
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
	await this.setState({ estado: 1})
	const response = await fetch('https://unozar.herokuapp.com/game/playCard', requestOptions);
	data = await response.json();
	let statusCode = await response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		if(await this.state.playerNumCards[0]==1){
			await clearInterval(this.timer1);
			await alert('!!!VICTORIA!!!')
			await this.props.navigation.push("MenuPrincipal", { playerId: this.state.miId, token: this.state.token, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal });
		}
		await this.setState({ token: data.token });
		await this.setState({hasSaidUnozar: false });
	}
	
}
robarCardHandler = async () => {
	if(this.state.turn!=this.state.miTurno){
		alert('No es tu turno')
		return
	}
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token,
      }),
    };
	await this.setState({ estado: 1})
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/draw', requestOptions);
	data = await response.json();
	let statusCode = response.status;
	if( await statusCode != 200 ){
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
	await clearInterval(this.timer1);
	let data;
	const response = await fetch('https://unozar.herokuapp.com/game/quit', requestOptions)
	data = await response.json();
	let statusCode = response.status;
	if( await statusCode != 200 ){
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token});
		console.log("salido");
		await this.props.navigation.push("MenuPrincipal", { token: this.state.token, playerId: this.state.miId, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal});
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
	let statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token });
		await this.setState({ maxPlayers: data.maxPlayers });	
		await this.setState({ playersIds: data.playersIds });
		if(await this.state.turn!=data.turn || await this.state.topDiscard!=data.topDiscard){
			for(let i = 0; i<this.state.maxPlayers; i++){
				if(await this.state.turnos[i]==data.turn){
					this.state.turnoJugadores[0]= 'rgba(145, 20, 20, 0.4)'
					this.state.turnoJugadores[1]= 'rgba(145, 20, 20, 0.4)'
					this.state.turnoJugadores[2]= 'rgba(145, 20, 20, 0.4)'
					this.state.turnoJugadores[3]= 'rgba(145, 20, 20, 0.4)'
					this.state.turnoJugadores[i]= 'rgba(69, 213, 27, 0.4)'
					break;
				}
			}
			await this.setState({ cambiaTurno: this.state.cambiaTurno[0]+1 });
			await this.setState({ cambiaTurno: this.state.cambiaTurno[1]+1 });
			await this.setState({ cambiaTurno: this.state.cambiaTurno[2]+1 });
			await this.setState({ cambiaTurno: this.state.cambiaTurno[3]+1 });
			for(let i = 0; i<this.state.maxPlayers; i++){
				await console.log('NUMERO DE CARTAS DE '+i+': '+ data.playersNumCards[this.state.turnos[i]])
				this.state.playerNumCards[i]=await data.playersNumCards[this.state.turnos[i]]
				if( await this.state.playerNumCards[i] == 0){
					clearInterval(this.timer1);
					await alert('DERROTA')
					await this.props.navigation.push("MenuPrincipal", { playerId: this.state.miId, token: this.state.token, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal })
				}
			}
			await this.setState({ restart: this.state.restart+1 }) 
		}
		await this.setState({ topDiscard: data.topDiscard });	
		await this.setState({ turn: data.turn });
		await this.setState({ gamePaused: data.gamePaused });
		await this.setState({ playerCards: data.playerCards }) 
		await console.log('readGameResponse [' + 'READ TOKEN: '+this.state.token,this.state.maxPlayers,data.topDiscard,this.state.playerCards,this.state.turn,this.state.playersIds,this.state.playerNumCards,this.state.gamePaused +']');
	}
}	
	
	estados = async () => {
		
		if(this.state.estado==0){
			await console.log('ESTADO TOKEN0: '+this.state.token)
			await this.gameResponseHandler();
		}else if(this.state.estado==1){ //Leer sala
			await console.log('ESTADO ACTUAL: '+this.state.estado);
			await this.gameResponseHandler();
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
		}else if(this.state.estado==4){
			await clearInterval(this.timer1);
			await this.props.navigation.push("MenuPrincipal", { playerId: this.state.miId, token: this.state.token, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal });
		}else if(this.state.estado==5){
			await this.salirHandler()
		}
	};
	componentDidMount(){
		//console.log('		MI ID: '+this.state.miId)
		this.readHandler();
		this.timer1 = setInterval(() => this.estados(), 2000);
		//this.createplayerCards();
	}
	createplayerCards = () => {
		this.state.playerCards[0]='XX4'
		this.state.playerCards[1]='XXC'
		this.state.playerCards[2]='1RX'
		this.state.playerCards[3]='1BX'
		this.state.playerCards[4]='1YX'
		this.state.playerCards[5]='1GX'
		this.state.playerCards[6]='1RX'
		this.state.playerCards[7]='2BX'
		this.state.playerCards[8]='2YX'
		this.state.playerCards[9]='2GX'
		this.state.playerCards[10]='2RX'
		this.state.playerCards[11]='3BX'
		this.state.playerCards[12]='3YX'
		this.state.playerCards[13]='3GX'
		this.state.playerCards[14]='3RX'
		this.state.playerCards[15]='4BX'
		this.state.playerCards[16]='4YX'
		this.state.playerCards[17]='4GX'
		this.state.playerCards[18]='4RX'
		this.state.playerCards[19]='5BX'
		this.state.playerCards[20]='5YX'
		this.state.playerCards[21]='5GX'
		this.state.playerCards[22]='5RX'
		this.state.playerCards[23]='6BX'
		this.state.playerCards[24]='6YX'
		this.state.playerCards[25]='6GX'
		this.state.playerCards[26]='6RX'
		this.state.playerCards[27]='7BX'
		this.state.playerCards[28]='7YX'
		this.state.playerCards[29]='7GX'
		this.state.playerCards[30]='7RX'
		this.state.playerCards[31]='8BX'
		this.state.playerCards[32]='8YX'
		this.state.playerCards[33]='8GX'
		this.state.playerCards[34]='8RX'
		this.state.playerCards[35]='9BX'
		this.state.playerCards[36]='9YX'
		this.state.playerCards[37]='9GX'
		this.state.playerCards[38]='XR2'
		this.state.playerCards[39]='XB2'
		this.state.playerCards[40]='XY2'
		this.state.playerCards[41]='XG2'
		this.state.playerCards[42]='XRR'
		this.state.playerCards[43]='XBR'
		this.state.playerCards[44]='XYR'
		this.state.playerCards[45]='XGR'
		this.state.playerCards[46]='XRS'
		this.state.playerCards[47]='XBS'
		this.state.playerCards[48]='XYS'
		this.state.playerCards[49]='XGS'
		this.state.playerCards[50]='9RX'
		this.state.playerNumCards[0]=this.state.playerCards.length;
		this.setState({ restart: this.state.restart+1 })
	 };
	verplayerCards = () => {
		let table = []
		for(let i = 0; i< this.state.playerCards.length; i++){
			table.push(<TouchableOpacity key={this.state.playerCards[i]+i} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() =>this.seleccionarCarta(i)}>
					<Image  key={this.state.playerCards[i]+i} style={styles.cartaplayerCards} source={require('../assets/cartas/'+this.state.playerCards[i]+'.png')} />
				</TouchableOpacity>)
		}
		
		return table;
	};
	seleccionarCarta(i) {
		this.setState({ cartaSeleccionada: true })
		this.setState({ carta: i })
		
		if(this.state.playerCards[i]=="XXC" || this.state.playerCards[i]=="XX4"){
			console.log(this.state.playerCards[i])
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
							<ImageBackground style={styles.tablero} source={require('../assets/tableros/'+this.state.tablero+'.png')}>
								<View style={styles.square3}> 
									<View style={styles.containerScreen3}>
										{this.state.maxPlayers>=2&&
										<View key={this.state.cambiaTurno[1]} style={[styles.container, { width: 372.3, height: 150, backgroundColor:this.state.turnoJugadores[1] }]}> 
											<View style={styles.containerScreen4}>
												<Image style={styles.iconoPerson2}  source={require('../assets/avatares/'+this.state.avatarJugadores[1]+'.png')} />
												<View style={styles.containerScreen5}>
														<Text style={styles.sizeText}> {this.state.jugadores[1]} </Text>
														<Text style={styles.sizeText}> Cartas: {this.state.playerNumCards[1]}</Text>
												</View>
											</View>
										</View>
										}
										{this.state.maxPlayers>=3&&
										<View key={this.state.cambiaTurno[2]} style={[styles.container, { width: 372.3, height: 150, backgroundColor:this.state.turnoJugadores[2] }]}> 
											<View style={styles.containerScreen4}>
												<Image style={styles.iconoPerson2} source={require('../assets/avatares/'+this.state.avatarJugadores[2]+'.png')}/>
												<View style={styles.containerScreen5}>
														<Text style={styles.sizeText}> {this.state.jugadores[2]} </Text>
														<Text style={styles.sizeText}> Cartas: {this.state.playerNumCards[2]}</Text>
												</View>
											</View>
										</View>
										}
										{this.state.maxPlayers==4&&
										<View key={this.state.cambiaTurno[3]} style={[styles.container, { width: 372.3, height: 150, backgroundColor:this.state.turnoJugadores[3] }]}> 
											<View style={styles.containerScreen4}>
												<Image style={styles.iconoPerson2} source={require('../assets/avatares/'+this.state.avatarJugadores[3]+'.png')} />
												<View style={styles.containerScreen5}>
														<Text style={styles.sizeText}> {this.state.jugadores[3]} </Text>
														<Text style={styles.sizeText}> Cartas: {this.state.playerNumCards[3]}</Text>
												</View>
											</View>
										</View>
										}
									</View>
								</View>
								
									<View key={this.state.restart} style={styles.containerTablero}>
										<Image  style={styles.deck} source={require('../assets/dorsos/'+this.state.dorso+'.png')} />
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
									<View key={-this.state.restart} style={styles.containerplayerCards}>
										<ScrollView horizontal  >
											{this.verplayerCards()}
										</ScrollView>
									</View>
							</ImageBackground>				
						</View>
						<View key={this.state.cambiaTurno[0]} style={[styles.container, { top: 40, width: 240, height: 590, backgroundColor:this.state.turnoJugadores[0] }]}> 
							<View style={styles.containerPerfil}>
								<Image style={styles.iconoPerson} source={require('../assets/avatares/'+this.state.avatarJugadores[0]+'.png')} />
								<View style={styles.containerInfo}>
										<Text style={styles.sizeText}>{this.state.jugadores[0]}</Text>
										<Text style={styles.sizeText}> Mis cartas: {this.state.playerNumCards[0]}</Text>
								</View>
								<View style={styles.containerBotones}>
									<Button title="PONER CARTA"  color="#e1a81a" onPress={() => this.setState({ estado: 2 })}/>
									<Button title="ROBAR CARTA"  color="#e1a81a" onPress={() => this.setState({ estado: 3})}/>
									<Button title="UNOZAR"  color="#40d81b" onPress={() => this.setState({ hasSaidUnozar: true })}/>
									<Button title="SALIR" color="#40d81b" onPress={() => this.setState({ estado: 5})}/>
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
    height: 440,
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
  containerplayerCards: {
	top: 100,
	flexDirection: 'row', 
	justifyContent: 'center'
  },
  cartaplayerCards: {
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
  tablero: {
	top: 40,
	width: 1117,
    height: 590,  
  },
});

export default Partida;
