import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NovoCadastro from "./pages/novoCadastro/NovoCadastro.js"
import NovoMenu from "./pages/novoMenu/NovoMenu.js"
import PainelADM from './pages/painelADM/PainelADM.js';
import Financeiro from './pages/financeiro/Financeiro.js';
import Filtros from './pages/filtros/Filtros.js';
import { MenuProvider } from './providers/MenuContext.js';

export default function App() {
  return (
    <MenuProvider>
        <View style={styles.container}>
          <NovoMenu />
        </View>
    </MenuProvider>
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
