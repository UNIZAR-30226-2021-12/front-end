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
		show: false,
		email: "",
		alias: "",
		password: "",
		token: "",
		id: "",
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
				<View>
					<Text> UNOZAR </Text>
				</View>
			</View>
			<View style={styles.menu}>
					<div>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <button icon="pi pi-bars" onClick={() => this.setState({ show: !this.state.show })}><i className="fa fa-bars"></i></button>
                { this.state.show && (
					<Menu model={this.items} />
                )}
				</div>  
		
    				
			</View>
		</View>
			
		 
      </>
	  
    );
  }
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
  formContainer: {
    alignSelf: "center",
    width: "30%",
    justifyContent: "center",
    alignContent: "center",
  },
  menu :{
	position: 'absolute', 
	top: 20,
	left: 1200
  }
});

