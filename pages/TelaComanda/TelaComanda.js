import React from "react"
import api from "../../providers/api.js"
import { useEffect } from "react"
import { Image, View, Text, ScrollView, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import Comanda from "../../components/Comanda.js"
import A11y from "../../providers/A11y.js"
import { useFormTools } from "../../providers/FormRestContext"

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"


function TelaComanda({ navigation }) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpZFJlc3RhdXJhbnRlIjo5LCJpYXQiOjE3MDA2MjM2MTMsImV4cCI6MjMwNTQyMzYxM30.U8MdfPqaAEwpkvwyut-U10cyB-eyVmYroC_twysSMu4"


    const { comandaTools, comandas } = useFormTools()
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {

        async function carregaComandas() {
            //Puxar do backend

            let listaComandas = []

            try {
                const result = await api.get("/restaurante/comandas", {
                    headers: {
                        Authorization: token
                    }
                })
                listaComandas = result.data.ListaComandas
            } catch (err) {
                console.log(`Erro ao puxar comandas: ${err}`)
            }
            comandaTools.setAllComandas(listaComandas)
        }

        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon': fontKavoon
            });
            setFontLoaded(true);
        }

        loadFonts();
        carregaComandas()

        setInterval(() => {
            carregaComandas()
        }, 300000)

    }, []);

    if (!fontLoaded) {
        return null;
    }


    function backPage() {
        70


        navigation.goBack()

    }

    return (
        <View style={styles.container}>
            <BotaoVoltar onPress={backPage} />
            <Text style={styles.title}>Comandas:</Text>
            <ScrollView contentContainerStyle={{ width: "100%" }}>
                <View style={styles.comandas}>
                    {comandas.length > 0 && (
                        comandas.map((obj) => (
                            <Comanda key={obj.id} obj={obj} />
                        ))
                    )}
                </View>
            </ScrollView >
        </View >
    );

}

export default TelaComanda