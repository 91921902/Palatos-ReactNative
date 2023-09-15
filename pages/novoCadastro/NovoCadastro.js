import React from "react"
import { useState, useEffect } from "react"
import { Image, View, Text, ScrollView, TextInput } from "react-native"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"

/* - COPIAR ISSO PARA USAR A FONT PERSONALIZADA - */

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"

function NovoCadastro() {

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

/* ----------------------------------------------- */

    return(
        <View style={styles.containerNovoCadastro}>
            <BotaoVoltar />                     
            <View style={styles.boxUploadPhoto}>
                <View style={styles.buttonUpload}>
                   <Image source={require("../../assets/icons/btnMaisV2.png")} style={styles.btnMais}/>
                   <Text style={{color: "white", fontFamily: "lemonada", fontSize: 10}}>Insira sua logo aqui</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.formularioCadastroRest}>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Nome:</Text>
                        <TextInput  style={styles.inptFormRest}/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Endereço:</Text>
                        <TextInput  style={styles.inptFormRest}/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Telefone:</Text>
                        <TextInput  style={styles.inptFormRest}/>
                    </View>
                    <View style={styles.boxInpt}>
                        <Text style={styles.formText}>Celular:</Text>
                        <TextInput  style={styles.inptFormRest}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}

export default NovoCadastro