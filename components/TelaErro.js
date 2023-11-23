import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export default function TelaErro({ type, erro, width }) {

    const [message, setMessage] = useState("")


    useEffect(() => {
        let find = erro.find(err => err.type == type)
        if (!find) return
        setMessage(find.message || "")
    }, [erro])



    return (
        <View style={[styles.TelaErro, { width: width }]}>
            <Text style={styles.textErro}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    TelaErro: {
        paddingLeft: 15
    },
    textErro: {
        color: "red",
        fontFamily: "lemonada",
        fontSize: 10
    }
})