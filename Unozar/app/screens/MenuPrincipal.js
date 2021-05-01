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
		bots: 0,
	};
	this.items = [
					{
						label: 'Perfil',
						icon: 'pi pi-user',
						command: () => {this.setState({show: false}), this.props.navigation.navigate("Perfil" , this.props.route.params )}
					},
					{
						label: 'Amigos',
						icon: 'pi pi-users',
						command: () => {alert("Amigos")}
					},
					{
						label: 'Cerrar Sesion',
						icon: 'pi pi-power-off',
						command: () => {this.setState({show: false}),this.props.navigation.navigate("Inicio")}
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
		fetch(`https://unozargon.herokuapp.com/player/readPlayer/`, requestOptions)
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
											<Button title="Con Bots" onPress={() => this.setState({ show3: !this.state.show3 , bots: 0})} />
											<Button title="PvP" onPress={() => this.setState({ show3: false , bots: 0})} />
										</View>
										{ this.state.show3 && 
											<>
											<View style={styles.containtertextBots}>
												<Text style={styles.textBots}> ¿Cuantos bots quieres añadir? </Text>
												<View style={styles.containterMasMenos}>
													<View style={styles.buttonMas1}>
														{ this.state.bots < 4 && 
															<Button title ="+1" onPress={() => this.setState({ bots: this.state.bots + 1 })}/>
														}
													</View>
													<View style={styles.buttonMas1}>
														{ this.state.bots > 0 &&
															<Button title ="-1" onPress={() => this.setState({ bots: this.state.bots - 1 })}/>
														}
													</View>
													<View style={styles.buttonCrear}>
														{ this.state.bots >= 1 && 
															<Button title="Crear Partida" 
																onPress={() => this.props.navigation.navigate("PartidaBots", { bots: this.state.bots })} />
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
				{ this.state.show3 && 
						<>
							<View style={styles.partidaContainer}>
										<Text > Partida </Text>
										<Text > Nº bots: {this.state.bots} </Text>
										<Text > Partida </Text>
										<Text > Partida </Text>
										<Text > Partida </Text>
										<Text > Partida </Text>
										<Text > Partida </Text>
							</View>
						</>
					}
			</View> 
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

