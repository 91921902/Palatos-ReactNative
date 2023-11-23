import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export default function TelaErro({tipo, erro, width}) {

    const [message, setMessage] = useState("")


    useEffect(() => {

        const tipoErro = erro.filter(err => err.tipoInpt == tipo)

        if (tipoErro.length < 1) {
            return
        }
        
        switch(tipoErro[0].tipoMessage) {

            case "vazio":
                if (tipo != tipoErro[0].tipoInpt) {
                    return
                }
                setMessage("Este campo é obrigatório!")
                break

            default: 
                setMessage("")
        }
    }, [erro])

    

    return(
        <View style={[styles.TelaErro, {width: width}]}>
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
        fontSize:10
    }
})