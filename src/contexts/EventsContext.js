import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axiosAPI from '../services/api';

const EventsContext = createContext({});

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]); //Armazenar os eventos buscados
  const [state, setState] = useState(false); //Usado para alterar de estado para cada requisição
  const navigation = useNavigation();

  useEffect(() => {
    getEvents();
  }, [state]); //Cada vez que houver requisição atualizar o state para buscar os dados atualizados. Menos quando a requisição do search bar

  //Buscar todos os eventos e armazenar no events
  async function getEvents() {
    await axiosAPI
      .get(`/events`)
      .then(res => {
        if (res.status === 200) {
          setEvents(res.data);
        }
      })
      .catch(err => {
        console.warn('Erro ao tentar buscar evento!');
        console.error(err);
      });
  }

  //Requisição para criar novo evento, recebendo dados do formulário
  async function createEvent(data) {
    const newData = {
      name: data.name,
      price: data.price,
      description: data.description,
      category: data.category,
      date: data.date,
      imageUrl: data.imageUrl,
      local: data.local,
    };

    await axiosAPI
      .post('/events', newData)
      .then(res => {
        if (res.status === 201) {
          console.warn('Evento criado com sucesso!');
          navigation.goBack(); //Se receer o código 201, retorna para a página de listagem
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          //Bad request
          console.warn('Favor preencher todos os campos!');
        } else {
          console.warn('Erro ao tentar criar evento!');
          console.error(err);
        }
      });

    setState(!state);
  }
  //Requisição para deletar evento, recebendo id do evento
  async function deleteEvent(id) {
    await axiosAPI
      .delete(`/events/${id}`)
      .then(res => {
        if (res.status === 200) {
          console.warn('Evento deletado com sucesso!');
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          //Not found
          console.warn('Evento não encontrado!');
          console.error(err);
        } else {
          console.warn('Erro ao tentar deletar evento!');
          console.error(err);
        }
      });

    setState(!state);
  }

  //Requisição para atualizar o evento, recebendo dados do formulário
  async function updateEvent(data) {
    const newData = {
      _id: data._id,
      name: data.name,
      price: data.price,
      description: data.description,
      category: data.category,
      date: data.date,
      imageUrl: data.imageUrl,
      local: data.local,
    };

    await axiosAPI
      .put(`/events/${data._id}`, newData)
      .then(res => {
        if (res.status === 200) {
          //Se receer o código 200, retorna para a página de listagem
          console.warn('Evento atualizado com sucesso!');
          navigation.goBack();
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          //Bad request
          console.warn('Favor preencher todos os campos!');
        } else if (err.response.status === 404) {
          //Not found
          console.warn('Evento não encontrado!');
          console.error(err);
          navigation.goBack();
        } else {
          console.warn('Erro ao tentar atualizar evento!');
          console.error(err);
          navigation.goBack();
        }
      });

    setState(!state);
  }

  //Requisição para buscar os eventos que contém o filter em seus dados
  async function searchEvents(filter) {
    await axiosAPI
      .get(`/events?filter=${filter}`)
      .then(res => {
        if (res.status === 200) {
          console.warn('Eventos buscados!');
          setEvents(res.data);
        }
      })
      .catch(err => {
        console.warn('Erro ao tentar buscar eventos!');
        console.error(err);
      });
  }

  return (
    <EventsContext.Provider
      value={{ events, createEvent, deleteEvent, updateEvent, searchEvents }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  //Criando um hook
  const context = useContext(EventsContext);

  return context;
}
