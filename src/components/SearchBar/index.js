import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import style from './SearchBar.style';
import { useEvents } from '../../contexts/EventsContext';

const SearchBar = () => {
  const [filter, setFilter] = useState(''); //Armazenar o parâmetro de pesquisa que o usuário digitar
  const { searchEvents } = useEvents();

  function handleSubmitSearch() {
    searchEvents(filter); //Buscar evento que contém o parâmetro
  }

  //Refresh do search bar e buscar todos os eventos
  function handleRefresh() {
    searchEvents('');
    setFilter('');
  }

  return (
    <View style={style.container}>
      <TextInput
        style={style.filterStyle}
        onChangeText={search => setFilter(search)}
        placeholder="Pesquisar"
        value={filter}
      />
      <Button
        icon={<Icon name="search" color="white" size={25} />}
        buttonStyle={{
          backgroundColor: 'transparent',
        }}
        onPress={handleSubmitSearch}
      />
      <Button
        icon={<Icon name="close" color="white" size={25} />}
        buttonStyle={{
          backgroundColor: 'transparent',
        }}
        onPress={handleRefresh}
      />
    </View>
  );
};

export default SearchBar;
