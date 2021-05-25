import React, {useRef, Component } from "react";
import { Button, StyleSheet, View, Alert, TextInput, Text, Timer } from "react-native";
import {Column} from 'primereact/Column';
import Inicio from './Inicio.js'
import { Menu } from 'primereact/menu';
import {DataTable} from 'primereact/DataTable';
import { Paginator } from 'primereact/paginator';

import Registro from './Registro.js';
import CustomText from '../assets/idioma/CustomText.js' 

export default class MenuPrincipal extends Component {
  constructor(props) {
    super(props);
	const { playerId } = this.props.route.params;
	const { token } = this.props.route.params;
	const { español } = this.props.route.params;
	const { CustomTextLocal } = this.props.route.params;
    this.state = {
		show1: false,
		show2: false,
		show3: false,
		isprivate: false,
		maxPlayers: 2,
		numBots: 0,
		alias: null,
		password: null,
		email: null,
		playerId: playerId,
		token: token,
		gameId: '',
		gameStarted: false,
		playersIds: [],
		gameId: '',
		gift: '',
		giftClaimedToday: false,
		español: español,
		CustomTextLocal: CustomTextLocal,
	};
	this.items = [
					{
						label: 'Perfil',
						icon: 'pi pi-user',
						command: () => {this.setState({show1: false}), this.props.navigation.push("Perfil" , { token: this.state.token, miId: this.state.playerId} )}
					},
					{
						label: 'Amigos',
						icon: 'pi pi-users',
						command: () => {this.setState({show1: false}), this.props.navigation.push("Amigos" , { token: this.state.token, miId: this.state.playerId, invitar: false} )}
					},
					{
						label: 'Tienda',
						icon: 'pi pi-users',
						command: () => {this.setState({show1: false}), this.props.navigation.push("Tienda" , { token: this.state.token, miId: this.state.playerId} )}
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
						command: () => {this.setState({show1: false}),this.props.navigation.push("Inicio")}
					}
					
		];
	}
	componentDidMount(){
		this.readHandler();
		//let timer = setInterval(() => alert("aux"), 3000);
	}
readHandler = async () => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: this.state.playerId
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
		await this.setState({ giftClaimedToday: data.giftClaimedToday});
		if(await !this.state.giftClaimedToday){
			await this.ruleta()
		}
	}
};	
deleteUser = () => {
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		id: "2c9248de78ffbf080178ffc119c30000-601",
	  }),
	};
	fetch(`https://unozar.herokuapp.com/player/deletePlayer/`, requestOptions)
	  .then(
		function(response) {
		  if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
			  response.status);
			return;
		  }

		  // Examine the text in the response
		  response.json().then(function(data) {
			console.log(data);
		  });
		}
	  )
	  
	
};  
crearPartida = async() => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isPrivate: this.state.isprivate,
        maxPlayers: this.state.maxPlayers,
		numBots: this.state.numBots,
		token: this.state.token,
		bet: 300,
      }),
    };
		let data;
		let response;
		response = await fetch('https://unozar.herokuapp.com/game/create', requestOptions)
		data = await response.json();
		await this.setState({ token: data.token });
		await console.log("entrado " + this.state.token);
		if((this.state.maxPlayers-this.state.numBots)==1){
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
			this.props.navigation.push("Partida", { token: this.state.token, miId: this.state.playerId});
		}else{
			this.props.navigation.push("EsperaPartida", { token: this.state.token, miId: this.state.playerId, numBots: this.state.numBots, español: this.state.español, CustomTextLocal: this.state.CustomTextLocal});
		}
};
joinPartida = async() => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: this.state.gameId,
		token: this.state.token
      }),
    };
		console.log('GAME ID PRIVATE: '+ this.state.gameId);
		let data;
		let response;
		await console.log("intentando entrar " + this.state.token);
		response = await fetch('https://unozar.herokuapp.com/game/joinPrivate', requestOptions)
		data = await response.json();
		await this.setState({ token: data.token });
		await console.log("joineado " + this.state.token);
		await this.props.navigation.push("EsperaPartida", { token: this.state.token , miId: this.state.playerId, numBots: this.state.numBots});
};
joinPartidaPublica = async() => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numPlayers: this.state.maxPlayers,
		token: this.state.token
      }),
    };
		console.log('GAME ID: PUBLIC');
		let data;
		let response;
		await console.log("intentando entrar " + this.state.token);
		response = await fetch('https://unozar.herokuapp.com/game/joinPublic', requestOptions)
		data = await response.json();
		await this.setState({ token: data.token });
		await console.log("joineado " + this.state.token);
		await this.props.navigation.push("EsperaPartida", { token: this.state.token , miId: this.state.playerId});
};
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
	await this.setState({ token: data.token});
	console.log("salido");
};	
readPlayerHandler = () => {
const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
	playerId: this.state.playerId
  }),
};
	fetch('https://unozar.herokuapp.com/player/read', requestOptions)
	  .then(
	  function(response) {
	  if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: ' +
		  response.status + response.statusText);
		return;
	  }
	  response.json().then(function(data) {
		console.log(data);
	  });
	})
};
updatePlayerHandler = () => {
	const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		email: this.state.email,
		alias: this.state.alias,
		password: this.state.password,
		token: this.state.token,
      }),
    };
		fetch('https://unozar.herokuapp.com/player/update', requestOptions)
		  .then(
		  function(response) {
		  if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
			  response.status + response.statusText);
			return;
		  }
		  response.json().then(function(data) {
			console.log(data);
		  });
		})
	};
