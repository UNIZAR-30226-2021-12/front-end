import React, {Component} from 'react';
import './Menuprincipal.css';
import { Button, StyleSheet, View, Alert} from 'react-native';
import {Persona} from './service/Persona';
import {DataTable} from 'primereact/DataTable';
import {Column} from 'primereact/Column';
import Inicio from './Inicio.js'

export default class MenuPrincipal extends Component{
	constructor(){
		super();
		this.state = {}; 
		this.persona = new Persona();
	}
	
	componentDidMount(){
		this.persona.getPersona().then(data => this.setState({persona: data}))
	} 
	
	logger = () => {  
			console.log(this._Inicio.getUser());
	}
	/*componentDidMount(){
		this.persona.postPersona().then(data => this.setState({persona: data}))
		this.setState({
			visible: false
		
		})
		
	}*/
	/*render(){ //Descomentar para visualizar en tablas
		return(
			<DataTable value={this.state.persona}> // Las columnas son los campos del JSON
				<Column field="id" header="id"></Column>
				<Column field="Alias" header="Alias"></Column>
				<Column field="Nombre" header="Nombre"></Column>
				<Column field="Apellidos" header="Apellidos"></Column>
				<Column field="Correo" header="Correo"></Column>
			</DataTable>
		);
	}*/
	render(){ //Borrar al descomentar la de arriba
		return(
		<>
			<h1>Hola mundo</h1>
			<Button title="Consola"  onPress={this.logger} />
		</>
		);
	}
}