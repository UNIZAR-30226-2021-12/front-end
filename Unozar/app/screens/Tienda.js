import React from "react";
import { Button, StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity } from "react-native";
import { Menu } from 'primereact/menu';
import { Linking } from 'react-native';
import qs from 'qs';
class Perfil extends React.Component {
  constructor(props) {
    super(props);
	const { token } = this.props.route.params;
	const { miId } = this.props.route.params;
    this.state = {
		show: false,
		token: token,
		miId: miId,
		avatarId: '0',
		boardId: '0',
		cardsId: '0',
		avatares: [],
		tableros: [],
		dorsos: [],
		restart: 0,
		money: 0,
		unlockedAvatars: [],
		unlockedBoards: [],
		unlockedCards: [],
    };
	this.items = [
					{
						label: 'MenuPrincipal',
						icon: 'pi pi-user',
						command: () => {this.setState({show: false}), this.props.navigation.push("MenuPrincipal" , { token: this.state.token, playerId: this.state.miId} )}
					},
					{
						label: 'Perfil',
						icon: 'pi pi-users',
						command: () => {this.setState({show: false}), this.props.navigation.push("Perfil" , { token: this.state.token, miId: this.state.miId, invitar: false} )}
					},
					{
						label: 'Amigos',
						icon: 'pi pi-users',
						command: () => {this.setState({show: false}), this.props.navigation.push("Amigos", { token: this.state.token, miId: this.state.miId})}
					},
					{
						label: 'Cerrar Sesion',
						icon: 'pi pi-power-off',
						command: () => {this.setState({show:false}), this.props.navigation.push("Inicio")}
					}
					
		];
	}

	hide(){
		this.setState({showMenu: !this.state.showMenu})
		
	}
readHandler = async () => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: this.state.miId
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
		await this.setState({ avatarId: data.avatarId});
		await this.setState({ avatarId: data.boardId});
		await this.setState({ avatarId: data.cardsId});
		await this.setState({ money: data.money});
		await this.setState({ unlockedAvatars: data.unlockedAvatars});
		await this.setState({ unlockedBoards: data.unlockedBoards});
		await this.setState({ unlockedCards: data.unlockedCards});
		await console.log('avatares: '+this.state.unlockedAvatars)
		await console.log('lectura perfil')
		let igual=false
		for(let i=0; i<5; i++){
			if(i!=1){
				for(let j=0; j<this.state.unlockedAvatars.length;j++){
					if(this.state.unlockedAvatars[j]==i){
						igual=true
						break;
					}
				}
				if(!igual){
					this.state.avatares.push(i)
				}
				igual=false
			}
		}
		igual=false
		await console.log('tableros: '+this.state.unlockedBoards)
		for(let i=0; i<3; i++){
			for(let j=0; j<this.state.unlockedBoards.length;j++){
				if(this.state.unlockedBoards[j]==i){
					igual=true
					break;
				}
			}
			if(!igual){
				this.state.tableros.push(i)
			}
			igual=false
		}
		igual=false
		await console.log('dorsos: '+this.state.unlockedCards)
		for(let i=0; i<5; i++){
			for(let j=0; j<this.state.unlockedCards.length;j++){
				if(this.state.unlockedCards[j]==i){
					igual=true
					break;
				}
			}
			if(!igual){
				this.state.dorsos.push(i)
			}
			igual=false
		}
		await console.log('avatares: '+this.state.avatares)
		await console.log('tableros: '+this.state.tableros)
		await console.log('dorsos: '+this.state.dorsos)
		await this.setState({ restart: this.state.restart+1});
	}
};
componentDidMount(){
	console.log('miId: '+this.state.miId)
	console.log('token: '+this.state.token)
	this.readHandler();
}

