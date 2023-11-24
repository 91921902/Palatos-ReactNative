import React from "react";
import { Pressable, StyleSheet, Image } from "react-native";


export default function MeuPerfil({onPress}) {

    return(
        <Pressable style={styles.botaoPerfil} onPress={onPress}>
            <Image source={require('../assets/user.png')} style={styles.imagem}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoPerfil: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 36,
        left: 28,
        borderRadius: 5000,
        borderWidth: 28,
        borderColor: "#445A14",
        alignItems: "center",
        justifyContent: "center"
    },
    imagem:{
        width:50,
        height:50,
    }
})