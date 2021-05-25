import React, { Component } from "react";
import { Header } from "react-native-elements";
import { View, Text } from "react-native";
//import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { MenuOutlined } from "@ant-design/icons";
import Portal from "@burstware/react-native-portal";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

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

  openMenu = () => {
    this.state.visible = true;
    console.log(this.state.visible);
  };

  closeMenu = () => {
    this.state.visible = false;
    console.log(this.state.visible);
  };

  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  render() {
    return (
      <>
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
            <Provider>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Menu
                  visible={this.state.visible}
                  onDismiss={this.closeMenu}
                  anchor={
                    <TouchableOpacity onPress={() => this.showMenu}>
                      <MenuOutlined />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item onPress={() => {}} title="Item 1" />
                  <Menu.Item onPress={() => {}} title="Item 2" />
                  <Divider />
                  <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
              </View>
            </Provider>
          }
        />
        {this.props.children}
      </>
    );
  }
}

const styles = {
  menu: {
    left: -100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "white",
    top: 10,
  },
};
