import React, { Component } from "react";
import { Header } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MenuOutlined } from "@ant-design/icons";

export default class Cabecera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      español: this.props.params.español,
      user: this.props.params.email,
      pass: this.props.params.password,
      miId: this.props.params.miId,
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
      <>
        <TouchableWithoutFeedback onPress={this.closeMenu}>
          <View>
            <Header
              leftComponent={{
                icon: "home",
                color: "#fff",
                onPress: () => {
                  this.props.navigation.push("MenuPrincipal", {
                    español: this.state.español,
                    miId: this.state.miId,
                    token: this.state.token,
					bunker: false,
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
                </>
              }
            />
            {this.props.children}
            {this.state.visible && (
              <>
                <View style={styles.menu}>
                  <TouchableOpacity
                    style={styles.opcionMenu}
                    onPress={() =>
                      this.props.navigation.push("Perfil", {
                        token: this.state.token,
                        miId: this.state.miId,
                        español: this.state.español,
                      })
                    }
                  >
                    {(this.state.español && <Text>Perfil</Text>) || (
                      <Text>Profile</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.opcionMenu}
                    onPress={() =>
                      this.props.navigation.push("Amigos", {
                        token: this.state.token,
                        miId: this.state.miId,
                        invitar: false,
                        español: this.state.español,
                      })
                    }
                  >
                    {(this.state.español && <Text>Amigos</Text>) || (
                      <Text>Friends</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.opcionMenu}
                    onPress={() =>
                      this.props.navigation.push("Tienda", {
                        token: this.state.token,
                        miId: this.state.miId,
                        español: this.state.español,
                      })
                    }
                  >
                    {(this.state.español && <Text>Tienda</Text>) || (
                      <Text>Shop</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.opcionMenu}
                    onPress={() => {
                      this.setState({ español: !this.state.español });
                      this.props.updateParent();
                      this.closeMenu();
                    }}
                  >
                    {(this.state.español && <Text>English</Text>) || (
                      <Text>Español</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.linea} />
                  <TouchableOpacity
                    style={styles.opcionMenu}
                    onPress={() =>
                      this.props.navigation.navigate("Inicio", {
                        español: this.state.español,
                      })
                    }
                  >
                    {(this.state.español && <Text>Cerrar sesión</Text>) || (
                      <Text>Sign out</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

const styles = {
  menu: {
    top: 32,
    right: 10,
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
