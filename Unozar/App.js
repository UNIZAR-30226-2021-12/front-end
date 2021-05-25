import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InicioScreen from "./app/screens/Inicio";
import RegistroScreen from "./app/screens/Registro";
import MenuPrincipalScreen from "./app/screens/MenuPrincipal";
import PerfilScreen from "./app/screens/Perfil";
import PartidaBotsScreen from "./app/screens/PartidaBots";
import PartidaScreen from "./app/screens/Partida";
import EsperaPartidaScreen from "./app/screens/EsperaPartida";
import AmigosScreen from "./app/screens/Amigos";
import TiendaScreen from "./app/screens/Tienda";
import { configureFakeBackend } from "./app/test/FakeBackend";
//configureFakeBackend();
const Stack = createStackNavigator();
import CustomText from './app/assets/idioma/CustomText.js'
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Inicio" component={InicioScreen} initialParams={{español: true, CustomTextLocal: new CustomText().devolver() }}/>
          <Stack.Screen name="Registro" component={RegistroScreen} />
          <Stack.Screen name="MenuPrincipal" component={MenuPrincipalScreen} />
		  <Stack.Screen name="Perfil" component={PerfilScreen} />
		  <Stack.Screen name="PartidaBots" component={PartidaBotsScreen} />
		  <Stack.Screen name="Partida" component={PartidaScreen} />
		  <Stack.Screen name="EsperaPartida" component={EsperaPartidaScreen} />
		  <Stack.Screen name="Amigos" component={AmigosScreen} />
		  <Stack.Screen name="Tienda" component={TiendaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
