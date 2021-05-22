import React from "react";
import { Button, StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity } from "react-native";
import { Menu } from 'primereact/menu';

class Amigos extends React.Component {
  constructor(props) {
    super(props);
	const { token } = this.props.route.params;
	const { miId } = this.props.route.params;
    this.state = {
		show: false,
		restart: 1,
		miId: miId,
		token: token,
		friendId: '',
		friendIds: [1234,1234,1234,1234,1234,1234,1234,1234,1234],
		alias: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
		emails: ['@','@','@','@','@','@','@','@','@'],
		avatarIds: ['0','0','0','0','0','0','0','0','0'],
    };
	this.items = [
					{
						label: 'Atras',
						icon: 'pi pi-user',
						command: () => {this.setState({show: false}), this.props.navigation.goBack({ token: this.state.token, playerId: this.state.miId})}
					},
					{
						label: 'Perfil',
						icon: 'pi pi-users',
						command: () => {this.setState({show: false}), this.props.navigation.navigate("Perfil" , { token: this.state.token, miId: this.state.miId} )}
					},
					{
						label: 'Cerrar Sesion',
						icon: 'pi pi-power-off',
						command: () => {this.setState({show:false}), this.props.navigation.navigate("Inicio")}
					}
					
		];
	}

	hide(){
		this.setState({showMenu: !this.state.showMenu})
		
	}
addFriend = async () => {;
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		token: this.state.token,
		friendId: this.state.friendId,
	  }),
	};
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/addFriend', requestOptions)
	data = await response.json();
	statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token});
		console.log('Amigo añadido')
		await this.setState({ restart: this.state.restart+1})
	}
};
readFriends = async () => {;
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		token: this.state.token,
	  }),
	};
	let data;
	let response;
	let statusCode
	response = await fetch('https://unozar.herokuapp.com/player/readFriends', requestOptions)
	data = await response.json();
	statusCode = response.status;
	if( await statusCode != 200 ){
		clearInterval(this.timer1);
		console.log('¡¡¡ERROR FETCH!!!')
	}else{
		await this.setState({ token: data.token});
		await this.setState({ alias: data.alias});
		await this.setState({ emails: data.emails});
		await this.setState({ avatarIds: data.avatarIds});
		await this.setState({ friendIds: data.friendIds});
		console.log('READFRIENDS :['+this.state.token+', '+this.state.friendIds+', '+this.state.alias+', '+this.state.emails+', '+this.state.avatarIds+']')
	}
};
auxiliar = async () => {
	await this.readFriends();
};
componentDidMount(){
	//this.auxiliar()
}
verListaAmigos = () => {
	let table = []
	let aux = 0
		//console.log('LOGIN :{['+this.state.token+'], ['+this.state.friendIds+'], ['+this.state.alias+'], ['+this.state.emails+'], ['+this.state.avatarIds+']}')
		for(let i = 1; i<= (this.state.friendIds.length*2); i+=4){
			if(aux+1==this.state.friendIds.length){
				table.push(	<View style={styles.containerDosAmigos}>
								<TouchableOpacity key={i} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() =>this.props.navigation.navigate("Perfil" , { token: this.state.token, miId: this.state.friendIds[aux]})}>
									<Image  key={i} style={styles.avatar} source={require('../assets/avatares/'+this.state.avatarIds[aux]+'.png')} />
								</TouchableOpacity>
								<View key={i+1} style={styles.containerAmigos}>
									<Text key={-(i)} style={styles.texto}> {this.state.alias[aux]} {this.state.emails[aux]} </Text>
									<Text key={-(i+1)} style={styles.texto}> {this.state.friendIds[aux]} </Text>
								</View>
							</View>
							)
				
			}else{
				table.push(	<View style={styles.containerDosAmigos}>
								<TouchableOpacity key={i} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() =>this.props.navigation.navigate("Perfil" , { token: this.state.token, miId: this.state.friendIds[aux]})}>
									<Image  key={i} style={styles.avatar} source={require('../assets/avatares/'+this.state.avatarIds[aux]+'.png')} />
								</TouchableOpacity>
								<View key={i+1} style={styles.containerAmigos}>
									<Text key={-(i)} style={styles.texto}> {this.state.alias[aux]} {this.state.emails[aux]} </Text>
									<Text key={-(i+1)} style={styles.texto}> {this.state.friendIds[aux]} </Text>
								</View>
								
								<TouchableOpacity key={i+2} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() =>this.props.navigation.navigate("Perfil" , { token: this.state.token, miId: this.state.friendIds[aux+1]})}>
									<Image  key={i+2} style={styles.avatar} source={require('../assets/avatares/'+this.state.avatarIds[aux+1]+'.png')} />
								</TouchableOpacity>
								<View key={i+3} style={styles.containerAmigos}>
									<Text key={-(i+2)} style={styles.texto}> {this.state.alias[aux+1]} {this.state.emails[aux+1]} </Text>
									<Text key={-(i+3)} style={styles.texto}> {this.state.friendIds[aux+1]} </Text>
								</View>
								
							</View>
							)
			}
			aux+=2
		}
		
		return table;
};
  render() {
    return (
	<>
		<View style={styles.screen}>
			
			<View style={styles.square1}>
				<View style={styles.containerLista}>
					<ScrollView  >
						{this.verListaAmigos()}
					</ScrollView>
				</View>
			</View>
			<View style={styles.buttonAñadir}>
				<TextInput
				  style={styles.input}
				  placeholder="Id amigo"
				  onChangeText={(friendId) => this.setState({ friendId })}
				/>
				<Button title="Añadir amigo"  onPress={() => this.addFriend()} />
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
  containerLista: {
	width: 1255,
    height: 350,
	flexDirection: 'column',  
  },
  avatar: {
	resizeMode: "contain",
	height: 150,
	width: 120 
  },
  texto: {
	fontStyle: "Roboto",
	fontSize: 18   
  },
  square1: {
	width: 1260,
    height: 350,
    backgroundColor:'rgba(140, 200, 60, 0.4)',
  },
  containerAmigos: {
	flex: 1,
	flexDirection: 'column', 
	justifyContent: 'center' 
  },
  containerDosAmigos: {
	flex: 1,
	flexDirection: 'row',   
  },
  buttonAñadir: {
	top: 50,
	width: "30%",
	flex: 1,
	justifyContent: 'center',  
	alignContent: "center",
	alignSelf: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 25,
    padding: 10,
    width: "100%",
  },
  menu :{
	position: 'absolute', 
	top: 20,
	left: 1200,
	backgroundColor:'rgba(255, 255, 255, 0.7)',
  },
});

export default Amigos;
