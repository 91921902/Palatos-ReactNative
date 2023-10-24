import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function BotaoQRCode() {

    return(
        <Pressable style={styles.botaoQr}>
            <Icon name="qrcode" size={40} color="#000" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoQr: {
        width: 50,
        height: 50,
        backgroundColor: "#7AEB71",
        position: "absolute",
        top: 40,
        right: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})