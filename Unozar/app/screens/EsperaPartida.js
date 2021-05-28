import React from "react";
import {
  Alert,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Timer,
  ScrollView,
} from "react-native";
import { Menu } from "primereact/menu";
import refreshToken from "../functions/refreshToken";
class EsperaPartida extends React.Component {
  constructor(props) {
    super(props);
	const { token } = this.props.route.params;
	const { miId } = this.props.route.params;
	const { numBots } = this.props.route.params;
	const { gameId } = this.props.route.params;
	const { español } = this.props.route.params;
	const { maxPlayers } = this.props.route.params
	this.state = {
		miId: miId,
		token: token,
		gameId: gameId,
		maxPlayers: maxPlayers,
		gameStarted: '',
		miId1: null,
		nombreJugador1: '',
		miId2: null,
		nombreJugador2: '',
		miId3: null,
		nombreJugador3: '',
		miId4: null,
		nombreJugador4: '',
		estado: 0,
		jugadores: 0,
		numBots: numBots,
		bet: '',
		money: 0,
		español: español,
    };
  }
componentDidMount(){
	this.refreshHandler();
	this.readYo()
	this.timer1 = setInterval(() => this.estados(), 2000);
}
refreshHandler = async () => {
    const token = await refreshToken(this.state.token);
    if (token !== -1) {
      this.setState({ token: token });
    } else {
      alert(
        (this.state.español && "Su sesion ha expirado") ||
          "Your session has expired"
      );
	  clearInterval(this.timer1);
      this.props.navigation.navigate("Inicio", {
        español: this.state.español,
      });
    }
  };	
estados = async () => {
    if (this.state.estado == 0) {
      await console.log("ESTADO ACTUAL: " + this.state.estado);
      await this.readHandler();
      if ((await this.state.gameStarted) == true) {
        clearInterval(this.timer1);
        console.log("PASANDO ID: " + this.state.miId);
        await this.props.navigation.push("Partida", {
          token: this.state.token,
          miId: this.state.miId,
          español: this.state.español,
        });
      }
      await this.setState({ estado: 5 });
    } else if (this.state.estado == 2) {
      clearInterval(this.timer1);
      await this.startHandler();
	  await this.setState({ estado: 5 });
    } else if (this.state.estado == 3) {
      await clearInterval(this.timer1);
      await this.salirSala();
    } else if (this.state.estado == 4) {
      clearInterval(this.timer1);
	  await this.setState({ estado: 5 });
      this.props.navigation.push("Amigos", {
        token: this.state.token,
        miId: this.state.miId,
        gameId: this.state.gameId,
        invitar: true,
        español: this.state.español,
        numBots: this.state.numBots,
        maxPlayers: this.state.maxPlayers,
      });
    }else if(this.state.estado == 5) {
		this.refreshHandler()
		await this.setState({ estado: 0 });
	}
  };	

startHandler = async () => {
    const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: this.state.token,
      }),
    };
    let response = await fetch(
      "https://unozar.herokuapp.com/game/start",
      requestOptions1
    );
    let data = await response.json();
    let statusCode = response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ token: data.token });
      await console.log("start " + this.state.token);
      await this.props.navigation.push("Partida", {
        token: this.state.token,
        miId: this.state.miId,
        español: this.state.español,
      });
    }
  };
	
readYo = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId: this.state.miId,
      }),
    };
    let response = await fetch(
      "https://unozar.herokuapp.com/player/read",
      requestOptions
    );
    let data = await response.json();
    let statusCode = response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ money: data.money });
      await console.log("dinero: " + this.state.money);
    }
  };

