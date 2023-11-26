import React from "react";
import { Pressable, StyleSheet, source, Image } from "react-native";

export default function BotaoQRCode({onPress}) {

    return(
        <Pressable style={styles.botaoQr} role="button" onPress={onPress} accessibilityLabel="Escanear QR Code">
            <Image source={require('../assets/iconqr.png')} style={styles.imagem}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoQr: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 40,
        right: 30,
        borderRadius: 10,
    },
    imagem:{
        width:50,
        height:50,
    }
})