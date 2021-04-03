/*import './MenuPrincipal.css';
import React, {useState, Component} from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
*/
import React from 'react';
import { Text } from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
class MenuPrincipal extends React.Component {
	
	render(){
		return(
			<MenuProvider style={{flexDirection: 'column', padding: 30}}>
			<Text>Hello world!</Text>
			<Menu>
			  <MenuTrigger text='Select option' />
			  <MenuOptions>
				<MenuOption value={1} text='One' />
				<MenuOption value={2} text='2' />
				<MenuOption value={3} text='3' onClick= {() => this.props.navigation.navigate('Registro')}/>
			  </MenuOptions>
			</Menu>
		  </MenuProvider>
		)	
	}
}

export default MenuPrincipal;
