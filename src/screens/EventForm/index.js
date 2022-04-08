import { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { useEvents } from '../../contexts/EventsContext';
import style from './eventForm.style';

//Formulário com os dados do evento
const EventForm = ({ route, navigation }) => {
  const [event, setEvent] = useState(route.params || {}); //Caso o usuário deseja atualizar alguns dados, o parâmetro "route" passa os dados para o estado "event", se não vai editar o estado recebe um objeto vazio
  const { createEvent, updateEvent } = useEvents(); //Recebendo métodos de criar e atulizar o evento do context

  const handleSubmit = () => {
    if (event.editMode) {
      //Se o usuário está atualizando os dados do evento, usar o updateEvent após clicar no botão
      updateEvent(event);
    } else {
      createEvent(event); //Se o usuário está criando um novo evento, createEvent após clicar no botão
    }
  };

  return (
    <View style={style.container}>
      <Text>Nome do Evento</Text>
      <TextInput
        style={style.inputStyle}
        onChangeText={name => setEvent({ ...event, name })}
        placeholder="Informe o nome do evento"
        value={event.name}
      />

      <Text>Descrição do Evento</Text>
      <TextInput
        style={style.inputStyle}
        onChangeText={description => setEvent({ ...event, description })}
        placeholder="Descrição do evento"
        value={event.description}
      />

      <Text>Categoria do Evento</Text>
      <TextInput
        style={style.inputStyle}
        onChangeText={category => setEvent({ ...event, category })}
        placeholder="Ex: música, programação"
        value={event.category}
      />

      <Text>Local do Evento</Text>
      <TextInput
        style={style.inputStyle}
        onChangeText={local => setEvent({ ...event, local })}
        placeholder="Ex: Rua N, 99, São João, Campinas"
        value={event.local}
      />

      <Text>Data do Evento</Text>
      <TextInput
        style={style.inputStyle}
        onChangeText={date => setEvent({ ...event, date })}
        placeholder="Ex: DD/MM/YYYY"
        value={event.date}
      />

      <Text>Preço do Evento</Text>
      <TextInput
        style={style.inputStyle}
        onChangeText={price => setEvent({ ...event, price })}
        placeholder="Ex: 200"
        value={event.price}
      />

      <Text>Imagem do Evento</Text>
      <TextInput
        style={style.inputStyle}
        onChangeText={imageUrl => setEvent({ ...event, imageUrl })}
        placeholder="URL da imagem"
        value={event.imageUrl}
      />

      <Button title="Salvar" color="#a29bfe" onPress={handleSubmit} />
    </View>
  );
};

export default EventForm;
