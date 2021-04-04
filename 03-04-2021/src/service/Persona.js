import axios from 'axios';

export class Persona{
	baseUrl: "http://localhost:8080/api/" // url base de la api
	
	getPersona(){
		return axios.get(this.baseUrl + "persona").then( res => res.data); //llamada a la función de la api metodo get
	}
	postPersona(correo){
		return axios.post(this.baseUrl + "persona",correo).then( res => res.data); //llamada a la función de la api metodo post
	}
} 