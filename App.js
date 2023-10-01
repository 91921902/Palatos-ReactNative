import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Mesas from "./pages/mesas/Mesas.js"
import EditarMesas from './pages/editarMesa/EditarMesa.js';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <PagInicial /> */}
      <EditarMesas />
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