readHandler = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: this.state.token,
      }),
    };
    let data;
    const response = await fetch(
      "https://unozar.herokuapp.com/game/readRoom",
      requestOptions
    );
    data = await response.json();
    let statusCode = response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ gameId: data.gameId });
      await this.setState({ maxPlayers: data.maxPlayers });
      await this.setState({ gameStarted: data.gameStarted });
      await this.setState({ token: data.token });
	  await this.readPlayerHandler(data);
	  await console.log('PLAYER IDS AHORA:['+data.playersIds[0]+', '+data.playersIds[1]+', '+data.playersIds[2]+' ,'+data.playersIds[3]+']')
      await this.setState({ miId1: data.playersIds[0] });
      await this.setState({ miId2: data.playersIds[1] });
      await this.setState({ miId3: data.playersIds[2] });
      await this.setState({ miId4: data.playersIds[3] });
      await this.setState({ bet: data.bet });
      await console.log(
        "dinero: " + this.state.money + " bet: " + this.state.bet
      );
      if ((await this.state.money) < this.state.bet) {
        await alert("No tienes suficiente dinero para esta sala");
        await this.salirSala();
      }
      await console.log(
        "readHandler[" + this.state.gameId,
        this.state.maxPlayers,
        this.state.gameStarted,
        this.state.token,
        this.state.miId1,
        this.state.miId2,
        this.state.miId3,
        this.state.miId4 + "]"
      );
	  let aux = 0
	  if(this.state.miId1!=null&&this.state.miId1!='EMPTY'){aux++}
	  if(this.state.miId2!=null&&this.state.miId2!='EMPTY'){aux++}
	  if(this.state.miId3!=null&&this.state.miId3!='EMPTY'){aux++}
	  if(this.state.miId4!=null&&this.state.miId4!='EMPTY'){aux++}
	  await this.setState({ jugadores: aux });
	  await console.log('Nº jugadores: '+this.state.jugadores)
    }
  };


