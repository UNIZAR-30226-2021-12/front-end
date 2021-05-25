import React, { Component } from "react";
import LocalizedStrings from 'react-native-localization'// Si da error de language localizacion o no sé que, cambiar el fichero del error por este:
														// https://github.com/stefalda/react-localization/blob/master/src/LocalizedStrings.js

export default class CustomText extends Component {
	constructor(props) {
    super(props);
    this.state = {
      strings: new LocalizedStrings({
									 es: {
									   mail:"Correo electrónico",
									   ejemploMail:"ejemplo@unizar.es",
									   pass:"Contraseña",
									   repetirPass:"Repetir contraseña",
									   login:"Iniciar Sesión",
									   preguntaRegistro:"¿No está registrado?",
									   registro:"Registrarse",
									   crear:"Crear partida",
									   alias:"Alias",
									   nombre:"Tu alias aparecerá en el juego",
									   esperandoACreador1:"ESPERANDO A QUE",
									   esperandoACreador2:"EMPIECE PARTIDA",
									   faltanJugadores1:"FALTAN",
									   faltanJugadores2:"JUGADORES",
									   jugador1:"Jugador 1",
									   jugador2:"Jugador 2",
									   jugador3:"Jugador 3",
									   jugador4:"Jugador 4",
									   empezarPartida:"EMPEZAR PARTIDA",
									   invitarAmigo:"Invitar amigo",
									   salir:"Salir",
									 },
									 en: {
									   mail:"Email",
									   ejemploMail:"example@unizar.es",
									   pass:"Password",
									   repetirPass:"Repeat password",
									   login:"Sign in",
									   preguntaRegistro:"Don't you have an account?",
									   registro:"Create account",
									   crear:"Create game",
									   alias:"Alias",
									   nombre:"Your alias will show in the game",
									   esperandoACreador1:"WAITING",
									   esperandoACreador2:"TO START THE GAME",
									   faltanJugadores1:"",
									   faltanJugadores2:"PLAYER/S MISSING",
									   jugador1:"Player 1",
									   jugador2:"Player 2",
									   jugador3:"Player 3",
									   jugador4:"Player 4",
									   empezarPartida:"START THE GAME",
									   invitarAmigo:"Invite friend",
									   salir:"Leave",
									 }
									}),
    };
	this.devolver = this.devolver.bind(this);
  }
	devolver = () => {
		return this.state.strings;
	};
}

