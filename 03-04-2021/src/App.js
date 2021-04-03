import './App.css';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import InicioScreen from './Inicio';
import RegistroScreen from './Registro';
import MenuPrincipalScreen from './MenuPrincipal';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
		 screenOptions={{
			headerShown: false
		  }}>
        <Stack.Screen
            name="Inicio"
            component={InicioScreen}
          />
        <Stack.Screen
            name="Registro"
            component={RegistroScreen}
        />
		<Stack.Screen
            name="Unozar"
            component={MenuPrincipalScreen}
        />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
