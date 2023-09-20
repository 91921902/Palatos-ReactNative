import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NovoCadastro from "./pages/novoCadastro/NovoCadastro.js"
import NovoMenu from "./pages/novoMenu/NovoMenu.js"
import PainelADM from './pages/painelADM/PainelADM.js';

export default function App() {
  return (
    <View style={styles.container}>
      <PainelADM />
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
