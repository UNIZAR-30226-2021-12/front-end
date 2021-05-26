import React, { Component } from "react";
import { Header } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { MenuOutlined } from "@ant-design/icons";

export default class Cabecera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      español: this.props.params.español,
      CustomTextLocal: this.props.params.CustomTextLocal,
      user: this.props.params.email,
      pass: this.props.params.password,
      playerId: this.props.params.playerId,
      token: this.props.params.token,
    };
  }

  updateToken = (token) => {
    this.setState({ token });
  };

  closeMenu = () => {
    this.setState({ visible: false });
  };

  showHideMenu = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.closeMenu}>
        <View>
          <Header
            leftComponent={{
              icon: "home",
              color: "#fff",
              onPress: () => {
                this.props.navigation.push("MenuPrincipal", {
                  español: this.state.español,
                  CustomTextLocal: this.state.CustomTextLocal,
                  user: this.state.email,
                  pass: this.state.password,
                  playerId: this.state.playerId,
                  token: this.state.token,
                });
              },
            }}
            centerComponent={{
              text: "UNOZAR",
              style: { color: "#fff", fontSize: 20 },
            }}
            rightComponent={
              <>
                <TouchableOpacity onPress={this.showHideMenu}>
                  <MenuOutlined style={styles.iconoMenu} />
                </TouchableOpacity>
                {this.state.visible && (
                  <>
                    <View style={styles.menu}>
                      <TouchableOpacity
                        style={styles.opcionMenu}
                        onPress={() =>
                          this.props.navigation.push("Tienda", {
                            español: this.state.español,
                            CustomTextLocal: this.state.CustomTextLocal,
                            miId: this.state.playerId,
                            token: this.state.token,
                          })
                        }
                      >
                        <Text style={styles.textoOpcion}>Tienda</Text>
                      </TouchableOpacity>
                      <View style={styles.linea} />
                      <TouchableOpacity
                        style={styles.opcionMenu}
                        onPress={() => console.log("hola2")}
                      >
                        <Text>Opcion 2</Text>
                      </TouchableOpacity>
                      <View style={styles.linea} />
                      <TouchableOpacity
                        style={styles.opcionMenu}
                        onPress={() => console.log("hola3")}
                      >
                        <Text>Opcion 3</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            }
          />
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  menu: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 120,
    height: 160,
    position: "absolute",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  iconoMenu: {
    color: "white",
    marginTop: 5,
  },
  icon: {
    color: "white",
    top: 10,
  },
  opcionMenu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linea: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignSelf: "stretch",
  },
  textoOpcion: {},
};
