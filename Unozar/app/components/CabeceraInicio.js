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
							{if(this.state.español){
								this.setState({español: false})
								this.state.CustomTextLocal.setLanguage('en');
							}else{
								this.setState({español: true})
								this.state.CustomTextLocal.setLanguage('es');
							}  
							}
                        }
                      >
                        <Text style={styles.textoOpcion}>Cambiar Idioma</Text>
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
    height: 40,
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
