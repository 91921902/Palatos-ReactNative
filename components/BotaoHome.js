import React from "react";
import { Pressable, StyleSheet, source, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function BotaoHome({onPress}) {

    return(
        <Pressable style={styles.botaoHome} onPress={onPress}>
            <Image source={require('../assets/casa.png')} style={styles.imagem}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoHome: {
        width: 55,
        height: 55,
        position: "absolute",
        top: 40,
        left: 30,
        borderRadius: 5000,
        zIndex: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    imagem:{
        width:55,
        height:55,
    }
})