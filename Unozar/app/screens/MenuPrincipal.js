import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  Timer,
} from "react-native";
import Cabecera from "../components/Cabecera";
import readPlayer from "../functions/readPlayer";

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
		alias: null,
		password: null,
		email: null,
		miId: this.props.route.params.miId,
		token: this.props.route.params.token,
		gameId: '',
		gameStarted: false,
		playersIds: [],
		gift: '',
		giftClaimedToday: false,
		español: this.props.route.params.español,
		bet: 0,
	};
	}
	componentDidMount(){
		console.log(this.state.miId)
		this.readHandler();
		//let timer = setInterval(() => alert("aux"), 3000);
	}
readHandler = async () => {
    const data = await readPlayer(this.state.miId);
    if (data !== -1) {
      this.setState({ giftClaimedToday: data.giftClaimedToday });
      if (!this.state.giftClaimedToday) {
        this.ruleta();
      }
    }
  };	
crearPartida = async () => {
    if (!(this.state.bet >= 0)) {
      alert("La apuesta no es un valor numérico");
      return;
    } else if (this.state.numBots >= this.state.maxPlayers) {
      alert("Al menos tiene que haber un jugador no bot en partida");
      return;
    } else if (this.state.numBots > 0 && !this.state.isprivate) {
      alert("No puedes añadir bots a una partida privada");
      return;
    } else if (!this.state.isprivate && this.state.bet > 0) {
      // ??????????????????
      alert("No puedes añadir apuesta a una partida privada");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isPrivate: this.state.isprivate,
        maxPlayers: this.state.maxPlayers,
        numBots: this.state.numBots,
        token: this.state.token,
        bet: this.state.bet,
      }),
    };
    let data;
    let response;
    response = await fetch(
      "https://unozar.herokuapp.com/game/create",
      requestOptions
    );
    data = await response.json();
    await this.setState({ token: data.token });
    await console.log("entrado " + this.state.token);
    if (this.state.maxPlayers - this.state.numBots != this.state.maxPlayers) {
      const requestOptions1 = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: this.state.token,
        }),
      };
      response = await fetch(
        "https://unozar.herokuapp.com/game/start",
        requestOptions1
      );
      data = await response.json();
      await this.setState({ token: data.token });
      await console.log("start " + this.state.token);
      this.props.navigation.push("Partida", {
        token: this.state.token,
        miId: this.state.miId,
        español: this.state.español,
      });
    } else {
      this.props.navigation.push("EsperaPartida", {
        token: this.state.token,
        miId: this.state.miId,
        numBots: this.state.numBots,
        español: this.state.español,
        maxPlayers: this.state.maxPlayers,
      });
    }
  };

joinPartida = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: this.state.gameId,
        token: this.state.token,
      }),
    };
    console.log("GAME ID PRIVATE: " + this.state.gameId);
    let data;
    let response;
    await console.log("intentando entrar " + this.state.token);
    response = await fetch(
      "https://unozar.herokuapp.com/game/joinPrivate",
      requestOptions
    );
    data = await response.json();
    await this.setState({ token: data.token });
    await console.log("joineado " + this.state.token);
    await this.props.navigation.push("EsperaPartida", {
      token: this.state.token,
      miId: this.state.miId,
      numBots: this.state.numBots,
      español: this.state.español,
    });
  };
joinPartidaPublica = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numPlayers: this.state.maxPlayers,
        token: this.state.token,
      }),
    };
    console.log("GAME ID: PUBLIC");
    let data;
    let response;
    await console.log("intentando entrar " + this.state.token);
    response = await fetch(
      "https://unozar.herokuapp.com/game/joinPublic",
      requestOptions
    );
    data = await response.json();
    await this.setState({ token: data.token });
    await console.log("joineado " + this.state.token);
    await this.props.navigation.push("EsperaPartida", {
      token: this.state.token,
      miId: this.state.miId,
    });
  };
salirHandler = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: this.state.token,
      }),
    };
    let data;
    const response = await fetch(
      "https://unozar.herokuapp.com/game/quit",
      requestOptions
    );
    data = await response.json();
    await this.setState({ token: data.token });
    console.log("salido");
  };	
