import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Navegação
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importação de telas criadas
import Clientes from './Screens/Clientes';
import Saldos from './Screens/Saldos';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <Menu/>
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const Menu = () => {
  return (
    <Stack.Navigator initialRouteName="Clientes"
     screenOptions={() => ({headerShown: false})}>
      <Stack.Screen name="Clientes"
      component={Clientes} />
      <Stack.Screen name="Saldos"
      component={Saldos} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
