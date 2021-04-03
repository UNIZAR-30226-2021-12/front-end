import './Inicio.css';
import React, {useState, Component} from 'react';
import { Button, StyleSheet, View, Alert} from 'react-native';

class Inicio extends React.Component {
	  constructor(props) {
		super(props);
		this.state = {
		  username: "",
		  password: ""
		};
	  }
		getUser = () => {
			return this.state.username
		};
		getPass = () =>{
			return this.state.password
		};
	   logger = () => {  
			console.log(this.getUser());
			console.log(this.getPass());
 
		};
		dosfunciones = () => {
			this.logger();
			this.props.navigation.navigate('Unozar');
		};
    render(){
        return(
        <>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <div className="CorreoLog"  > Correo electronico </div>
            <div className="ContraLog"> Contraseña </div>
			<script>
			
			</script>
            <form>
                <div className="correoInLog" >
                    <input type="text" id="correoInput" name="correo" size="50" onChange={({ target }) => this.setState({ username: target.value })}/> 
                </div>
                <div className="contraInLog" >
                    <input type="password" id="contraInput" name="contra" size="50" autocomplete="off"
					 onChange={({ target }) => this.setState({ password: target.value })} /> 
                </div>
				<View style={styles.container}>
					<View style={styles.buttonLog}>
							<Button type="submit" title="Login"  onPress={this.dosfunciones} />
					</View>
				</View>
                
            </form>
			<div className="RegistroPreguntaLog"> ¿No esta registrado? </div>
			<View style={styles.container}>
				<View style={styles.buttonReg}>
					<Button 
						onPress= {() => this.props.navigation.navigate('Registro')}
						title="Registrarse"
					/>
				</View>
			</View>
        </>
        );
    }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   
  },
  buttonReg: {
    position: 'absolute', 
	top: 360,
	left: 645
  },
  buttonLog: {
    position: 'absolute', 
	top: 280,
	left: 660
  }
 });

export default Inicio;
