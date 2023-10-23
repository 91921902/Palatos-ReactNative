import NovoCadastro from "./pages/novoCadastro/NovoCadastro.js"
import NovoMenu from "./pages/novoMenu/NovoMenu.js"
import PainelADM from './pages/painelADM/PainelADM.js';
import Financeiro from './pages/financeiro/Financeiro.js';
import Filtros from './pages/filtros/Filtros.js';
import { FormProvider } from './providers/FormRestContext.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='NovoMenu' screenOptions={{headerShown: false}}>
        <Stack.Screen  name="NovoCadastro" component={NovoCadastro} />
        <Stack.Screen name="NovoMenu" component={NovoMenu} />
        <Stack.Screen name="PainelADM" component={PainelADM}/>
        <Stack.Screen name="Financeiro" component={Financeiro}/>
        <Stack.Screen name="Filtros" component={Filtros}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <FormProvider>
      <MyNavigator />
    </FormProvider>
  );
}