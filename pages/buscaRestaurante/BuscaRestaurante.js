import React,{useState,useEffect} from "react";
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';



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
  


    return(
      
        <View style={styles.containerBuscaRestaurante}>
            <View style={styles.inicio}>
            <View style={styles.barraPesquisa}>
                <TextInput
                    style={styles.restaurante}
                    placeholder="Restaurante"
                /> 
                <View style={styles.barraPesquisa2}>

                </View>
            </View>

            

            </View>

            <View style={styles.componente}>
                <Text>Aqui vai o componente</Text>
            </View>

        </View> 
);
  
    

}

export default BuscaRestaurante