deletePlayerHandler = () => {
	const requestOptions = {
	  method: "DELETE",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		token: this.state.token
	  }),
	};
	fetch('https://unozar.herokuapp.com/player/delete', requestOptions)
	  .then(
	  function(response) {
	  if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: ' +
		  response.status + response.statusText);
		return;
	  }
	  response.json().then(function(data) {
		console.log(data);
	  });
	})
};
refreshPlayer = () => {
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		token: this.state.token,
	  }),
	};
	fetch('https://unozar.herokuapp.com/player/refreshToken', requestOptions)
	  .then(
	  function(response) {
	  if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: ' +
		  response.status + response.statusText);
		return;
	  }
	  response.json().then(function(data) {
		console.log(data);
	  });
	})
};
ruleta = async () => {
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		token: this.state.token
	  }),
	};
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/getDailyGift', requestOptions)
	data = await response.json();
	statusCode = response.status;
	if( await statusCode != 200 ){
		console.log('Error ruleta')
	}else{
		await this.setState({ gift: data.gift });
		await this.setState({ token: data.token});
		await alert('Has ganado '+this.state.gift+' monedas')
	}
};
  render() {
    return (
      <>
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<View style={styles.tituloContainer}>
					<Text style={styles.titulo}> UNOZAR </Text>
				</View>
			</View>
			<View style={styles.split}>
				 <View style={styles.containerButtons}>
					<View style={styles.containerButtonBuscar}>
						<View style={styles.buttonBuscar} >
							<Button title="Buscar Partida" onPress={() => this.setState({ show2: !this.state.show2, show3: false})}/>
						</View>
							{ this.state.show2 && 
								<>
									<View style={styles.containerBots}>
										<View style={styles.buttonBots}>
											<Button title="Con Bots" onPress={() => this.setState({ show3: !this.state.show3 , numBots: 0})} />
										</View>
										{ this.state.show3 && 
											<>
											<View style={styles.containtertextBots}>
												<Text style={styles.textBots}> ¿Cuantos bots quieres añadir? </Text>
												<View style={styles.containterMasMenos}>
													<View style={styles.buttonMas1}>
														{ this.state.numBots < 4 && 
															<Button title ="+1" onPress={() => this.setState({ numBots: this.state.numBots + 1 })}/>
														}
													</View>
													<View style={styles.buttonMas1}>
														{ this.state.numBots > 0 &&
															<Button title ="-1" onPress={() => this.setState({ numBots: this.state.numBots - 1 })}/>
														}
													</View>
													<View style={styles.buttonCrear}>
														{ this.state.numBots >= 1 && 
															<Button title="Crear Partida" 
																onPress={() => this.props.navigation.push("PartidaBots", { numBots: this.state.numBots })} />
														}
													</View>
												</View>
												
											</View>
											
											</>
										}
									</View>
									
								</>
							}
						
					</View> 
					<View style={styles.otro} >
						<Button title="Otro" />	
					</View>
					
				</View>
				<View style={styles.partidaContainer}>
					<Text > Partida </Text>
					<Text > Nº bots: {this.state.numBots} </Text>
					<Text > Privada: {this.state.isprivate.toString()} </Text>
					<Text > MaxPlayer: {this.state.maxPlayers} </Text>
					<Text > Token: {this.state.token} </Text>
					<Text > PlayerId: {this.state.playerId} </Text>
					<Text > Gameid: {this.state.gameId} </Text>
				</View>
			</View> 
			<Button title ="Privado" onPress={() => this.setState({ isprivate: !this.state.isprivate })}/>
			<View style={styles.buttonMas1}>
				{ this.state.maxPlayers < 4 && 
					<Button title ="+1" onPress={() => this.setState({ maxPlayers: this.state.maxPlayers + 1 })}/>
				}
			</View>
			<View style={styles.buttonMas1}>
				{ this.state.maxPlayers > 2 &&
					<Button title ="-1" onPress={() => this.setState({ maxPlayers: this.state.maxPlayers - 1 })}/>
				}
			</View>
			<Text>{this.state.CustomTextLocal.crear}</Text>
           
			<Button title="Create" onPress={() => this.crearPartida()} />
			<TextInput
              style={styles.input}
			  placeholder="gameId para unirse a partida"
              onChangeText={(gameId) => this.setState({ gameId })}
            />
			<Button title="Entrar partida" onPress={() => this.joinPartida()} />
			<Button title="Salir Juego" onPress={() => this.salirHandler()} />
			<TextInput
              style={styles.input}
			  placeholder="updateEmail"
              onChangeText={(email) => this.setState({ email })}
            />
			<TextInput
              style={styles.input}
			  placeholder="updateAlias"
              onChangeText={(alias) => this.setState({ alias })}
            />
			<TextInput
              style={styles.input}
			  placeholder="updatePassword"
              onChangeText={(password) => this.setState({ password })}
            />
			<Button title="UpdatePlayer" onPress={() => this.updatePlayerHandler()} />
			<Button title="DeletePlayer" onPress={() => this.deletePlayerHandler()} />
		</View>
		<View style={styles.menu}>
					<div>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <button icon="pi pi-bars" onClick={() => this.setState({ show1: !this.state.show1 })}><i className="fa fa-bars"></i></button>
                { this.state.show1 && (
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
  formContainer: {
	 
    alignSelf: "left",
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
  split: {
	 flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  containerButtonBuscar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
   containerBots: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
	buttonBuscar: {
    width: '15%',
    height: 40
  },
  buttonBots: {
	left: 60,
    width: '10%',
    height: 40
  },
  tituloContainer:{
	   alignSelf: "top",
  },
  titulo:{
	  fontStyle: "Roboto",
	  fontSize: 30
  },
  containtertextBots:{
	left: 120
  },
  textBots:{
	  left: 500,
	  fontStyle: "Roboto",
  },
  partidaContainer:{
	  alignSelf: "right",
  },
  otro:{
	 width: '10%',
  },
  buttonMas1: {
	  alignSelf: "center",
	width: '30%',  
  },
  containterMasMenos: {
	flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonCrear: {
	  alignSelf: "center",
	  width: '50%',  
  },
});

