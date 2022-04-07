import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EventsProvider } from './src/contexts/EventsContext';
import Home from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventForm from './src/screens/EventForm';
import { Button, Icon } from '@rneui/themed';

const Stack = createNativeStackNavigator(); //Navegação em pilha

//Estilizando o cabeçalho da página
const screenOptions = {
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: '#a29bfe',
  },
};

export default function App() {
  return (
    //Aplicando NavigationContainer para toda aplicação e também EventsProvider para toda aplicação conseguir utilizar os dados e métodos do context
    //A página Home vai inciar quando o usuário acessar a aplicação
    <NavigationContainer>
      <EventsProvider>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => {
              return {
                title: 'Lista de eventos',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('EventForm')}
                    type="clear"
                    icon={<Icon name="add" size={25} color="#04d361" />}
                  />
                  //No cabeçalho da página Home tem um botão na forma de um icone "+" para o usuário ir para a página de cadastro do evento
                ),
              };
            }}
          />
          <Stack.Screen
            name="EventForm"
            component={EventForm}
            options={{ title: 'Formulário de evento' }}
          />
        </Stack.Navigator>
      </EventsProvider>
    </NavigationContainer>
  );
}
