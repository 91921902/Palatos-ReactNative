import React from "react";
import { Pressable, StyleSheet, Image } from "react-native";


export default function MeuPerfil() {

    return(
        <Pressable style={styles.botaoPerfil}>
            <Image source={require('../assets/iconqr.png')} style={styles.imagem}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoPerfil: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 40,
        left: 30,
        borderRadius: 10,
    },
    imagem:{
        width:50,
        height:50,
    }
})