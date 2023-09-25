import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Mesas} from "./pages/mesas/Mesas"

export default function App() {
  return (
    <View style={styles.container}>
      {/* <PagInicial /> */}
      <Mesas />
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
