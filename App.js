import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import CadastroCliente from './pages/cadastroCliente/CadastroCliente';
// import PagInicial from './pages/pagInicial/PagInicial';
import BuscaRestaurante from './pages/buscaRestaurante/BuscaRestaurante';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <CadastroCliente /> */}
      {/* <PagInicial /> */}
      <BuscaRestaurante /> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
