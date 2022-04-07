import { View, FlatList } from 'react-native';
import EventCard from '../../components/Card';
import SearchBar from '../../components/SearchBar';
import { useEvents } from '../../contexts/EventsContext';
import styles from './home.style';

const Home = () => {
  const { events } = useEvents(); //Lista de eventos

  return (
    <View style={styles.container}>
      <SearchBar label="Home" />

      <FlatList
        data={events} //Passando lista de eventos
        renderItem={({ item }) => {
          return <EventCard item={item} />;
        }} //Renderizar lista de eventos com o component "EventCard"
        keyExtractor={item => item._id} //Cada component tem uma key contendo _id de evento para identificação
      />
    </View>
  );
};

export default Home;
