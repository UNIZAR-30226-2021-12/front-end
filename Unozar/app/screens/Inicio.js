import React, { Component } from "react";
import { Button, StyleSheet, View, Alert, TextInput, Text } from "react-native";
import CustomText from "../assets/idioma/CustomText.js";
import { Menu } from "primereact/menu";
import Cabecera from "../components/CabeceraInicio";
import authentication from "../functions/authentication";

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    const { español } = this.props.route.params;
    const { CustomTextLocal } = this.props.route.params;
    this.Cabecera = React.createRef();
    this.state = {
      email: "prueba",
      password: "",
      data: [],
      playerId: "",
      token: "",
      show1: false,
      español: español,
      CustomTextLocal: CustomTextLocal,
    };
    this.cambiarContexto = this.cambiarContexto.bind(this);
  }
  cambiarContexto = () => {
    this.setState({ CustomTextLocal: a });
  };
  login = async () => {
    if (this.state.email.length < 6) {
      alert("Debe ingresar el correo");
      return;
    }
    if (this.state.password.length < 6) {
      alert("Debe ingresar la contraseña");
      return;
    }
    const data = await authentication({
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({ playerId: data.id });
    this.setState({ token: data.token });
    console.log("Inicio playerId: " + this.state.playerId);
    this.props.navigation.push("MenuPrincipal", {
      playerId: this.state.playerId,
      token: this.state.token,
      español: this.state.español,
      CustomTextLocal: this.state.CustomTextLocal,
    });
  };
  render() {
    return (
      <View style={styles.screen}>
        <Cabecera
          ref={this.Cabecera}
          params={{
            token: this.state.token,
            playerId: this.state.playerId,
            español: this.state.español,
            CustomTextLocal: this.state.CustomTextLocal,
          }}
          navigation={this.props.navigation}
        >
          <View style={styles.formContainer}>
            <form>
              <View>
                <Text>{this.state.CustomTextLocal.mail}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={this.state.CustomTextLocal.ejemploMail}
                  onChangeText={(email) => this.setState({ email })}
                />
              </View>
              <View>
                <Text>{this.state.CustomTextLocal.pass}</Text>
                <TextInput
                  ref={(input) => {
                    this.textInput = input;
                  }}
                  style={styles.input}
                  onChangeText={(password) => this.setState({ password })}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.container}>
                <View style={styles.buttonLog}>
                  <Button
                    title={this.state.CustomTextLocal.login}
                    onPress={() => this.login()}
                  />
                </View>
              </View>
            </form>
          </View>
          <View style={styles.regContainer}>
            <Text style={styles.regText}>
              {" "}
              {this.state.CustomTextLocal.preguntaRegistro}{" "}
            </Text>
            <View style={styles.buttonReg}>
              <Button
                onPress={() => this.props.navigation.push("Registro")}
                title={this.state.CustomTextLocal.registro}
                onPress={() =>
                  this.props.navigation.push("Registro", {
                    español: this.state.español,
                    CustomTextLocal: this.state.CustomTextLocal,
                  })
                }
              />
            </View>
            <View style={styles.buttonLog}>
              <Button title="Logger" onPress={() => this.log()} />
            </View>
            <Button
              title="Partida"
              onPress={() =>
                this.props.navigation.push("Partida", {
                  token: this.state.token,
                })
              }
            />
            <Button
              title="EsperaPartida"
              onPress={() =>
                this.props.navigation.push("EsperaPartida", {
                  token: this.state.token,
                  miId: this.state.playerId,
                })
              }
            />
            <Button
              title="ListaAmigos"
              onPress={() =>
                this.props.navigation.push("Amigos", {
                  token: this.state.token,
                  miId: this.state.playerId,
                })
              }
            />
          </View>
        </Cabecera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: { backgroundColor: "#ffffff", flex: 1 },
  formContainer: {
    alignSelf: "center",
    width: "30%",
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 25,
    padding: 10,
    width: "100%",
  },
  buttonLog: {
    top: 10,
  },
  regContainer: {
    top: 20,
    flex: 1,
    justifyContent: "center",
  },
  regText: {
    alignSelf: "center",
    padding: 10,
  },
  buttonReg: {
    width: "30%",
    alignSelf: "center",
  },
  menu: {
    position: "absolute",
    top: 20,
    left: 1200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