desbloquearAvatar = async (i) => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		unlockableId: this.state.avatares[i],
		token: this.state.token
      }),
	};
	console.log('avatar i: '+i)
	if(this.state.money<250){
		alert('No tienes suficiente dinero')
		return
	}
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/unlockAvatar', requestOptions1);
	data = await response.json();
	statusCode = await response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token});
		await this.setState({ avatares: []});
		await this.setState({ tableros: []});
		await this.setState({ dorsos: []});
		await this.readHandler();
		await this.setState({ restart: this.state.restart+1});
	}
}
desbloquearDorso = async (i) => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		unlockableId: this.state.dorsos[i],
		token: this.state.token
      }),
	};
	console.log('dorso id:' +this.state.dorsos[i])
	if(this.state.money<500){
		alert('No tienes suficiente dinero')
		return
	}
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/unlockCards', requestOptions1);
	data = await response.json();
	statusCode = await response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token});
		await this.setState({ avatares: []});
		await this.setState({ tableros: []});
		await this.setState({ dorsos: []});
		await this.readHandler();
		await this.setState({ restart: this.state.restart+1});
	}
}
desbloquearTablero = async (i) => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		unlockableId: this.state.tableros[i],
		token: this.state.token
      }),
	};
	console.log('tablero id:' +this.state.tableros[i])
	if(this.state.money<700){
		alert('No tienes suficiente dinero')
		return
	}
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/unlockBoard', requestOptions1);
	data = await response.json();
	statusCode = await response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token});
		await this.setState({ avatares: []});
		await this.setState({ tableros: []});
		await this.setState({ dorsos: []});
		await this.readHandler();
		await this.setState({ restart: this.state.restart+1});
	}
}
addMoney = async () => {
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		token: this.state.token
      }),
	};
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/addMoney', requestOptions1);
	await this.setState({ avatares: []});
	await this.setState({ tableros: []});
	await this.setState({ dorsos: []});
	await this.readHandler();
	await this.setState({ restart: this.state.restart+1});
}
verAvatares = () => {
	let table = []
	for(let i = 0; i< this.state.avatares.length; i++){
		table.push(<TouchableOpacity key={i} style={styles.touchable} activeOpacity={0.5} onPress={() =>this.desbloquearAvatar(i)}>
				<Image  key={i} style={styles.avatarLista} source={require('../assets/avatares/'+this.state.avatares[i]+'.png')} />
			</TouchableOpacity>)
	}
	return table;	
}
verTableros = () => {
	let table = []
	for(let i = 0; i<this.state.tableros.length; i++){
		table.push(<TouchableOpacity key={i} style={styles.touchable} activeOpacity={0.5} onPress={() =>this.desbloquearTablero(i)}>
				<Image  key={i} style={styles.tableroLista} source={require('../assets/tableros/'+this.state.tableros[i]+'.png')} />
			</TouchableOpacity>)
	}
	return table;	
}
verDorsos = () => {
	let table = []
	for(let i = 0; i<this.state.dorsos.length; i++){
		table.push(<TouchableOpacity key={i} style={styles.touchable} activeOpacity={0.5} onPress={() =>this.desbloquearDorso(i)}>
				<Image  key={i} style={styles.dorsoLista} source={require('../assets/dorsos/'+this.state.dorsos[i]+'.png')} />
			</TouchableOpacity>)
	}
	return table;	
}
  render() {
    return (
	<>
		<View style={styles.screen}>
			<Text style={styles.textTitulo}>TIENDA</Text>
			<Text style={styles.textTitulo}>{this.state.money}</Text>
			<View style={styles.avatar_desbloqueables}>
				<View style={styles.avatarContainer}>
						<Image style={styles.avatarPerfil} source={require('../assets/avatares/'+this.state.avatarId+'.png')} />
						<Text style={styles.textAvatar}>  Avatar actual</Text>
						<Image style={styles.dorsoPerfil} source={require('../assets/dorsos/'+this.state.cardsId+'.png')} />
						<Text style={styles.textAvatar}>  Dorso actual</Text>
						<Image style={styles.tableroPerfil} source={require('../assets/tableros/'+this.state.boardId+'.png')} />
						<Text style={styles.textAvatar}>  Tablero actual</Text>
				</View>
				<View style={styles.containerDesbloqueables}>
					<View>
						{this.state.unlockedAvatars.length!=4&&
							<>
							<Text style={styles.textAvatar}>Avatares desbloqueables (250 monedas)</Text>
							<View key={this.state.restart} style={styles.containerListaAvatares}>
								<ScrollView horizontal>
									{this.verAvatares()}
								</ScrollView>
							</View>
							</>
						}
					</View>
					<View>
						{this.state.unlockedBoards.length!=3&&
							<>
							<Text style={styles.textAvatar}>Tableros desbloqueables (500 monedas)</Text>
							<View key={this.state.restart} style={styles.containerListaTableros}>
								
								<ScrollView horizontal>
									{this.verTableros()}
								</ScrollView>
							</View>
							</>
						}
					</View>
					<View>
						{this.state.unlockedCards.length!=5&&
							<>
							<Text style={styles.textAvatar}>Dorsos desbloqueables (750 monedas)</Text>
							<View key={this.state.restart} style={styles.containerListaDorsos}>
								
								<ScrollView horizontal>
									{this.verDorsos()}
								</ScrollView>
							</View>
							</>
						}
					</View>
					<Button title="Añadir Dinero" onPress={() => this.addMoney()}/>
				</View>
				
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
		</>
    );
  }
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
  textAvatar: {
	alignSelf: "left",
	fontStyle: "Roboto",
	fontSize: 18
  },
  textTitulo: {
	fontStyle: "Roboto",
	fontSize: 24  
  },
  avatarContainer: {
    alignSelf: "left",
    width: "30%",
  },
  menu :{
	position: 'absolute', 
	top: 20,
	left: 1200,
	backgroundColor:'rgba(255, 255, 255, 0.7)',
  },
  avatarPerfil: {
	alignSelf: "left",
	height: 141,
	width: 134,
	resizeMode: "contain",
  },
  dorsoPerfil: {
	alignSelf: "left",
	resizeMode: "contain",
	height: 150,
	width: 120,
  },
  tableroPerfil: {
	alignSelf: "left",
	resizeMode: "contain",
	height: 140,
	width: 200,  
  },
  avatarLista: {
	flex: 1,
	height: 141,
	width: 134,
	resizeMode: "contain",
  },
  touchable: {
	 flex: 1,
  },
  containerListaAvatares: {
	width: 1000, 
  },
  avatar_desbloqueables: {
	flexDirection: 'row',  
  },
  containerDesbloqueables: {
	flexDirection: 'column',  
  },
  containerListaTableros: { 
	width: 1000,
  },
  containerListaDorsos: { 
	width: 1000,
  },
  tableroLista: {
	flex: 1,
	height: 140,
	width: 200,
	resizeMode: "contain",
  },
  dorsoLista: {
	flex: 1,
	height: 120,
	width: 90,
	resizeMode: "contain",
  },
});

export default Perfil;
