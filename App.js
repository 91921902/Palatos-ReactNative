import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MenuIndividual from './pages/menuIndividual/MenuIndividual'
import DescricaoReserva from './pages/descricaoReserva/DescricaoReserva';
import CadastroFavoritos from './pages/cadastroFavoritos/CadastroFavorito';
import Pedidos from './pages/pedidos/Pedidos';

export default function App() {
  return (
    <View style={styles.container}>
    <Pedidos/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
