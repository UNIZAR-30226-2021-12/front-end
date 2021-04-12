import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InicioScreen from "./app/screens/Inicio";
import RegistroScreen from "./app/screens/Registro";
import MenuPrincipalScreen from "./app/screens/MenuPrincipal";

import { configureFakeBackend } from "./app/test/FakeBackend";
configureFakeBackend();

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Inicio" component={InicioScreen} />
          <Stack.Screen name="Registro" component={RegistroScreen} />
          <Stack.Screen name="MenuPrincipal" component={MenuPrincipalScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
