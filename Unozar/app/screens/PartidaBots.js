import React from "react";
import { Button, StyleSheet, View, Text, TextInput } from "react-native";
import { Menu } from 'primereact/menu';

class PartidaBots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
	}
	
  render() {
	const { bots } = this.props.route.params;
    return (
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				
				<View style={styles.titulo}>
					<Text> Partida </Text>
				</View>
				<View>
					<Text> Nº Bots: {JSON.stringify(bots).slice(1, -1)} </Text>
				</View>
			</View>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
  titulo: {
	  fontSize: 50,
	right: 200,
	
  },
  formContainer: {
    alignSelf: "center",
    width: "30%",
    justifyContent: "center",
    alignContent: "center",
  },
  menu :{
	position: 'absolute', 
	top: 20,
	left: 1200
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 25,
    padding: 10,
    width: "100%",
  },
  buttonReg: {
    top: 10,
  },
  logContainer: {
    top: 20,
    flex: 1,
    justifyContent: "center",
  },
  logText: {
    alignSelf: "center",
    padding: 10,
  },
  buttonLog: {
    width: "30%",
    alignSelf: "center",
  },
});

export default PartidaBots;
