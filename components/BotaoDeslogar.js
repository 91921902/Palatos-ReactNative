import React from "react";
import { Pressable, StyleSheet, source, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BotaoDeslogar({navigation}) {

    async function deslogar() {

        await AsyncStorage.clear()
        navigation.navigate("BuscaRestaurante")

    }

    return(
        <Pressable style={styles.botaoDeslogar} onPress={deslogar}>
            <Image source={require('../assets/casa.png')} style={styles.imagem}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoDeslogar: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 40,
        right: 30,
        borderRadius: 5000,
        zIndex: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    imagem:{
        width:50,
        height:50,
    }
})