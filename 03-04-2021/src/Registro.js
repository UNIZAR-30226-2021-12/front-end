import './Registro.css';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

class Registro extends React.Component {
  render(){
      return (
        <>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<div className="AliasReg"> Alias </div>
            <div className="CorreoReg"> Correo </div>
			<div className="ContraReg"> Contraseña </div>
            <div className="RepContraReg"> Repetir contraseña </div>
			<form>
                <div className="aliasInReg" >
                    <input type="text" id="aliasInput" name="alias" size="50"/> 
                </div>
				<div className="correoInReg" >
                    <input type="text" id="correoInput" name="correo" size="50"/> 
                </div>
				<div className="contraInReg" >
                    <input type="text" id="contraInput" name="correo" size="50"/> 
                </div>
				<div className="repcontraInReg" >
                    <input type="text" id="repcontraInput" name="correo" size="50"/> 
                </div>
                <View style={styles.container}>
					<View style={styles.buttonReg}>
							<Button type="submit" title="Registrarse" />
					</View>
				</View>
            </form>
			<div className="LogPreguntaReg"> ¿Ya esta registrado? </div>
			<View style={styles.container}>
				<View style={styles.buttonLog}>
					<Button 
						onPress= {() => this.props.navigation.navigate('Inicio')}
						title="Login"
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
	top: 370,
	left: 645
  },
  buttonLog: {
    position: 'absolute', 
	top: 450,
	left: 660
  }
 });
 
export default Registro;
