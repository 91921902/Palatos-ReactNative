import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MenuIndividual from './pages/menuIndividual/MenuIndividual'


export default function App() {
  return (
    <View style={styles.container}>
    <MenuIndividual/>
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
