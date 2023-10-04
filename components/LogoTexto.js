import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native";

export default function LogoTexto() {
    return(
        <View style={styles.logotexto}>
            <Image source={require("../assets/logo-texto.png")} style={{resizeMode: "contain", width: 62, height: 62}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    logotexto: {
        width: 62,
        height: 62,
        position: "absolute",
        top: 40,
        right: 30,
        borderRadius: 5000,
    }
})