ruleta = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: this.state.token,
      }),
    };
    let data;
    let response;
    let statusCode;
    response = await fetch(
      "https://unozar.herokuapp.com/player/getDailyGift",
      requestOptions
    );
    data = await response.json();
    statusCode = response.status;
    if ((await statusCode) != 200) {
      console.log("Error ruleta");
    } else {
      await this.setState({ gift: data.gift });
      await this.setState({ token: data.token });
      await alert("Has ganado " + this.state.gift + " monedas");
    }
  };
  render() {
    return (
      <>
		<View style={styles.screen}>
			<Cabecera
			  ref={this.Cabecera}
			  style={{ position: "absolute" }}
			  params={{
				token: this.state.token,
				miId: this.state.miId,
				español: this.state.español,
			  }}
			  navigation={this.props.navigation}
			  updateParent={this.changeLanguage}
			>
				<View style={styles.formContainer}>
					<View style={styles.tituloContainer}>
						<Text style={styles.titulo}>UNOZAR</Text>
					</View>
				</View>
				<View style={styles.joincrear}>
					<View style={styles.joins}>
						<View style={{ flex: 1}}>
							<Text style={styles.titulo2}>Unirse a partida con código</Text>
							<TextInput
							  style={styles.input}
							  placeholder="Código partida"
							  onChangeText={(gameId) => this.setState({ gameId })}
							/>
							<View style={{ width: "50%", alignSelf: "center",}}>
								<Button title="Entrar partida privada" onPress={() => this.joinPartida()} />
							</View>
						</View>
						<View style={{ flex: 1}}>
							<Text style={styles.titulo2}>Unirse a partida pública</Text>
							<View style={{ width: "50%", alignSelf: "center",}}>
								<Button title="Entrar partida publica" onPress={() => this.joinPartida()} />
							</View>
						</View>
					</View>
					<View style={{ flex: 1}}>
						<Text style={styles.titulo2} >Crear partida</Text>
						<View style={{  flexDirection: 'row'}}>
							<Text style={{fontStyle: "Roboto", fontSize: 15}} >Nº Bots             </Text>
							{this.state.numBots<4 &&
								<View style={{width:"5%"}}>
									<Button title="+1" onPress={() => this.setState({ numBots: this.state.numBots+1})} />
								</View>
							}
							{this.state.numBots>0 &&
								<View style={{width:"5%"}}>
									<Button title="-1" onPress={() => this.setState({ numBots: this.state.numBots-1})} />
								</View>
							}
							<Text style={{fontStyle: "Roboto", fontSize: 15}} >   {this.state.numBots}</Text>
						</View>
						<View style={{  flexDirection: 'row',}}>
							<Text style={{fontStyle: "Roboto", fontSize: 15}} >Nº Jugadores    </Text>
							{this.state.maxPlayers<4 &&
								<View style={{width:"5%"}}>
									<Button title="+1" onPress={() => this.setState({ maxPlayers: this.state.maxPlayers+1})} />
								</View>
							}
							{this.state.maxPlayers>2 &&
								<View style={{fwidth:"5%"}}>
									<Button title="-1" onPress={() => this.setState({ maxPlayers: this.state.maxPlayers-1})} />
								</View>
							}
							<Text style={{fontStyle: "Roboto", fontSize: 15}} >   {this.state.maxPlayers}</Text>
						</View>
						<View style={{  flexDirection: 'row'}}>
							<View style={{ width:"25%"}}>
								<Button title="Privada" onPress={() => this.setState({ isprivate: !this.state.isprivate})} />
							</View>
							<Text style={{fontStyle: "Roboto", fontSize: 15}} > {this.state.isprivate.toString()}</Text>
						</View>
						<View style={{  flexDirection: 'row'}}>
							<Text style={{fontStyle: "Roboto", fontSize: 15}} >Apuesta            </Text>
							<TextInput
							  style={{ width:"17%", borderColor: "black", borderWidth: 1}}
							  placeholder="Cantidad a apostar"
							  onChangeText={(bet) => this.setState({ bet })}
							/>
							<Text style={{fontStyle: "Roboto", fontSize: 15}} > {this.state.bet}</Text>
						</View>
						<View style={{ width: "25%", alignSelf: "center",}}>
							<Button title="Crear Partida" onPress={() => this.crearPartida()} />
						</View>
					</View>
				</View>
				<Button title="Salir Juego" onPress={() => this.salirHandler()} />
			</Cabecera>
			
		</View>
      </>
	  
    );
  }
}


const styles = StyleSheet.create({
  screen: { backgroundColor: "#ffffff",
    flex: 1,  },
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
  tituloContainer:{
	   alignSelf: "top",
  },
  titulo:{
	  fontStyle: "Roboto",
	  fontSize: 30
  },
  titulo2: {
	fontStyle: "Roboto",
	fontSize: 21,	
  },
  buttonMas1: {
	  alignSelf: "center",
	width: '30%',  
  },
  joins: {
	 flex: 1,
	 flexDirection: 'row', 
  },
  joinCrear: {
	flex: 1,
	flexDirection: 'column',  
  },
  input: {
	 borderColor: "black",
    borderWidth: 1,
    height: 25,
    padding: 10,
	width: "50%", 
	alignSelf: "center",
	
  },
});

