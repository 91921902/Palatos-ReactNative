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

    if (!fontLoaded) {
        return null; 
    }
  

    return(
      
        <View style={styles.containerBuscaRestaurante}>
            <View style={styles.inicio}>
            <View style={styles.barraPesquisa}>
                <TextInput
                    style={styles.restaurante}
                    placeholder="Restaurante"
                    placeholderTextColor={'#445A14'}
                /> 
                <View style={styles.barraPesquisa2}>
                    <Image source={require('../../assets/lupa.png')} style={{width:20,height:20,}}/>

                </View>
            </View>

            

            </View>
            <ScrollView>
                <View style={styles.componente}>
                    <ItemRestaurante/>  
                    <ItemRestaurante/> 
                    <ItemRestaurante/> 
                    <ItemRestaurante/>  
                    <ItemRestaurante/> 
                    <ItemRestaurante/> 
                    <ItemRestaurante/> 
                </View>
            </ScrollView>
        </View> 
);
  
    

}

export default BuscaRestaurante