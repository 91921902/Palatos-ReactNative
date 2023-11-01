import NovoCadastro from "./pages/novoCadastro/NovoCadastro.js"
import NovoMenu from "./pages/novoMenu/NovoMenu.js"
import PainelADM from './pages/painelADM/PainelADM.js';
import Financeiro from './pages/financeiro/Financeiro.js';
import Filtros from './pages/filtros/Filtros.js';
import Mesas from "./pages/mesas/Mesas.js";
import TelaComanda from "./pages/TelaComanda/TelaComanda.js";
import TelaReserva from "./pages/telaReserva/TelaReserva.js"
import PlanosEPacotes from "./pages/planosEPacotes/PlanosEPacotes.js"
import EditarMesa from "./pages/editarMesa/EditarMesa.js"
import MenuIndividual from "./pages/menuIndividual/MenuIndividual.js"
import CadastroFavoritos from "./pages/cadastroFavoritos/CadastroFavorito.js"
import Pedidos from "./pages/pedidos/Pedidos.js"

import { FormProvider } from './providers/FormRestContext.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginRestaurante from "./pages/loginRestaurante/LoginRestaurante.js";
import DescricaoReserva from "./pages/descricaoReserva/DescricaoReserva.js"

const Stack = createStackNavigator();

const MyNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CadastroFavoritos' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="planosEPacotes" component={PlanosEPacotes} />
        <Stack.Screen name="NovoCadastro" component={NovoCadastro} />
        <Stack.Screen name="NovoMenu" component={NovoMenu} />
        <Stack.Screen name="PainelADM" component={PainelADM} />
        <Stack.Screen name="Financeiro" component={Financeiro} />
        <Stack.Screen name="Filtros" component={Filtros} />
        <Stack.Screen name="Mesas" component={Mesas} />
        <Stack.Screen name="EditarMesa" component={EditarMesa} />
        <Stack.Screen name="TelaComanda" component={TelaComanda} />
        <Stack.Screen name="TelaReserva" component={TelaReserva} />
        <Stack.Screen name="LoginRestaurante" component={LoginRestaurante} />
        <Stack.Screen name="MenuIndividual" component={MenuIndividual} />
        <Stack.Screen name="CadastroFavoritos" component={CadastroFavoritos} />
        <Stack.Screen name="Pedidos" component={Pedidos} />
        <Stack.Screen name="DescricaoReserva" component={DescricaoReserva} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//NAVEGAR PARA FILTROS

export default function App() {
  return (
    <FormProvider>
      <MyNavigator />
    </FormProvider>
  );
}