readPlayerHandler = async (datab) => {
	console.log('asdadas: '+datab.playersIds[0])
	const requestOptions1 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: datab.playersIds[0]
      }),
	};
	const requestOptions2 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: datab.playersIds[1]
      }),
	};
	const requestOptions3 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: datab.playersIds[2]
      }),
	};
	const requestOptions4 = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
		playerId: datab.playersIds[3]
      }),
	};
	let data
	let response;
	let statusCode
	console.log('PLAYER IDS:['+datab.playersIds[0]+', '+datab.playersIds[1]+', '+datab.playersIds[2]+' ,'+datab.playersIds[3]+']')
	if(this.state.miId1!=datab.playersIds[0]){
		if(datab.playersIds[0]=='EMPTY'){
			await this.setState({ nombreJugador1: '' });
		}else{
			response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions1);
			data = await response.json();
			statusCode = response.status;
			console.log('READ PLAYER 1')
			if( await statusCode != 200 ){
				clearInterval(this.timer1);
			console.log('¡¡¡ERROR FETCH!!!')
			}else{
				await this.setState({ nombreJugador1: data.alias });
			}
		}
	}
	if(this.state.miId2!=datab.playersIds[1]&&this.state.maxPlayers==2){
		if (datab.playersIds[1]=='EMPTY'){
			await this.setState({ nombreJugador2: '' });
		}else{
			response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions2);
			data = await response.json()
			statusCode = response.status;
			console.log('READ PLAYER 2')
			if( await statusCode != 200 ){
				clearInterval(this.timer1);
				console.log('¡¡¡ERROR FETCH!!!')
			}else{
				await this.setState({ nombreJugador2: data.alias });
			}
		}
	}
	if(this.state.miId3!=datab.playersIds[2]&&this.state.maxPlayers==3){
		if(datab.playersIds[2]=='EMPTY'){
			await this.setState({ nombreJugador3: '' });
		}else{
			response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions3);
			data = await response.json();
			statusCode = response.status;
			console.log('READ PLAYER 3')
			if( await statusCode != 200 ){
				clearInterval(this.timer1);
				console.log('¡¡¡ERROR FETCH!!!')
			}else{
				await this.setState({ nombreJugador3: data.alias });
			}
		}
	}
	if(this.state.miId4!=datab.playersIds[3]&&this.state.maxPlayers==4){
		if(datab.playersIds[3]=='EMPTY'){
			await this.setState({ nombreJugador4: '' });
		}else{
			response = await fetch('https://unozar.herokuapp.com/player/read', requestOptions3);
			data = await response.json();
			statusCode = response.status;
			console.log('READ PLAYER 4')
			if( await statusCode != 200 ){
				clearInterval(this.timer1);
				console.log('¡¡¡ERROR FETCH!!!')
			}else{
				await this.setState({ nombreJugador4: data.alias });
			}
		}
	}

}
salirSala = async () => {
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
    let statusCode = response.status;
    if ((await statusCode) != 200) {
      clearInterval(this.timer1);
      console.log("¡¡¡ERROR FETCH!!!");
    } else {
      await this.setState({ token: data.token });
      await console.log("salir");
      await this.props.navigation.push("MenuPrincipal", {
        token: this.state.token,
        miId: this.state.miId,
        español: this.state.español,
      });
    }
  };


 render() {
		return (
		<>
			<View style={styles.screen}>
				<View style={styles.square1}>
						<View style={styles.containerParticipantes}>
								

							{this.state.miId!=this.state.miId1 && (
								(this.state.español && <Text style={styles.textoTitulo}>Esperando a que {this.state.nombreJugador1} empiece la partida</Text>) || (
									<Text style={styles.textoTitulo}>Waiting {this.state.nombreJugador1} to start the game</Text>
								  ))
							}
							{this.state.miId==this.state.miId1 && (
								(this.state.español && <Text style={styles.textoTitulo}>Faltan {(this.state.maxPlayers-this.state.numBots)-this.state.jugadores} jugadores</Text>) || (
									<Text style={styles.textoTitulo}>{(this.state.maxPlayers-this.state.numBots)-this.state.jugadores} remaining</Text>
								  ))
							}
							{(this.state.español && <Text style={styles.textoId}> Jugador 1: {this.state.nombreJugador1} </Text>) || (
									<Text style={styles.textoId}> Player 1: {this.state.nombreJugador1} </Text>
								  )}
							{(this.state.maxPlayers-this.state.numBots)>=2 && (
								(this.state.español && <Text style={styles.textoId}> Jugador 2: {this.state.nombreJugador2} </Text>) || (
									<Text style={styles.textoId}> Player 2: {this.state.nombreJugador2} </Text>
								  ))
							}
							{(this.state.maxPlayers-this.state.numBots)>=3 &&(
								(this.state.español && <Text style={styles.textoId}> Jugador 3: {this.state.nombreJugador3} </Text>) || (
									<Text style={styles.textoId}> Player 3: {this.state.nombreJugador3} </Text>
								  ))
							}
							{(this.state.maxPlayers-this.state.numBots)==4 &&(
								(this.state.español && <Text style={styles.textoId}> Jugador 4: {this.state.nombreJugador4} </Text>) || (
									<Text style={styles.textoId}> Player 4: {this.state.nombreJugador4} </Text>
								  ))
							}
							{this.state.miId==this.state.miId1 && this.state.jugadores==this.state.maxPlayers && 
								<Button title={(this.state.español && "Empezar partida") || "Start game"}  color="#40d81b" onPress={() => this.setState({ estado: 2 })}/>
							}
							<View  style={styles.boton}>
								{this.state.jugadores!=this.maxPlayers &&
									<Button title={(this.state.español && "Invitar amigos") || "Invite friends"} onPress={() => this.setState({ estado: 4})} />
								}
								<Button title={(this.state.español && "Salir") || "Quit"} onPress={() => this.setState({ estado: 3}) }/>
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
  square1: {
    width: 1358,
    height: 500,
    backgroundColor:'rgba(140, 200, 60, 0.4)',
  },
  containerParticipantes: {
	flex: 1,
    flexDirection: 'column',  
	justifyContent: 'flex-start',
	alignItems: "center",
  },
  textoTitulo: {
	  lineHeight: 100,
	  fontStyle: "Roboto",
	  fontSize: 38
  },
  textoId: {
	  
	  lineHeight: 100,
	  fontStyle: "Roboto",
	  fontSize: 30
  },
  boton: {
	width: "30%",
    alignSelf: "center",  
  }
});

export default EsperaPartida;
