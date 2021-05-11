import React from "react";
import { Button, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Timer } from "react-native";
import { Menu } from 'primereact/menu';

class Partida extends React.Component {
  constructor(props) {
    super(props);
	const cartas = ["cambio_color_base.png","cambio_color_amarillo.png", "cambio_color_azul.png","cambio_color_rojo.png","cambio_color_azul.png","cambio_sentido_amarillo.png","cambio_sentido_azul.png","cambio_sentido_rojo.png","cambio_sentido_verde.png","cero_amarillo.png","cero_azul.png","cero_verde.png","cero_rojo.png","cinco_amarillo.png","cinco_azul.png","cinco_rojo.png","cinco_verde.png","cuatro_amarillo.png","cuatro_azul.png","cuatro_rojo.png","cuatro_verde.png","dos_amarillo.png","dos_azul.png","dos_rojo.png","dos_verde.png","mas_cuatro_base.png","mas_cuatro_amarillo.png","mas_cuatro_azul.png","mas_cuatro_rojo.png","mas_cuatro_verde.png","mas_dos_amarillo.png","mas_dos_azul.png","mas_dos_rojo.png","mas_dos_verde.png","nueve_amarillo.png","nueve_azul.png","nueve_rojo.png","nueve_verde.png","ocho_amarillo.png","ocho_azul.png","ocho_rojo.png","ocho_verde.png","reverso.png","saltar_turno_amarillo.png","saltar_turno_azul.png","saltar_turno_rojo.png","saltar_turno_verde.png","seis_amarillo.png","seis_azul.png","seis_rojo.png","seis_verde.png","siete_amarillo.png","siete_azul.png","siete_rojo.png","siete_verde.png","tres_amarillo.png","tres_azul.png","tres_rojo.png","tres_verde.png","uno_amarillo.png","uno_azul.png","uno_rojo.png","uno_verde.png"];
    const mano = [0,1,2,3,4,5,6];
	this.state = {
		cartas,
		mano,
		min: 0,
		showLeftArrow: false,
		showRightArrow: false,
		nombreJugador1: "Gonzalo1",
		numCartasJugador1: mano.length,
		nombreJugador2: "Gonzalo2",
		numCartasJugador2: 0,
		nombreJugador3: "Gonzalo3",
		numCartasJugador3: 0,
		nombreJugador4: "Gonzalo4",
		numCartasJugador4: 0,
		movs: 0,
		token: '',
    };
  }
	logger = () => {
		console.log("Mano actual: "+ this.state.mano);
	}
	componentDidMount(){
	  this.setState({ movs: this.state.movs=this.state.numCartasJugador1-6 });
	 }
	deckIzda = () => {
		if(this.state.min > 0){
			for(let i= 0; i<this.state.mano.length; i++){
				this.state.mano[i]=this.state.mano[i--];
			}
			this.state.min=this.state.min-1;
		}
	};
	deckDcha = () => {
		if(this.state.numCartasJugador1 < 7){
			for(let i= 0; i<this.state.mano.length; i++){
				this.state.mano[i]=this.state.mano[i++];
			}
			this.state.min=this.state.min+1;
		}
	};
	createMano = () => {
		let table = []
		table.push(<TouchableOpacity key={this.state.mano[0]} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() => alert("Button pressed")}>
						<Image  key={this.state.mano[0]} style={styles.cartaMano0} source={require('../assets/cartas/'+this.state.cartas[this.state.mano[0]])} />
					</TouchableOpacity>)
		table.push(<TouchableOpacity key={this.state.mano[1]} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() => alert("Button pressed")}>
						<Image  key={this.state.mano[1]} style={styles.cartaMano1} source={require('../assets/cartas/'+this.state.cartas[this.state.mano[1]])} />
					</TouchableOpacity>)
		table.push(<TouchableOpacity key={this.state.mano[2]} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() => alert("Button pressed")}>
						<Image  key={this.state.mano[2]} style={styles.cartaMano2} source={require('../assets/cartas/'+this.state.cartas[this.state.mano[2]])} />
					</TouchableOpacity>)
		table.push(<TouchableOpacity key={this.state.mano[3]} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() => alert("Button pressed")}>
						<Image  key={this.state.mano[3]} style={styles.cartaMano3} source={require('../assets/cartas/'+this.state.cartas[this.state.mano[3]])} />
					</TouchableOpacity>)
		table.push(<TouchableOpacity key={this.state.mano[4]} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() => alert("Button pressed")}>
						<Image  key={this.state.mano[4]} style={styles.cartaMano4} source={require('../assets/cartas/'+this.state.cartas[this.state.mano[4]])} />
					</TouchableOpacity>)
		table.push(<TouchableOpacity key={this.state.mano[5]} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() => alert("Button pressed")}>
						<Image  key={this.state.mano[5]} style={styles.cartaMano5} source={require('../assets/cartas/'+this.state.cartas[this.state.mano[5]])} />
					</TouchableOpacity>)
		table.push(<TouchableOpacity key={this.state.mano[6]} style={styles.cartaTouchable} activeOpacity={0.5} onPress={() => alert("Button pressed")}>
						<Image  key={this.state.mano[6]} style={styles.cartaMano6} source={require('../assets/cartas/'+this.state.cartas[this.state.mano[6]])} />
					</TouchableOpacity>)
		return table;
	  };
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
							<View style={styles.containerMano}>
								<TouchableOpacity tyle={styles.cartaTouchable} activeOpacity={0.5} onPress={() => this.deckIzda()}>
									<Image style={styles.arrow_left} source={require('../assets/arrow_left.png')} />
								</TouchableOpacity>	
								{this.createMano()}
								<TouchableOpacity tyle={styles.cartaTouchable} activeOpacity={0.5} onPress={() => this.deckDcha()}>
									<Image style={styles.arrow_right} source={require('../assets/arrow_right.png')} />
								</TouchableOpacity>	
							</View>
						</View>
					</View>
					<View style={styles.square2}> 
						<View style={styles.containerPerfil}>
							<Image style={styles.iconoPerson} source={{ uri: 'https://img.icons8.com/officel/2x/person-male.png' }} />
							<View style={styles.containerInfo}>
								<Text style={styles.sizeText}>{this.state.nombreJugador1}</Text>
								<Text style={styles.sizeText}> Mis cartas: {this.state.numCartasJugador1}</Text>
								<Text style={styles.sizeText}> Min: {this.state.min}</Text>
								<Text style={styles.sizeText}> Movs: {this.state.movs}</Text>
							</View>
							<View style={styles.containerBotones}>
								<Button title="PONER CARTA" color="#e1a81a" onPress={() => this.setState({ numCartasJugador1: this.state.numCartasJugador1 - 1 })}/>
								<Button title="ROBAR CARTA" color="#e1a81a" onPress={() => this.setState({ numCartasJugador1: this.state.numCartasJugador1 + 1 })}/>
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
	flexDirection: 'row', 
	justifyContent: 'center'
  },
  arrow_left: {
	top: 45,
	resizeMode: "contain",
	height: 100,
	width: 100,    
  },
  arrow_right: {
	top: 45,
	
	resizeMode: "contain",
	height: 100,
	width: 100,    
  },
  cartaMano0: {
	flex: 1,
	top: 10,
	resizeMode: "contain",
	height: 150,
	width: 120 
  },
  cartaMano1: {
	flex: 1,
	top: 10,
	resizeMode: "contain",
	height: 150,
	width: 120 
  },
  cartaMano2: {
	flex: 1,
	top: 10,
	resizeMode: "contain",
	height: 150,
	width: 120  
  },
  cartaMano3: {
	flex: 1,
	top: 10,
	resizeMode: "contain",
	height: 150,
	width: 120  
  },
  cartaMano4: {
	flex: 1,
	top: 10,
	resizeMode: "contain",
	height: 150,
	width: 120  
  },
  cartaMano5: {
	flex: 1,
	top: 10,
	resizeMode: "contain",
	height: 150,
	width: 120  
  },
  cartaMano6:  {
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
