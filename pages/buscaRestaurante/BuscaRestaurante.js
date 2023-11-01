import React,{useState,useEffect} from "react";
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';
import ItemRestaurante from "../../components/ItemRestaurante";


function BuscaRestaurante() {
    const [fontLoaded, setFontLoaded] = useState(false);
  
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
  
    const [restaurantes, setRestaurantes] = useState([
      {
        id: 1,
        foto: "(isso não da pra simular)",
        nome: "la crose da curta",
        descricao: "muuyyy italiano, gostamos de caracol bem cremoso"
      },
      {
        id: 2,
        foto: "(isso não da pra simular)",
        nome: "restaurante do seu zé",
        descricao: "aqui é só pão e agua, não gostou? va embora!"
      },
      {
        id: 3,
        foto: "(isso não da pra simular)",
        nome: "reniro",
        descricao: "gostamos de comida, não de pessoas, passa bem."
      },
      {
        id: 4,
        foto: "(isso não da pra simular)",
        nome: "el frango",
        descricao: "gostamos mucho de frango manito"
      }
    ]);
  
    if (!fontLoaded) {
      return null;
    }
  
    return (
      <View style={styles.containerBuscaRestaurante}>
        <View style={styles.inicio}>
          <View style={styles.barraPesquisa}>
            <TextInput
              style={styles.restaurante}
              placeholder="Restaurante"
              placeholderTextColor={'#445A14'}
            />
            <View style={styles.barraPesquisa2}>
              <Image source={require('../../assets/lupa.png')} style={{ width: 20, height: 20, }} />
            </View>
          </View>
        </View>
        <ScrollView>
        <View style={styles.componente}>
            {restaurantes.map(restaurante => (
              <ItemRestaurante key={restaurante.id} rest={restaurante} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
  
  export default BuscaRestaurante