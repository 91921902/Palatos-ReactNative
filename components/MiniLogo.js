import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native";

export default function MiniLogo() {
    return(
        <View style={styles.miniLogo}>
            <Image source={require("../assets/mini-logo.png")} style={{resizeMode: "contain", width: 62, height: 62}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    miniLogo: {
        width: 62,
        height: 62,
        position: "absolute",
        top: 40,
        right: 30,
        borderRadius: 5000,
    }
})