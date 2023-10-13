import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import PedidoCliente from '../../components/PedidoCliente';

export default function DescricaoReserva() {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [tolerancia, setTolerancia]= useState(0);

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'kavoon': fontKavoon,
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

  return (
    <View style={styles.container}>

      <View style={styles.paiLogoRegras}>
        <Image
          style={styles.logoRegras}
          source={require('../../assets/regras.png')}
        />
      </View>

      <View style={styles.descricao}>
            <Text style={styles.descricaoText}>Descrição da reserva</Text>
      </View>

      <View style={styles.regrasTitulo}>
          <Text style={styles.regrasTexto}>Fique atento as seguintes regras:</Text>
      </View>

      <View style={styles.descricaoRegras}>

          <Text style={styles.textoRegras}>-Cumpra o horário de chegada para não perder sua reserva 
          (tolerância de: {tolerancia} min)</Text>

          <Text style={styles.textoRegras}>-Pagamento obrigatório de 50% do valor, sem devolução!</Text>

          <Text style={styles.textoRegras}>-As reservas não podem ser no dia,somente dias posteriores.</Text>
       </View>

          <View style={styles.viewData}>
            <Text style={styles.dataEhora}>Escolha o horário e data de chegada</Text>
          </View>

          <View style={styles.dataEhorario}>
              <View style={styles.dataView}>
                  <Text style={styles.dataTitulo}>Data</Text>
                  <TextInput style={styles.inptData}></TextInput>
              </View>

              <View style={styles.horarioView}>
                  <Text style={styles.horarioTitulo}>Horário</Text>
                  <TextInput style={styles.inptHora}></TextInput>
                </View>
          </View>


        <View style={styles.viewBtnConfirmar}>
          <Pressable style={styles.btnConfirmar}>
            <Text style={styles.confirmar}>Confirmar</Text>
          </Pressable>
        </View>

      </View>

      );
  }