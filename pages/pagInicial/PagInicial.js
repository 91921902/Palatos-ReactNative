import React,{useState,useEffect} from "react";
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';



function PagInicial() {

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

        <View style={styles.containerPagInicial}>

            <View style={styles.loginRestaurante}>  

                <TouchableOpacity style={styles.botaoLogin}>
                    <Text style={styles.textoBotaoLogin}>Login restaurante</Text>
                </TouchableOpacity>
            </View> 

            <View style={styles.logo}>
                <Image source={require("../../assets/logo-texto.png")} style={styles.logoTexto}/>
            </View>

            <View style={styles.formularioPagInicial}>
        
                <View style={styles.inputsFormulario}>
                    <Text style={styles.textoInput}>Email</Text>
                    <TextInput style={styles.input}/>
                </View>

                <View style={styles.inputsFormulario}>
                    <Text style={styles.textoInput}>Senha</Text>
                    <TextInput style={styles.input}/>
                </View>

            </View>  
             

            <View style={styles.entrar}>
                <TouchableOpacity style={styles.botaoEntrar}>
                  <Text style={styles.textoBotaoEntrar}>Entrar</Text>
                </TouchableOpacity>
            </View>

                <View style={styles.cadastro}>
                    <TouchableOpacity style={styles.botaoCadastro}>
                    <Text style={styles.textoCadastro}>Não tenho cadastro...</Text>
                    </TouchableOpacity>
                </View>
          
        </View>
    );

}

export default PagInicial