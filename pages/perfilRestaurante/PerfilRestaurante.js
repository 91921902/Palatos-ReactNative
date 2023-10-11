import React,{useState,useEffect} from "react";
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';
import BotaoVoltar from "../../components/BotaoVoltar";
import Icon from 'react-native-vector-icons/FontAwesome';

function PerfilRestaurante() {

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
        <View style={styles.containerPerfilRestaurante}>

        <BotaoVoltar onPress={() => navigation.goBack()}/>

            <View style={styles.boxImgemRest}>
                <View style={{
                    width: 200,
                    height: 200,
                    borderRadius: 5000,
                    
                }}>
                    <Image source={require("../../assets/imgPadrao.png")} style={styles.imgemRest} />.
                </View>
            </View>

            <View style={styles.boxNomeRest}>
                <Text>Nome Restaurante</Text>
            </View>

             <View style={styles.boxFavoritos}>
                <Text>Estrelinhas</Text>
            </View>

            <View style={styles.boxDescricao}>
                <Text>Descrição Restaurante</Text>
            </View>

            <View style={styles.boxMenu}>
                
                <TouchableOpacity style={styles.botaoMenu}>
                     <Text style={styles.textoMenu}>Ver Menu</Text>
                </TouchableOpacity>
                
            </View>
            

        </View>
    );

}

export default PerfilRestaurante