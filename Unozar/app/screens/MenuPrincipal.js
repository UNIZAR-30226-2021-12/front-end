import React, {useRef, Component } from "react";
import { Button, StyleSheet, View, Alert, TextInput, Text } from "react-native";
import {Column} from 'primereact/Column';
import Inicio from './Inicio.js'
import { Menu } from 'primereact/menu';
import {DataTable} from 'primereact/DataTable';
import { Paginator } from 'primereact/paginator';

import Registro from './Registro.js';


export default class MenuPrincipal extends Component {
  constructor(props) {
    super(props);
    this.state = {
		show1: false,
		show2: false,
		show3: false,
		isprivate: false,
		maxPlayers: 2,
		numBots: 0,
		token: '',
		playerId: '',
		alias: null,
		password: null,
		email: null,
	};
	this.items = [
					{
						label: 'Perfil',
						icon: 'pi pi-user',
						command: () => {this.setState({show1: false}), this.props.navigation.navigate("Perfil" , this.props.route.params )}
					},
					{
						label: 'Amigos',
						icon: 'pi pi-users',
						command: () => {alert("Amigos")}
					},
					{
						label: 'Cerrar Sesion',
						icon: 'pi pi-power-off',
						command: () => {this.setState({show1: false}),this.props.navigation.navigate("Inicio")}
					}
					
		];
	}
	
	readUser = () => {
		const requestOptions = {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			id: "2c9248de78ffbf080178ffc119c30000",
		  }),
		};
		fetch(`https://unozar.herokuapp.com/player/readPlayer/`, requestOptions)
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
	
  hide(){
		this.setState({showMenu: !this.state.showMenu})
		
  }

createHandler = () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isPrivate: this.state.isprivate,
        maxPlayers: this.state.maxPlayers,
		numBots: this.state.numBots,
		token: this.state.token
      }),
    };
		fetch('https://unozar.herokuapp.com/game/create', requestOptions)
		  .then(
		  function(response) {
		  if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
			  response.status);
			return;
		  } else{
			  console.log('Create game OK');
		  }
		})
	};
salirHandler = () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token
      }),
    };
		fetch('https://unozar.herokuapp.com/game/quit', requestOptions)
		  .then(
		  function(response) {
		  if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
			  response.status);
			return;
		  }else{
			  console.log('Quit game OK');
			   response.json().then(function(data) {
				console.log(data);
			  });
		  }
		})
	};
readHandler = () => {
	const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token
      }),
    };
		fetch('https://unozar.herokuapp.com/game/read', requestOptions)
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
  render() {
    return (
      <>
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<View style={styles.tituloContainer}>
					<Text style={styles.titulo}> UNOZAR </Text>
				</View>
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
																onPress={() => this.props.navigation.navigate("PartidaBots", { numBots: this.state.numBots })} />
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
			<Text>Create Game function</Text>
           
			<Button title="Create" onPress={() => this.createHandler()} />
			<Button title="Salir Juego" onPress={() => this.salirHandler()} />
			 <TextInput
              style={styles.input}
			  placeholder="token"
              onChangeText={(token) => this.setState({ token })}
            />
			<Button title="ReadGame" onPress={() => this.readHandler()} />
			<TextInput
              style={styles.input}
			  placeholder="playerId"
              onChangeText={(playerId) => this.setState({ playerId })}
            />
			<Button title="ReadPlayer" onPress={() => this.readPlayerHandler()} />
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
	left: 1200
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

